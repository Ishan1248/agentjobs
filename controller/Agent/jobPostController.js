const path = require("path");
const catchAsync = require(path.join(__dirname, "..","..", "utils", "catchAsync"));
const ApiFeatures=require(path.join(__dirname,"..","..","utils","apiFeatures"));
const jobpost=require(path.join(__dirname,"..","..","model","JobPostSchema"));
const AppErr=require(path.join(__dirname,"..","..","utils","AppErr"));
//const errorHandler = require(path.join(__dirname,"..","..","common_middleware","errorHandler"));

exports.getAvailableJobs = catchAsync(async (req, res, next) => {
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