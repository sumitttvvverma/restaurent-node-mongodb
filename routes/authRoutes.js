const express = require('express');
const {registerController, loginController} = require('../controllers/authControllers');

const router = express.Router();

//routes
//REGISTER || POST
router.route('/register').post(registerController)

//LOGIN || POST
router.route('/login').post(loginController)

module.exports = router;
