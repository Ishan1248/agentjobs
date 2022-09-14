const path = require("path");
const catchAsync = require(path.join(__dirname, "..", "..", "utils", "catchAsync"));
const AppErr = require(path.join(__dirname, "..", "..", "utils", "AppErr"));
const checkArr = [
    "country",
    "state",
    "city",
    "companyName",
    "companyType",
    "companyAddress",
];

// GET ALL COMPANY INFO
exports.getAllCompanyInfo=catchAsync(async (req,res,next)=>{
    const user=req.user;
    const companyInfo=user.companyInformation;
    res.status(200).json({
        message:"Company Info",
        companyInfo,
    })
});

//ADD COMPANY INFO
exports.addCompanyInfo=catchAsync(async(req,res,next)=>{
    const user=req.user;
    const companyInfo={};
    if(!user==="recruiter") return next(new AppErr("unauthorized,Please login using Recruiter",403));
    for(const [key,value] of Object.entries(req.body)){
        if(!checkArr.includes(key)) return next(new AppErr(`Wrong value Entered`,400));
        companyInfo[key]=value;
    }
    user.companyInformation=companyInfo;
    await user.save;
    res.status(200).json({
        message:"Company Info Successfully Added",
        companyInfo,
    })
});

//UPDATE COMPANY INFO
exports.updateCompanyInfo=catchAsync(async(req,res,next)=>{
    const user=req.user;
    const {companyInfoId}=req.body;
    if(!companyInfoId) return next(new AppErr("Please provide document ID",400));
    const constInfoDoc=user.companyInformation.id(companyInfoId);
    for(const [key,value] of Object.entries(req.body)){
        if (key==="companyInfoId") continue;
        if(!checkArr.includes(key)) return next(new AppErr(`Wrong value Entered`,400));
        companyInfoDoc[key]=value;
    }
    await user.save();
    res.status(200).json({
        message:"Company Info Successfully Updated",
        companyInfoDoc,
    })
});

//DELETE COMPANY INFO
exports.deleteCompanyInfo=catchAsync(async(req,res,next)=>{
    const user=req.user;
    const {companyInfoId}=req.body;
    if(!companyInfoId) return next(new AppErr("Please provide document ID",400));
    const companyInfoDoc=user.companyInformation.id(componyInfoId);
    companyInfoDoc.remove();
    res.status(200).json({
        message:"Company Info Successfully Deleted",
        companyInfoDoc,
    })
});