const express = require("express");

const authMiddleware = require("../middlewares/authMiddlewares");
const { createFoodController, getAllFoodController, getFoodByIdController, getFoodByRestaurentController, updateFoodController, deleteFoodController, placeOrderController, orderStatusController } = require("../controllers/foodControllers");
const admin = require("../middlewares/adminMiddleware");


const router = express.Router();

//routes
//create food
router.route('/create').post(authMiddleware,createFoodController)

//getAll
router.route('/getAll').get(authMiddleware,getAllFoodController)

//get by id
router.route('/get/:id').get(authMiddleware,getFoodByIdController)

//get food by restaurent
router.route('/getByRestaurent/:id').get(authMiddleware,getFoodByRestaurentController)

//update food
router.route('/update/:id').patch(authMiddleware,updateFoodController)

//delete food by id
router.route('/delete/:id').delete(authMiddleware,deleteFoodController)



//PLACE ORDER
router.route('/placeOrder').post(authMiddleware,placeOrderController)

//ORDER STATUS
router.route('/orderStatus/:id').post(authMiddleware,admin,orderStatusController)

module.exports = router;