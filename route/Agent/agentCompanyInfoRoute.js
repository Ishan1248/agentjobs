const path = require("path");
const express = require("express");
const router = express.Router();
const userAuthController = require(path.join(__dirname, "..", "..", "controller", "userAuthController"));
const agentCompanyInfoController = require(path.join(
  __dirname,
  "..",
  "..",
  "controller",
  "Agent",
  "companyInfoController"
));

router.use(userAuthController.protect);
router.get("/getAllCompanyInfo", agentCompanyInfoController.getAllCompanyInfo);
router.post("/addCompanyInfo", agentCompanyInfoController.addCompanyInfo);
router.patch("/updateCompanyInfo", agentCompanyInfoController.updateCompanyInfo);
router.delete("/deleteCompanyInfo", agentCompanyInfoController.deleteCompanyInfo);
module.exports = router;