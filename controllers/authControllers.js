const User = require('../model/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//REGISTER
const registerController = async(req,res)=>{
    try {
        const {username,email,password,address,phone,answer} =req.body;
        //valdation
        if(!username || !email || !password || !address || !phone ||!answer){
           return  res.status(500).json({
            success:false,    message:"Please Provide all details",
            }) 
        }
        //check email exist
        const exisiting = await User.findOne({ email });
        if(exisiting){
            return res.status(500).json({
                success:false,   message:"email already registered",
            })
        }
        //hashing password using bcryptjs
        const salt =bcrypt.genSaltSync(10);
        const hashPassword =await bcrypt.hash(password,salt);
        //create new user
        const user = await User.create({username,email,password:hashPassword,address,phone,answer})
        res.status(200).json({
            success:true,  message:"successfully registered"
        })

    } catch (error) {
        // console.log(error)
        res.status(500).json({
            success:false,  message:"Error in Register API",
            error
        })
    }

}


//LOGIN
const loginController = async(req,res)=>{   //http://localhost:8040/api/v1/login
    try {
        const {email,password}=req.body;
        //validation
        if(!email || !password ){
            return  res.status(500).json({
             success:false,    message:"Please Provide all details",
             }) 
         }
        //checking email & password
        const userExist = await User.findOne({ email : email });
        if(!userExist){
            return res.status(500).json({
                success:false,   message:"Invalid email address ",
            })
        }
        //Compare password Using bcryptjs
        const isMatch = await bcrypt.compare(password,userExist.password)
        if(!isMatch){
           return res.status(500).json({  success:false,   message:"Invalid credintial", })
        }
        //token____ JWT <its a new way og jwt>
        const token = jwt.sign({id:userExist._id} , process.env.JWT_SECRET_KEY,{ expiresIn:"7d"})       //this id goes to authmiddlewares
        //response
        res.status(200).json({
            success:true,  message:"Login successfully ",
            token , userExist
        })
    } catch (error) {
        res.status(500).json({
            success:false,  message:"Error in Login API",
            error
        })
    }
}

module.exports= {registerController,loginController};