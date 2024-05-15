const Foods = require('../model/foodModel');
const Order = require('../model/orderModel');

//create
const createFoodController =async(req,res)=>{   //http://localhost:8040/api/v1/food/create
    try {
        const {title,description,price,imageUrl,foodTags,catgeory,code,isAvailable,restaurent,rating,ratingCount} = req.body;
        if(!title || !description || !price || !restaurent){
            return res.status(500).json({
                success:false,
                message:"please provide all details field"
            }) 
        }
        const newFood = await Foods.create({title,description,price,imageUrl,foodTags,catgeory,code,isAvailable,restaurent,rating,ratingCount});
        res.status(201).json({
            success:true,
            message:" Food created successfully ",
            newFood
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"error in create food  api ",
            error
        })
    }
}

//get All foods
const getAllFoodController=async(req,res)=>{    //http://localhost:8040/api/v1/food/getAll
    try {
        const getAllFood = await Foods.find();
        if(!getAllFood){
            return res.status(500).json({
                success:false,
                message:"no food available in get all"
            }) 
        }
        res.status(200).json({
            success:true,
            message:"All foods here",
            Number_of_foods:getAllFood.length,
            getAllFood
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"error in getAll food  api ",
            error
        }) 
    }
}

//get by id food
const getFoodByIdController=async(req,res)=>{   //http://localhost:8040/api/v1/food/get/66430ace74c4200c58d6b570
    try {
        const getByIdFood = await Foods.findById({_id:req.params.id})
        if(!getByIdFood){
            return res.status(500).json({
                success:false,
                message:"no food available in this id get "
            }) 
        }
        res.status(200).json({
            success:true,
            message:"food found from id",
            getByIdFood
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"error in get by id food  api ",
            error
        })  
    }
}

//get food by restaurent 
const getFoodByRestaurentController=async(req,res)=>{   //http://localhost:8040/api/v1/food/getByRestaurent/66420abd1ef7ba0dac058cb7
    try {
        const restaurentId = req.params.id;
        if(!restaurentId){
            return res.status(500).json({
                success:false,
                message:"no restaurent id found "
            }) 
        }
        const getByRestFood = await Foods.find({restaurent:restaurentId})
        // console.log(getByRestFood);
        if(!getByRestFood){
            return res.status(500).json({
                success:false,
                message:"no food available in this restaurent id get "
            }) 
        }
        res.status(200).json({
            success:true,
            message:"food found from restaurent id",
            getByRestFood
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"error in get by restaurent id food  api ",
            error
        })  
    }
}

//update food 
const updateFoodController = async(req,res)=>{
    try {
        const FoodId = req.params.id;
        if(!FoodId){
            return res.status(500).json({
                success:false,
                message:"no Food id found for update"
            }) 
        }

        //const {title,description,price,imageUrl,foodTags,catgeory,code,isAvailable,restaurent,rating,ratingCount} = req.body;
        //const findFoodAndUpdate = await Foods.findById(FoodId);
        //if(title) findFoodAndUpdate.title=title;
        //we need to do same thing for every object for update so it will be lengthy
        //instead of above 3 lines use more short method
        
        //updatation by thapa  mern method 
        const UpdateData=req.body;
        const GetFoodToUpdate=await Foods.updateOne({_id:FoodId},{ $set:UpdateData })

        res.status(200).json({
            success:true,
            message:"Food update sucessfully",
            GetFoodToUpdate
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"error in update by restaurent id food  api ",
            error
        })
    }
}

//delete food
const deleteFoodController=async(req,res)=>{    //http://localhost:8040/api/v1/food/delete/6643067e29d3bb15300854f4
    try {
        const FoodId = req.params.id;
        if(!FoodId){
            return res.status(500).json({
                success:false,
                message:"no Food id found for delete"
            }) 
        }
        await Foods.deleteOne({_id:FoodId});  //Parameter "filter" to find() must be an object {} not this (FoodId) 
        res.status(200).json({
            success:true,
            message:"delete Food sucessfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"error in delete by restaurent id food  api ",
            error
        })
    }
}

//PLACE ORDER
const placeOrderController = async(req,res)=>{      //http://localhost:8040/api/v1/food/placeOrder
    try {
        const {cart, payment}=req.body;
        if(!cart){
            return res.status(500).json({
                success:false,
                message:"please food cart method"
            })
        }
        let total=0; //not const becoz const ki value change kr skte
        //calculate
        cart.map((i)=>{
            total += i.price
        })
        const newOrder= await Order({foods:cart,
            payment:total,
            buyer:req.body.id   //it comes from authMiddleware
        })
        await newOrder.save(); //require for save order in db
        res.status(200).json({
            success:true,
            message:"Order placed succesfully",
            newOrder
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"error in order restaurent  api ",
            error
        })
    }   
}

//CHANGE ORDER STATUS   
const orderStatusController=async(req,res)=>{
    try {
        const orderId = req.params.id;
        if(!orderId){
            return res.status(500).json({
                success:false,
                message:"please provide order Id"
            })
        }
        const {status}= req.body;
        if(!status){
            return res.status(500).json({
                success:false,
                message:"please provide status"
            })
        }
        const order= await Order.findByIdAndUpdate(orderId, {status}, {new:true})
        res.status(200).json({
            success:true,
            message:"Order status updated",
            order
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"error in order status  api ",
            error
        })
    }
}

module.exports = {createFoodController,getAllFoodController,getFoodByIdController,getFoodByRestaurentController,updateFoodController,deleteFoodController,placeOrderController,orderStatusController}