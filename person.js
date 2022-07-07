const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Perosn',{useNewUrlParser:true,useUnifiedTopology:true})
.then( () => {
    console.log("Connection open")
}).catch(err => {
    console.log("OOPS !! ERROR")
})

const personSchema= new mongoose.Schema({
   first:String,
   last:String
})

personSchema.virtual("fullName").get(function  () {
    return `${this.first} ${this.last}`;
})
personSchema.pre("save",async function (){
    console.log("Before save");
})
personSchema.post("save",async function (){
    console.log("Just now saved")
})
const Person = mongoose.model('Person',personSchema)