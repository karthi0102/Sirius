const express = require('express');
const app=express();
const path=require('path');
const Product=require('./module/product')
const mongoose = require('mongoose');
const methodOverride=require('method-override')
mongoose.connect('mongodb://localhost:27017/farmDiary',{useNewUrlParser:true,useUnifiedTopology:true})
.then( () => {
    console.log("Connection open")
}).catch(err => {
    console.log("OOPS !! ERROR")
})
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))
const categories =['fruit','vegetable','dairy']
app.get('/',(req,res)=>{
    res.redirect('/products');
})
app.get('/products',async (req,res) => {
    const {category}=req.query;
    if(category){
        const products= await Product.find({category});
        res.render('index.ejs',{products,category})
    }else{
    const products= await Product.find({});
    res.render('index.ejs',{products,category:'All'})
    }
})
app.get('/products/new', (req,res) => {
    res.render('products/new.ejs',{categories});
})
app.post('/products', async(req,res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
})
app.get('/products/:id',async (req,res) => {
    const{id}=req.params;
    const product= await Product.findById(id);
    res.render('products/show.ejs',{product})
})
app.get('/products/:id/edit',async (req,res) => {
    const{id}=req.params;
    const product= await Product.findById(id);
    res.render('products/edit.ejs',{product,categories})
})
app.put('/products/:id',async (req,res) => {
    const{id}=req.params;
    const product= await Product.findByIdAndUpdate(id,req.body,{runValidators:true,new:true});
    res.redirect(`/products/${product._id}`)
})
app.delete('/products/:id',async (req,res) => {
    const {id}=req.params;
    const deletedProduct= await Product.findByIdAndDelete(id);
    res.redirect('/products');

})
app.listen(8080, () =>{
    console.log("Listening on server 8080")
})

