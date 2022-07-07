const express = require('express');
const app =express();
const morgan = require('morgan');
const AppError=require('./AppError')
app.use(morgan('dev'));
app.use((req,res,next) => {
    req.requestTime=Date.now();
    next();
})
app.use('/dogs',(req,res,next) => {
    console.log("I LOVE DOGS");
    next();
})
const verifyPassword = (req,res,next) => {
    const {password} =req.query;
    if(password==="karthi12003"){
        next()
    }else{
      throw new AppError('Password required',401)
    }
}
app.get('/',(req,res) => {
    console.log(`Request Time :${req.requestTime}`);
    res.send('helllo');
})
app.get('/dogs',(req,res) => {
    console.log(`Request Time :${req.requestTime}`);
    res.send('woofs');
})
app.get('/error', (req,res) => {
    chicken.fly();
})
app.get('/admin',(req,res)=>{
    throw new AppError('You are not an admin',403);
})
app.get('/secret',verifyPassword,(req,res) => {
    res.send("SOMETIMES I FEEL ALONE AND NO ONE LOVES ME")
})
app.use((req,res,next) => {
    res.status(404).send("NOT FOUND")
})
app.use((err,req,res,next) => {
   const{status=500,message="Something went wrong"}=err;
   res.status(status).send(message);
})
app.listen(8080,() => {
    console.log("SERVER RUNNING ON PORT 8080")
})