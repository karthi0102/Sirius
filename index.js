const express= require('express');
const app=express()
const session =  require('express-session');
const { use } = require('express/lib/application');
app.use(session({secret:'thisIsNotGoodSecret',resave:false,saveUninitialized:false}))

app.get('/',(req,res)=>{
    res.redirect('/viewcount');
})

app.get('/viewcount',(req,res)=>{
    req.session.count+=1;
    res.send(`You have viewed this page ${req.session.count} time`)
})
app.get('/register',(req,res)=>{
    const {username="Anonyums"} =  req.query
    req.session.username=username;
    res.redirect('/greet');
})
app.get('/greet',(req,res)=>{
    const{username}=req.session;
    res.send(`Welcome back ${username}`)
})

app.listen(8080,()=>{
    console.log("Server running on port 8080")
})