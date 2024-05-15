const Restaurent = require("../model/restaurantModel");


//create restaurent
const createRestaurentController=async(req,res)=>{      //http://localhost:8040/api/v1/restaurent/create
    try {
        // const restaurentData = req.body;
        const {title,imageUrl,foods,time,pickup,delivery,isOpen,logoUrl,rating,ratingCount,code,coords}=req.body;
        //validation
        if(!title || !coords){
            return res.status(500).json({
                success:false,
                message:"please provide title and address ",
            }) 
        }
        const newRestaurent = await Restaurent.create({title,imageUrl,foods,time,pickup,delivery,isOpen,logoUrl,rating,ratingCount,code,coords})
        await newRestaurent.save();
        res.status(200).json({
            success:true,
            message:"new restaurent created succesfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"error in create restaurent api ",
            error
        }) 
    }
}


//get all restaurent
const getAllRestaurent = async(req,res)=>{            //http://localhost:8040/api/v1/restaurent/getAll
    try {
        const AllRestaurent = await Restaurent.find();
        if(!AllRestaurent){
            return res.status(500).json({
                success:false,
                message:"No restaurent found",
            }) 
        }
        res.status(200).json({
            success:true,
            message:"restaurents",
            Restaurents:AllRestaurent.length,
            AllRestaurent
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"error in create restaurent api ",
            error
        }) 
    }
}

//get restaurent by id
const getRestaurentById =async(req,res)=>{
    try {
        //way1
        // const restaurentId = req.params.id;
        // if(!restaurentId){
        //     return res.status(404).json({
        //         success:false,
        //         message:"id not found",
        //     })
        // }
        //find restaurent
        // const getRestaurent = await Restaurent.findById(restaurentId)
        //way2
        //find restaurent
        const getRestaurent = await Restaurent.findById({_id:req.params.id})
        if(!getRestaurent){
            return res.status(404).json({
                success:false,
                message:"no found restaurent by id",
            }) 
        }
        res.status(200).json({
            success:true,
            message:"restaurent found",
            getRestaurent
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"error in get by id restaurent api ",
            error
        }) 
    }
}

//delete restaurent by id
const deleteRestaurent=async(req,res)=>{            //http://localhost:8040/api/v1/restaurent/get/6641a6f951843b5478b3f623
    try {
        const id=req.params.id;
        const deleteRestau = await Restaurent.findById(id);
        if(!deleteRestau){
            return res.status(404).json({
                success:false,
                message:"no delete restaurent by id",
            }) 
        }    
        await deleteRestau.remove();
        res.status(200).json({
            success:true,
            message:"restaurent delete successfully",
        })    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"error in delete restaurent api ",
            error
        }) 
    }
}

module.exports = {createRestaurentController,getAllRestaurent,getRestaurentById,deleteRestaurent}