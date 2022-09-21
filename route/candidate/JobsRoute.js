const path = require("path");
const express = require("express");
const router = express.Router();
const userAuthController = require(path.join(__dirname, "..", "..", "controller", "userAuthController"));
const JobsController = require(path.join(__dirname,"..", "..", "controller","candidate","JobsController"))

router.use(userAuthController.protect);
router.get('/availableJobs',JobsController.availableJobs);
router.post('/applyJob',JobsController.applyJob)
router.post('/saveJob',JobsController.saveJob)
router.get('/getSavedJob',JobsController.getSavedJob)
router.get('/appliedJobs',JobsController.appliedJobs)
router.get('/searchJob',JobsController.searchJob)
router.get('/filterJob',JobsController.filterJob)
module.exports = router;