const express = require("express");
const path = require("path");
const userAuthController = require(path.join(__dirname, "..", "controller", "userAuthController"));

const router = express.Router();
// TODO: Safe Authentication
router.post("/signup", userAuthController.signup);
router.post("/login", userAuthController.login);
router.get("/logout", userAuthController.logout);
router.get("/forgotPwdGenerateOtp", userAuthController.forgotPwdGenerateOtp);
router.post("/forgotPwdVerifyOtp", userAuthController.forgotPwdVerifyOtp);

router.use(userAuthController.protect);

router.get("/sendOtp", userAuthController.sendOtp);
router.post("/verifyOtp", userAuthController.verifyOtp);
router.patch("/resetPassword", userAuthController.resetPassword);
router.post(
  "/uploadProfilePicture",
  userAuthController.checkExisistingProfilePicture,
  userAuthController.uploadProfilePictureFS,
  userAuthController.uploadProfilePictureDB
);
router.get("/getProfilePicture", userAuthController.getProfilePicture);

// TESTING ROUTE
router.get("/test-route", (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: {
      message: "user is able to login.....",
    },
  });
});
module.exports = router;
