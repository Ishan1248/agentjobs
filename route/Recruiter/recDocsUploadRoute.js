const path = require("path");
const express = require("express");
const router = express.Router();
const userAuthController = require(path.join(__dirname, "..", "..", "controller", "userAuthController"));
const recDocsUploadController = require(path.join(
  __dirname,
    "..",
    "..",
    "controller",
    "Recruiter",
    "docUploadController"
));
router.use(userAuthController.protect);
router.get("/getDocsUploaded",recDocsUploadController.getDocsUploaded);
router.post("/addDocsUploaded",recDocsUploadController.addDocsUploaded);
router.patch("/updateDocsUploaded",recDocsUploadController.updateDocsUploaded);
router.delete("/deleteDocsUploaded",recDocsUploadController.deleteDocsUploaded);
module.exports=router;
