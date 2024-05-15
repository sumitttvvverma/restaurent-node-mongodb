const Category = require("../model/categoryModel");

const createCatController=async(req,res)=>{            //http://localhost:8040/api/v1/category/create
    try {
        const {title,imageUrl}=req.body;
        //validation
        if(!title){
            return res.status(500).json({
                success:true,
                message:"please provide title n imageUrl"
            })
        }
        const newCategory= await Category.create({title,imageUrl})
        res.status(201).json({
            success:true,
            message:" category created successfully ",
            newCategory
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"error in create category api ",
            error
        })    
    }
}

const getAllCatController=async(req,res)=>{         //http://localhost:8040/api/v1/category/getAll
    const getAll = await Category.find();
    if(!getAll){
        return res.status(404).json({
            success:true,
            message:"No category found"
        })
    }
        res.status(201).json({
            success:true,
            message:" category get successfully ",
            totalCategory :getAll.length,
            getAll
        })
    
}

const updateCatController=async(req,res)=>{         //http://localhost:8040/api/v1/category/update/664215d69227952bb4e3ffc7
    try {
        //const findCatAndUpdate = await Category.findById({_id:req.params.id});
        const CatId =req.params.id;
        if(!CatId){
            return res.status(500).json({
                success:true,
                message:"please provide correct id"
            }) 
        }
        const findCatAndUpdate = await Category.findById(CatId);
        if(!findCatAndUpdate){
            return res.status(404).json({
                success:true,
                message:"Category not found for update"
            }) 
        }
        const {title,imageUrl}=req.body;
        //for update
        if(title){
            findCatAndUpdate.title = title;
        }
        if(imageUrl){
            findCatAndUpdate.imageUrl = imageUrl;
        }
        await findCatAndUpdate.save();
        res.status(200).json({
            success:true,
            message:"category update successfully",
            findCatAndUpdate
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"error in update category api ",
            error
        })
    }
}

const deleteCatController=async(req,res)=>{         //http://localhost:8040/api/v1/category/delete/6642facdca7ec05b606eef89
    try {
        const deleteCat = await Category.findById({_id:req.params.id});
        if(!deleteCat){
            return res.status(404).json({
                success:true,
                message:"Category not found for delete"
            }) 
        }
        await deleteCat.remove();
        res.status(200).json({
            success:true,
            message:"category delete successfully",
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"error in delete category api ",
            error
        })
    }
}


module.exports={createCatController,getAllCatController,updateCatController,deleteCatController};