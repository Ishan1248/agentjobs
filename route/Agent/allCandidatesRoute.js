const path = require("path");
const express = require("express");
const router = express.Router();
const userAuthController = require(path.join(__dirname, "..", "..", "controller", "userAuthController"));
const allcandidatescontroller = require(path.join(
    __dirname,
    "..",
    "..",
    "controller",
    "Agent",
    "allCandidatesController"
  ));
  router.use(userAuthController.protect);
  router.post("/addCandidate",allcandidatescontroller.addCandidate);
  router.get("/getregisteredcandidates",allcandidatescontroller.getRegisteredCandidates);

  module.exports = router;
