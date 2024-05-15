const express=require('express');
const authMiddleware = require('../middlewares/authMiddlewares');
const { createRestaurentController, getAllRestaurent, getRestaurentById, deleteRestaurent } = require('../controllers/restaurentControllers');

const router=express.Router();

//routes
//Create restaurent ||POST
router.route('/create').post(authMiddleware,createRestaurentController)

//Get all restaurent || GET
router.route('/getAll').get(authMiddleware,getAllRestaurent)

//get restaurent by ID || GET
router.route('/get/:id').get(authMiddleware,getRestaurentById)

//DELETE || delete restaurent
router.route('/delete/:id').delete(authMiddleware,deleteRestaurent)

module.exports=router;