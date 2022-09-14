const path = require("path");
const express = require("express");
const router = express.Router();
const userAuthController = require(path.join(__dirname, "..", "..", "controller", "userAuthController"));
const userPersonalInfoController = require(path.join(
  __dirname,
  "..",
  "..",
  "controller",
  "candidate",
  "userPersonalInfoController"
));
const uploadVideo=require(path.join(__dirname,"..","..","helpers","multerVideoUpload"));

router.use(userAuthController.protect);
router.post("/updatePersonalInfo", userPersonalInfoController.updatePersonalInfo);
router.get("/getPersonalInfo", userPersonalInfoController.getPersonalInfo);
//Upload video
router.post("/uploadvideo",uploadVideo.array("videos",5),(req,res)=>{
    res.send(req.files);
},(error,req,res,next)=>{
  res.status(400).send({error:error.message});
})


module.exports = router;
