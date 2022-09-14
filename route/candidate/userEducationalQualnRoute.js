const path = require("path");
const express = require("express");
const router = express.Router();
const userAuthController = require(path.join(__dirname, "..", "..", "controller", "userAuthController"));
const userEducationalQualnController = require(path.join(
  __dirname,
  "..",
  "..",
  "controller",
  "candidate",
  "userEducationalQualnController"
));

router.use(userAuthController.protect);
router.get("/getAllEducationalQn", userEducationalQualnController.getAllEducationalQn);
router.post("/addEducationalQn", userEducationalQualnController.addEducationalQn);
router.patch("/updateEducationalQn", userEducationalQualnController.updateEducationalQn);
router.delete("/deleteEducationalQn", userEducationalQualnController.deleteEducationalQn);
module.exports = router;
