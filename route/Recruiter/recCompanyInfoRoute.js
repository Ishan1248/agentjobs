const path = require("path");
const express = require("express");
const router = express.Router();
const userAuthController = require(path.join(__dirname, "..", "..", "controller", "userAuthController"));
const companyInfoController = require(path.join(
  __dirname,
  "..",
  "..",
  "controller",
  "Recruiter",
  "recCompanyInfoController"
));

router.use(userAuthController.protect);
router.get("/getAllCompanyInfo",companyInfoController.getAllCompanyInfo);
router.post("/addCompanyInfo",companyInfoController.addCompanyInfo);
router.patch("/updateCompanyInfo",companyInfoController.updateCompanyInfo);
router.delete("/deleteCompanyInfo",companyInfoController.deleteCompanyInfo);
module.exports=router;