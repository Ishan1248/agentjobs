const path = require("path");
const express = require("express");
const router = express.Router();
const userAuthController = require(path.join(__dirname, "..", "..", "controller", "userAuthController"));
const jobPostController = require(path.join(
    __dirname,
    "..",
    "..",
    "controller",
    "recruiter",
    "jobPostController"
  ));

router.use(userAuthController.protect);

router.post('/addJobPost',jobPostController.addJobPost);
router.get('/getJobPostedToRecruiter',jobPostController.getJobPostedToRecruiter);

module.exports = router;