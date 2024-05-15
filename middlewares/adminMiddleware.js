const User = require('../model/userModel');

const admin = async(req,res,next)=>{
    try {
        const user = await User.findById({_id:req.body.id});
        if(user.usertype !== "admin"){
            return res.status(404).send({
                success:false,
                message:"only admin access"
            })
        }else{
           next(); 
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Admin Access Error",
            error
        })
    }
}

module.exports=admin;