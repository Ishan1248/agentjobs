// const ErrorHandler = require("../utils/errorHandler");
// const catchAsyncError = require("./catchAsyncError");
const path=require("path");
const ErrorHandler = require(path.join(__dirname,"..","utils","errorHandler"));
const catchAsyncError = require(path.join(__dirname,"..","common_middleware","catchAsyncError"));
const jwt = require ('jsonwebtoken')
const User = require('../model/userModel')

exports.isAuthendicatedUser = catchAsyncError(async(req,res,next)=>{
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler('please login to access this resource',401));
    }

    const decodeData = jwt.verify(token,process.env.JWT_SECRET)

   req.user = await User.findById(decodeData._id)
   next(); 
});

exports.authorizeRole=catchAsyncError(async()=>{
    
})