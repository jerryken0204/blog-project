const express = require('express');
const app = express();
const router = require('./router')
const bodyParser = require('body-parser');

app.engine('html',require('express-art-template'));

app.use('/public',express.static('./public'));
app.use('/node_modules',express.static('./node_modules'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(router);

app.listen(7000,()=>{
    console.log('server is starting...');
})