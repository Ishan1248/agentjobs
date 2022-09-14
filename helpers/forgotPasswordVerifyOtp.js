const capitalizeFirst = function (str) {
  return str.at(0).toUpperCase() + str.slice(1);
};

const forgotPasswordVerifyOtp = async function (otp, mode, User) {
  let statusObj = {};
  let doc;
  if (mode === "password") {
    doc = await User.findOne({
      "verificationToken.passwordToken": otp,
    });
  }
  // when otp is wrongly entered
  if (!doc) {
    statusObj.message = "Please Enter Otp Correctly";
    statusObj.status = "fail";
    return statusObj;
  }
  // when time to enter otp has expired
  const currDate = new Date(Date.now());
  if (doc.verificationToken[`${mode}TokenExpiry`] < currDate) {
    statusObj.message = "Time Expired";
    statusObj.status = "fail";
    return statusObj;
  }
  // update field for email or mobile verified
  if (mode === "email" || mode === "mobile") doc[`${mode}`][`is${capitalizeFirst(mode)}Verified`] = true;
  doc[`verificationToken`][`${mode}Token`] = undefined;
  doc[`verificationToken`][`${mode}TokenExpiry`] = undefined;
  await doc.save();
  statusObj.status = "success";
  statusObj.doc = doc;
  return statusObj;
};
module.exports = forgotPasswordVerifyOtp;
