const User = require('../models/user.js');
var md5 = require('md5');

module.exports ={
    user_register_post:function(req,res,next){
        var body = req.body;
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
                body.password = md5(md5(body.password));
                new User(body).save((err,user)=>{
                    if(err){
                        return next(err);
                    }
                    req.session.user = body;
                    res.status(200).json({
                        err_code:0,
                        message:'register successfully.'
                    })
                })
            }
        })
    },
    user_login_post:(req,res,next)=>{
        var body= req.body;
        body.password = md5(md5(body.password));
        User.findOne(body,(err,user)=>{
            if(err){
                return next(err);
            }
            if(user!=null){
                req.session.user = user;
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
    },
    user_login_get:(req,res,next)=>{
        res.render('login.html');
    },
    user_register_get:(req,res,next)=>{
        res.render('register.html');
    },
    user_logout_get :(req,res,next)=>{
        req.session.user = null;
        res.redirect('/');
    },
    user_home_get :(req,res,next)=>{
        res.render('index.html',{
            user:req.session.user
        })
    }
}