const express = require('express');
const app = express();
const router = require('./router')
const bodyParser = require('body-parser');
const session = require('express-session');

app.engine('html',require('express-art-template'));

app.use('/public',express.static('./public'));
app.use('/node_modules',express.static('./node_modules'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret:'jerry-blog',
    resave:false,
    saveUninitialized:false
}))

app.use(router);

app.use((req,res)=>{
    res.send('404 page');
})

app.use((err,req,res,next)=>{
    res.status(500).json({
        err_code:500,
        message:err.message
    })
})
app.listen(7000,()=>{
    console.log('server is starting...');
})