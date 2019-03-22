const express = require('express');
const router = express.Router();
const User = require('./models/user');
var md5 = require('md5');

router.get('/',(req,res)=>{
    res.render('index.html');
})

router.get('/login',(req,res)=>{
   res.render('login.html');
})

router.get('/register',(req,res)=>{
   res.render('register.html');
})

router.get('/logout',(req,res)=>{
    
})

router.post('/login',(req,res,next)=>{
    var body= req.body;
    body.password = md5(md5(body.password));
    User.findOne(body,(err,user)=>{
        if(err){
            return next(err);
        }
        if(user!=null){
            res.status(200).json({
                err_code:0,
                message:'login successfully.'
            })
        }else{
            res.status(200).json({
                err_code:1,
                message:'username or password is not correct.'
            })
        }
    })
})

router.post('/register',(req,res,next)=>{
    var body = req.body;
    console.log(body);
    User.findOne({email:body.email},(err,user)=>{
        if(err){
             return next(err);
        }
        if(user!=null){
            res.status(200).json({
                err_code:1,
                message:'already registered.'
            })
        }else{
            new User(body).save((err,user)=>{
                if(err){
                    return next(err);
                }
                res.status(200).json({
                    err_code:0,
                    message:'register successfully.'
                })
            })
        }
    })
   
})
module.exports=router;