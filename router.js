const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController');

router.get('/',userController.user_home_get);

router.get('/login',userController.user_login_get);

router.get('/register',userController.user_register_get);

router.get('/logout',userController.user_logout_get);

router.post('/login',userController.user_login_post);

router.post('/register',userController.user_register_post);

module.exports=router;