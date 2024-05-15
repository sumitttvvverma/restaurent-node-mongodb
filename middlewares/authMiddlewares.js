const jwt=require('jsonwebtoken');

const authMiddleware=async(req,res,next)=>{
    try {
        //get token <same but diiffrent code from thapa>
        const token = req.headers["authorization"].split(" ")[1]
        jwt.verify(token , process.env.JWT_SECRET_KEY , (err,decode)=>{
            if(err){
                return res.status(401).send({
                    success:false,  message:"UnAuthorize User",
                })
            }else{
                req.body.id = decode.id;    //req.body.id comes from authControllers
                next();
            }
        })
    } catch (error) {
        res.status(500).json({
            success:false,  message:"Error in AuthMiddleware",
            error
        })   
    }

}

module.exports= authMiddleware ;