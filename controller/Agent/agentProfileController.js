// const ErrorHandler = require("../../utils/errorHandler");
// const catchAsyncErrors = require("../../common_middleware/catchAsyncError");
// const ApiFeatures = require("../../utils/apiFeatures");
// const AppErr=require('../../utils/AppErr');
// const agentschema=require('../../model/AgentSchema');
const ErrorHandler = require(path.join(__dirname,"..","..","utils","errorHandler"));
const catchAsyncErrors = require(path.join(__dirname,"..","..","common_middleware","catchAsyncError"));
const ApiFeatures = require(path.join(__dirname,"..","..","utils","apiFeatures"));
const AppErr=require(path.join(__dirname,"..","..","utils","AppErr"));
const agentschema=require(path.join(__dirname,"..","..","model","AgentSchema"));



const checkArr=[
    "name",
    "email",
    "password",
    "confirmPassword",
    "phone",
    "address",
    "city",
    "state",
    "country",
    "pincode",
    "companyName",
    "companyAddress",
    "companyType",
    "companyCity",
    "companyState",
    "companyCountry",
]

//GET AGENT PROFILE 
exports.getAgentProfile = catchAsyncErrors(async (req, res, next) => {
    const user=req.user;
    if(user.role==="Agent" || user.role==="agent"){
    const agent=await agentschema.findById(user._id);
        res.status(200).json({
            success: true,
            agent,
        });
    }
    else{
        return next(new AppErr("Unauthorized, Please Login as Agent", 403));
    }
});

//UPDATE AGENT PROFILE
exports.updateAgentProfile = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;
  if (!user.role === "agent" ) return next(new AppErr("Unauthorized, Please Login Using Agent", 403));
  for (const [key, value] of Object.entries(req.body)) {
    if (!checkArr.includes(key)) return next(new AppErr(`Wrong Value Entered ${key}`, 400));
    user["agentprofile"][`${key}`] = value;
  }
  const doc = await user.save();
  res.status(200).json({
    status: "success",
    data: {
      message: "Agent profile Successfully Updated",
      doc,
    },
  });
});
