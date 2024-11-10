const express= require('express');
const path=require('path');
const app=express();
const Cookies= require('cookies');
const { profile } = require('console');




app.set('view engine','hbs');
app.set('views', 'd:/java/Shushant university/Session/views');

app.use(express.urlencoded({extended:true}));

const keys=['keyboard cat']


//if we are logged in then we cannot go back to loggin 

app.post('/login',(req,res)=>{
    const {username}=req.body;
    var cookies = new Cookies(req, res, { keys: keys })
   cookies.set('user',JSON.stringify({
    isAdmin: false,
    user : username
}))
res.redirect('/profile');
})
app.get('/login',(req,res)=>{

    var cookies = new Cookies(req, res, { keys: keys });

    const data= cookies.get('user');

    if(!data || data.username) return res.render('login')
    
        res.redirect('/profile');


})


// we cannot access the profile before login
app.get('/profile',(req,res)=>{
    var cookies = new Cookies(req, res, { keys: keys });

    const data= cookies.get('user');

    if(! data || data.username) return res.redirect('/login')
    
    if(data.isAdmin==true) return res.render('admin');
    console.log(data);
    res.render('profile',{
      username: data.username  
    })
})

app.listen(3002,()=>{
    console.log("hi your server have connected");
})