const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register',authController.register);
router.post('/login',authController.login);
router.get('/login',(req,res)=>{
    res.send('<h1>Login</h1>')
})


module.exports = router;