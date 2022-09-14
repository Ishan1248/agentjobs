const path = require("path");
const express = require("express");
const router = express.Router();
const userAuthController = require(path.join(__dirname, "..", "..", "controller", "userAuthController"));
const agentDocsUploadController = require(path.join(
  __dirname,
    "..",
    "..",
    "controller",
    "Agent",
    "docUploadController"
));
const uploadDocs=require(path.join(__dirname,"..","..","helpers","multerDocsUpload"));

router.use(userAuthController.protect);
//router.get("/getDocsUploaded",agentDocsUploadController.getDocsUploaded);
//router.post("/uploadDocs",agentDocsUploadController.uploadDoc);
router.post("/uploadDocs",uploadDocs.array("documents",5),(req,res)=>{
    res.send(req.files)
},(error,req,res,next)=>{
  res.status(400).send({error:error.message})
})


//router.patch("/updateDocsUploaded",agentDocsUploadController.updateDocsUploaded);
//router.delete("/deleteDocsUploaded",agentDocsUploadController.deleteDocsUploaded);
module.exports = router;


