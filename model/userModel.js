const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,"username is required"]
       },
       email: {
        type: String,
        required: [true,"email is required"],
       },
       password: {
        type: String,
        required: [true,"password is required"],
       },
       address:{
        type:Array
       },
       phone: {
        type: String,
        required: [true,"phone number is required"],
       },
       usertype: {
        type: String,
        required: [true,"user type is required"],
        default:'client',
        enum:['client','admin','vendor','driver']
       },
       profile: {
        type: String,
        default: "",
       },
       answer:{
        type: String,
        required:[true,"answer is required"]
       }
}, {timestamps:true} );

const User = mongoose.model('User',userSchema)

module.exports = User;