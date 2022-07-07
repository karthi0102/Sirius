const express = require('express');
const app = express();
const User = require('./models/user')
const bcrypt=require('bcrypt');
const mongoose=require('mongoose');
const session = require('express-session')
mongoose.connect('mongodb://localhost:27017/authDemo',{useNewUrlParser:true,useUnifiedTopology:true})
.then( () => {
    console.log("Connection open")
}).catch(err => {
    console.log("OOPS !! ERROR")
})
app.set('view engine','ejs');
app.set('views','views');
app.use(express.urlencoded({extended:true}))
app.use(session({secret:'notagoodsecret'}))
const requirelogin = (req,res,next)=>{
    if(!req.session.user_id){
        res.redirect('/login')
    }
    next();
}
app.get('/',(req,res)=>{
    res.send("Home page");
})
app.get('/register',(req,res)=>{
    res.render('register.ejs')
})
app.post('/register', async (req,res)=>{
    const{username,password}=req.body;
    const user = new User({username, password})
    await user.save();
    req.session.user_id=user._id;
    res.redirect('/')
})
app.get('/login',(req,res)=>{
    res.render('login.ejs')
})
app.post('/login',async(req,res)=>{
    const{username,password}=req.body;
    const foundUser= await User.findAndValidate(username,password);
    if(foundUser){
        req.session.user_id=foundUser._id;
        res.redirect('/secret');
    }else{
        res.redirect('/login')
    }
})
app.get('/secret',requirelogin,(req,res)=>{
   
    res.render('secret.ejs')
})
app.post('/logout',(req,res)=>{
    req.session.user_id=null;
    res.redirect('/login');
})
app.listen(8080,()=>{
    console.log("Server is listening")
})