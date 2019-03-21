const express = require('express');

const router = express.Router();
const User = express('./')

router.get('/',(req,res)=>{
    res.render('index.html');
})

router.get('/login',(req,res)=>{
   res.render('login.html');
})

router.get('/register',(req,res)=>{
   res.render('register.html');
})

router.post('/register',(req,res)=>{
    console.log(req.body);
})
module.exports=router;