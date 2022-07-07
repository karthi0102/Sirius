const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ShopApp',{useNewUrlParser:true,useUnifiedTopology:true})
.then( () => {
    console.log("Connection open")
}).catch(err => {
    console.log("OOPS !! ERROR")
})

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    prize:{
        type:Number,
        min:[0,'Prize must be positive'],
    },
    onSale:{
        type:Boolean,
        default:false,
    },
    categories:{
        type:[String],
        default:["cycling","diving"],
    },
    qty:{
        online:{
            type:Number,
            default:0
        },inStore:{
            type:Number,
            default:0,
        }
    },
    size:{
        type:String,
        enum:['s','m','l']
    }
})
productSchema.methods.greet= function(){
    console.log("HII HELLO GREETINGS");
    console.log(`-form ${this.name}`)
}
productSchema.methods.toggleOnSale = function(){
    this.onSale =!this.onSale;
    return this.save();
}
productSchema.methods.addCategory = function(cat) {
    this.categories.push(cat);
    return this.save();
}
productSchema.statics.fireSale = function () {
    return this.updateMany({},{onSale:true,prize:0})
}
const Product = mongoose.model('Product',productSchema);

const findProduct = async () =>{
    const foundProduct= await Product.findOne({name:"rm5"})
    // console.log(foundProduct)
    // await foundProduct.toggleOnSale();
    // console.log(foundProduct)
    // foundProduct.greet();
    // await foundProduct.addCategory("running");
    // console.log(foundProduct)

}
Product.fireSale () .then (res => console.log(res))
findProduct();
// const bike = new Product({name:"rm5",prize:90000,size:'l'})
// bike.save()
// // Product.findOneAndUpdate({name:"rm5"},{prize:-100000},{new:true,runValidators:true})
// .then((data) => {
//     console.log(data)
// })
// .catch( err => {

//     console.log(err)
// })