const express=require('express');
const { getUser, updateUser, updateUserPassword, resetUserPassword, deleteUserPassword } = require('../controllers/userControllers');
const authMiddleware = require('../middlewares/authMiddlewares');
const router=express.Router();

//GET USER
router.route('/getUser').get(authMiddleware , getUser);

//UPDATE USER
router.route('/updateUser').put(authMiddleware , updateUser);

//password update
router.route('/updatePassword').post(authMiddleware,updateUserPassword)

//reset password
router.route('/resetPassword').post(authMiddleware,resetUserPassword)

//delete user
router.route('/deleteUser/:id').delete(authMiddleware,deleteUserPassword)

module.exports=router;