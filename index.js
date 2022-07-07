const express =  require('express');
const app=express();
const cookieParser = require('cookie-parser');
app.use(cookieParser('thisIsMySecret'))
app.get('/greet',(req,res)=> {
    const{name}=(req.cookies)
    res.send(`HII ${name}IAM HERE`)
})
app.get('/setname' , (req,res)=>{
    res.cookie('name','karthi')
    res.cookie('job','developer')
    res.send("Cookie send")
})
app.get('/signed',(req,res)=>{
    res.cookie('fruit','grapes',{signed:true});
    res.send("SIGNED COKKIE")
})
app.get('/verify',(req,res)=>{
    console.log(req.cookies);
    console.log(req.signedCookies);
    res.send(req.signedCookies)
})

app.listen(8080, ()=> {
    console.log("Server running on port 8080")
})