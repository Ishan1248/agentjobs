const path = require("path");
const express = require("express");
const router = express.Router();
const userAuthController = require(path.join(__dirname, "..", "..", "controller", "userAuthController"));
const jobpostcontroller = require(path.join(
    __dirname,
    "..",
    "..",
    "controller",
    "Agent",
    "jobPostController"
  ));
  const {createJobPost,getAllJobpost}=require('../../controller/Agent/jobPostController')
  router.use(userAuthController.protect);
router.route("/createJob").post(createJobPost);
router.route("/getAllJobs").get(getAllJobpost);
  module.exports = router;
