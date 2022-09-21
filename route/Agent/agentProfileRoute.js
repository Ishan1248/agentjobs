const path = require("path");
const express = require("express");
const router = express.Router();
const userAuthController = require(path.join(__dirname, "..", "..", "controller", "userAuthController"));
const agentprofilecontroller = require(path.join(
    __dirname,
    "..",
    "..",
    "controller",
    "Agent",
    "agentProfileController"
  ));
  router.use(userAuthController.protect);
  //GET AGENT PROFILE
  router.get("/getAgentProfile",agentprofilecontroller.getAgentProfile);
  //UPDATE AGENT PROFILE
  router.patch("/updateAgentProfile",agentprofilecontroller.updateAgentProfile);
  module.exports = router;