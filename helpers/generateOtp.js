const path = require("path");
const Email = require(path.join(__dirname, "..", "utils", "Email"));
// this function only sends otp to mailtrap for email and password otp verification, but can be configured for mobile as well
const generateOtp = async function (mode, user, message) {
  const otp = Math.floor(Math.random() * 1000000);
  const date = Date.now() + 10 * 60 * 1000;
  user[`verificationToken`][`${mode}Token`] = otp;
  user[`verificationToken`][`${mode}TokenExpiry`] = date;
  await user.save();
  // SENDING OTP TO USER PART
  if (mode === "email") {
    await new Email(user, otp).send(message);
  }
  if (mode === "mobile") {
  }
  if (mode === "password") {
    await new Email(user, otp).send(message);
  }
};

module.exports = generateOtp;
