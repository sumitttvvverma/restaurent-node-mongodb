const User = require('../model/userModel');
const bcrypt = require('bcryptjs')

//GET INFO USER
const getUser = async(req,res)=>{           //http://localhost:8040/auth/v1/getUser
    try {
        // res.status(200).json({msg:"user Data"})
        // console.log(req);
        // console.log(req.body);
        console.log(req.body.id);

        //find user
        const user = await User.findById({_id:req.body.id},{password:0})
        console.log(user)
        //validation
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not Found during getUser"
            })
        }
        //hide password
        // user.password=undefined;

        //response
        res.status(200).json({
            success:true,
            message:"user get successfully",
            user
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"error in getUser---userControllers",
            error
        })
    }
}


//UPDATE USER
const updateUser=async(req,res)=>{      //http://localhost:8040/auth/v1/updateUser
    try {
        //find user
        const user = await User.findById({_id:req.body.id})
        //validation
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not Found during updateUser"
            })
        }
        //update 
        const {username,address,phone} = req.body
        if(username) user.username= username
        if(address) user.address= address
        if(phone) user.phone= phone
        //save user
        await user.save()
        res.status(200).send({
            success:true,
            message:"User Update Successfully"
        }); 
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"error in update user API",
            error
        })
    }
}

//UPDATE PASSWORD
const updateUserPassword=async(req,res)=>{
    try {
        //find user
        const user=await User.findById({_id:req.body.id})
        //validation
        if(!user){
            return res.status(404).json({
                success:false,
                message:"user not found"
            })
        }
        //get data from user
        const {oldPassword,newPassword}=req.body;
        if(!oldPassword || !newPassword ){
            return res.status(404).json({
                success:false,
                message:"please provide old/new P to Update password"
            })
        } 
        //compare old password
        const inMatch = await bcrypt.compare(oldPassword,user.password)
        if(!inMatch){
            return res.status(404).json({
                success:false,
                message:"invalid old password"
            })
        }
        //hashing newPassword using bcryptjs
        const salt =bcrypt.genSaltSync(10);
        const hashPassword =await bcrypt.hash(newPassword,salt);
        //give hashed newPassword to user
        user.password=hashPassword;
        user.save();
        return res.status(200).json({
            success:true,
            message:"Password update succussfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"error in update user password",
            error
        })
    }
}

//RESET PASSWORD
const resetUserPassword=async(req,res)=>{       //http://localhost:8040/auth/v1/resetPassword with Auth
    try {
        const {email,newPassword,answer} = req.body;
        if(!email || !newPassword || !answer){
            return res.status(404).json({
                success:false,
                message:"please provide all details to reset password"
            })
        }
        //find user
        const user = await User.findOne({email,answer});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"user not found to reset password"
            })   
        }
         //hashing password using bcryptjs
         const salt =bcrypt.genSaltSync(10);
         const hashPassword =await bcrypt.hash(newPassword,salt);
         //giving newPassword to user
         user.password =hashPassword 
         await user.save() //for svae
         res.status(200).send({
            success:true,
            message:"User password reset Successfully"
        }); 
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"error in reset user password",
            error
        })
    }
}

const deleteUserPassword=async(req,res)=>{                  //http://localhost:8040/auth/v1/deleteUser/663f7195f6051f5f80d1c124
    try {
        // await User.findByIdAndDelete(req.params.id);    //if it is not working then use remove
        const user=await User.findById(req.params.id)
        await user.remove();
        return res.status(200).json({
            success:true,
            message:"account has been deleted"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"error in delete user ",
            error
        }) 
    }
}

module.exports ={getUser,updateUser,updateUserPassword,resetUserPassword,deleteUserPassword}