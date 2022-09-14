const path = require("path");
const express = require("express");
const router = express.Router();
const userAuthController = require(path.join(__dirname, "..", "..", "controller", "userAuthController"));
const userWorkExpController = require(path.join(
  __dirname,
  "..",
  "..",
  "controller",
  "candidate",
  "userWorkExperienceController"
));
router.use(userAuthController.protect);
router.get("/getAllWorkExperience", userWorkExpController.getAllWorkExperience);
router.post("/addWorkExp", userWorkExpController.addWorkExp);
router.patch("/updateWorkExperience", userWorkExpController.updateWorkExperience);
router.delete("/deleteWorkExperience", userWorkExpController.deleteWorkExperience);
module.exports = router;
