const path = require("path");
const catchAsync = require(path.join(__dirname, "..", "..", "utils", "catchAsync"));
const AppErr = require(path.join(__dirname, "..", "..", "utils", "AppErr"));
const userAuthController = require(path.join(__dirname, "..", "..", "controller", "userAuthController"));
const multer = require("multer");
const uploadDocs=require(path.join(__dirname,"..","..","helpers","multerDocsUpload"));

const checkArr= [
    "taxIdNumber",
    "documentName",
    "documentNumber",
    "documentPath",
    "documentVerified",
    "documentExpiryDate",
];

// exports.uploadDoc = catchAsync(async (req, res, next) => {
//     uploadDocs.array("documents",5),(req,res,next)=>{
//         res.send(req.files);
//     },(error,req,res,next)=>{
//         res.status(400).send({error:error.message});
//     }
//     });

//     const user = req.user;
//     const {doc}=user.documents;
//     const filetypes = /jpeg|jpg|png|pdf/;
//     const extname=filetypes.test(path.extname(file.dummy.pdf).toLowerCase());
//     const mimetype=filetypes.test(file.mimetype);
//     if(mimetype && extname){
//         return cb(null,true);
//     }else{
//         cb("Error");
//     }
//     var upload=multer({storage:storage ,
//         limits:{filesize:5000000}}).single("document");
//     //upload(req,res,async(err)=>{
//       //  if(err) return res.status(400).send("Something went wrong");
//     var storage=multer.diskStorage({
//     destination:function(req,file,cb){
//         cb(null,'uploads/');
//     },
//     filename:function(req,file,cb){
//         cb(null,dummy.pdf);
//     }
// });


//GET ALL DOCUMENTS UPLOADED
exports.getDocsUploaded = catchAsync(async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
        data: {
            message: "DOCUMENTS UPLOADED",
            doc: user.documentsUploaded,
        },
    });
});
    




// UPDATE DOCUMENTS UPLOADED
exports.updateDocsUploaded = catchAsync(async (req, res, next) => {
    const user = req.user;
    const { docDocId } = req.body;
    if (!docDocId) return next(new AppErr("Please Provide Sub Document ID", 400));
    const docSubDoc = user.documentsUploaded.id(docDocId);
    // loop through req.body
    for (const [key, value] of Object.entries(req.body)) {
        // if docid then dont go through further steps
        if (key === "docDocId") continue;
        // check if field available in checkArr, if not return error
        if (!checkArr.includes(key)) return next(new AppErr(`Wrong Value Entered ${key}`, 400));
        // update subdocument
        docSubDoc[key] = value;
    }
    await user.save();
    res.status(200).json({
        data: {
            message: "Document Successfully Updated",
            doc: docSubDoc,
        },
    });
});

// DELETE DOCUMENTS UPLOADED
exports.deleteDocsUploaded = catchAsync(async (req, res, next) => {
    const user = req.user;
    const { docDocId } = req.body;
    if (!docDocId) return next(new AppErr("Please Provide Sub Document ID", 400));
    const docSubDoc = user.documentsUploaded.id(docDocId);
    docSubDoc.remove();
    await user.save();
    res.status(200).json({
        data: {
            message: "Document Successfully Deleted",
            doc: docSubDoc,
        },
    });
});
