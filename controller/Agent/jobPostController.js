//const ErrorHandler = require("../../utils/errorHandler");
// const catchAsyncErrors = require("../../common_middleware/catchAsyncError");
// const ApiFeatures = require("../../utils/apiFeatures");
// const jobpost=require('../../model/JobPostSchema');
// const AppErr=require('../../utils/AppErr');
const ErrorHandler = require(path.join(__dirname,"..","..","utils","errorHandler"));
const catchAsyncErrors = require(path.join(__dirname,"..","..","common_middleware","catchAsyncError"));
const ApiFeatures = require(path.join(__dirname,"..","..","utils","apiFeatures"));
const jobpost=require(path.join(__dirname,"..","..","model","JobPostSchema"));
const AppErr=require(path.join(__dirname,"..","..","utils","AppErr"));

exports.getAvailableJobs = catchAsyncErrors(async (req, res, next) => {
  const user=req.user;
  if(user.role==="Agent" || user.role==="agent"){
   const resultPerPage=8;
   const apiFeatures=new ApiFeatures(jobpost.find(),req.query).pagination(resultPerPage);
   const availablejobs=await apiFeatures.query;
  res.status(200).json({
    success: true,
    availablejobs,
  });
}
else{
  return next(new AppErr("Unauthorized, Please Login as Agent", 403));
}
});