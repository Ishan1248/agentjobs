const path = require("path");
const catchAsync = require(path.join(__dirname, "..", "..", "utils", "catchAsync"));
const AppErr = require(path.join(__dirname, "..", "..", "utils", "AppErr"));
const userAuthController = require(path.join(__dirname, "..", "..", "controller", "userAuthController"));

const checkArr= [
    "documentName",
    "documentNumber",
    "documentPath",
    "documentVerified",
    "documentExpiryDate",
];

//GET ALL DOCUMENTS UPLOADED
exports.getDocsUploaded=catchAsync(async(req,res,next)=>{
    const user=req.user;
    res.status(200).json({
        message:"DOCUMENTS UPLOADED",
        doc:user.documentsUploaded,
    })
});

//ADD DOCUMENTS UPLOADED
exports.addDocsUploaded=catchAsync(async(req,res,next)=>{
    const user=req.user;
    const doc={};
    if(!user.role==="Recruiter") return next(new AppErr("Unauthorized,Please Login Using Recruiter",403));
    for(const [key,value] of Object.entries(req.body)){
        if(!checkArr.includes(key)) return next(new AppErr(`Wrong value entered ${key}`));
        doc[key]=value;
    }
    user.documentsUploaded=doc;
    await user.save;
    res.status(200).json({
        message:"Document Successfully Added",
        doc:doc,
    })
});

//UPDATE DOCUMENTS UPLOADED
exports.updateDocsUploaded=catchAsync(async(req,res,next)=>{
    const user=req.user;
    const {docId}=req.body;
    if(!docId) return next(new AppErr("Please provide Document ID",400));
    const doc=user.documentsUploaded.id(docId);
    for(const [key,value] of Object.entries(req.body)){
        if(key==="docId") continue;
        if(!checkArr.includes(key)) return next(new AppErr(`Wrong value entered ${key}`));
        doc[key]=value;
    }
    await user.save();
    res.status(200).json({
        message:"Document Successfully Updated",
        doc:doc,
    })
});

//DELETE DOCUMENTS UPLOADED
exports.deleteDocsUploaded=catchAsync(async(req,res,next)=>{
    const user=req.user;
    const {docId}=req.body;
    if(!docId) return next(new AppErr("Please provide Document ID",400));
    const doc=user.documentsUploaded.id(docId);
    doc.remove();
    await user.save();
    res.status(200).json({
        message:"Document Successfully Deleted",
        doc:doc,
    })
});