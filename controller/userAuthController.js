const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const passwordChangedAt = require(path.join(__dirname, "..", "helpers", "passwordChangedAt"));
const generateOtp = require(path.join(__dirname, "..", "helpers", "generateOtp"));
const catchAsync = require(path.join(__dirname, "..", "utils", "catchAsync"));
const AppErr = require(path.join(__dirname, "..", "utils", "AppErr"));
const findUserType = require(path.join(__dirname, "..", "helpers", "findUserType"));
const encryptPassword = require(path.join(__dirname, "..", "helpers", "encryptPassword"));
const generateJwt = require(path.join(__dirname, "..", "helpers", "generateJwt"));
const upload = require(path.join(__dirname, "..", "helpers", "multerStorageImage"));

const capitalizeFirst = function (str) {
  return str.at(0).toUpperCase() + str.slice(1);
};

// SIGNUP
exports.signup = catchAsync(async (req, res, next) => {
  const { firstName, lastName, emailId, mobileNumber, password, role } = req.body;
  if (!firstName || !lastName || !emailId || !mobileNumber || !password || !role) {
    return next(new AppErr("Please Provide all the details to create user", 400));
  }
  const User = findUserType(role);
  const hashedPassword = await encryptPassword.hashPassword(password);
  const doc = await User.create({
    firstName,
    lastName,
    password: hashedPassword,
    role,
    email: { emailId },
    mobile: { mobileNumber },
  });
  generateJwt(doc, req, res);
});

// LOGIN
exports.login = catchAsync(async (req, res, next) => {
  const { emailId, password, role } = req.body;
  console.log(req.body);
  if (!emailId || !password || !role) {
    return next(new AppErr("Please Provide all the details to login user", 401));
  }
  const User = findUserType(role);
  let doc = await User.findOne({ "email.emailId": emailId }).select("+password");
  if (!doc) return next(new AppErr("Email Or Password is Incorrect", 401));

  if (!(await encryptPassword.unHashPassword(password, doc.password))) {
    return next(new AppErr("Email Or Password is Incorrect", 401));
  }
  //console.log(doc);
  generateJwt(doc, req, res);
});

//LOGOUT
exports.logout = catchAsync(async (req, res, next) => {
  res.cookie("jwt", "loggedOut", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      message: "User Successfully Logged Out",
    },
  });
});

// SEND OTP TO VERIFY (EMAIL+MOBILE)
// user already logged in
exports.sendOtp = catchAsync(async (req, res, next) => {
  const user = req.user;
  const { mode } = req.query;
  let message = "";
  if (!mode || !user) return next(new AppErr("Please Login user", 401));
  if (mode === "email") {
    message = `OTP Is Sent On Your Email Address, Please Verify. OTP expires in 10 minutes`;
  }
  if (mode === "mobile") {
    message = `OTP is Sent On Your Mobile Number, Please Verify. OTP expires in 10 minutes`;
  }
  await generateOtp(mode, user, message);
  res.status(200).json({
    status: "success",
    body: {
      message,
    },
  });
});

// VERIFY OTP  (EMAIL+MOBILE) ONLLY WHEN USER LOGGED IN
exports.verifyOtp = catchAsync(async (req, res, next) => {
  // mode can either be email or mobile
  const user = req.user;
  // mode is for email or mobile verification
  const { otp, mode } = req.body;
  const currDate = new Date(Date.now());
  // 1) if otp or mode is not available
  if (!otp || !mode) {
    return next(new AppErr("Please Provide All The Details"), 400);
  }
  // 2) check if time expired
  if (user.verificationToken[`${mode}TokenExpiry`] < currDate) {
    return next(new AppErr("Time Expired", 401));
  }
  // 3) check if otp entered is correct
  if (user["verificationToken"][`${mode}Token`] !== otp) return next(new AppErr("Please Enter Otp Correctly"));
  user[`${mode}`][`is${capitalizeFirst(mode)}Verified`] = true;
  user[`verificationToken`][`${mode}Token`] = undefined;
  user[`verificationToken`][`${mode}TokenExpiry`] = undefined;
  await user.save();
  res.status(200).json({
    status: "success",
    data: { message: "OTP Has Been Verified" },
  });
});

// CHECK IF USER IS LOGGED IN
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization && req?.headers?.authorization?.startsWith("Bearer")) {
    token = req?.headers?.authorization?.split(" ")[1];
  }
  if (req?.cookies?.jwt) {
    token = req?.cookies?.jwt;
  }
  // check if token is present
  if (!token) {
    return next(new AppErr("Please Login To Continue"), 401);
  }
  // validate token
  const reconstructedPayload = await jwt.verify(token, process.env.JWT_SECRET_KEY);
  const role = reconstructedPayload.payload.role;
  const docId = reconstructedPayload.payload.id;
  if (!role) return next(new AppErr("JWT MALFORMED!!!"), 400);
  const User = findUserType(role);
  const doc = await User.findOne({ _id: docId }).select("+passwordChangedAt");
  if (!doc) return next(new AppErr("User Belonging To This Token Is No Longer Found", 400));
  if (passwordChangedAt(reconstructedPayload.iat, doc)) {
    res.cookie("jwt", "loggedOut", {
      expire: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });
    return next(new AppErr("Application user recently changed password! Please log in again", 401));
  }
  req.user = doc;
  return next();
});

// RESET PASSWORD
exports.resetPassword = catchAsync(async (req, res, next) => {
  const user = req.user;
  const { password } = req.body;
  const hashedPassword = await encryptPassword.hashPassword(password);
  user.password = hashedPassword;
  user.passwordChangedAt = Date.now();
  await user.save();
  res.status(200).json({
    status: "success",
    data: {
      message: "Password Has Been Successfully Reset",
    },
  });
});

// FORGOT PASSWORD STAGES
// 1) verify email
exports.forgotPwdGenerateOtp = catchAsync(async (req, res, next) => {
  let token;
  if (req?.cookies?.jwt) {
    token = req?.cookies?.jwt;
  }
  if (token) {
    return next(new AppErr("User Already Logged In, Cannot Reset Password"), 401);
  }
  const { email, role } = req.query;
  if (!email || !role) {
    res.status(400).json({
      status: "fail",
      data: {
        message: "Please Provide All The Details",
      },
    });
  }
  const User = findUserType(role);
  const user = await User.findOne({ "email.emailId": email });
  if (!user) return next(new AppErr("Account Not Found"), 400);
  await generateOtp("password", user, "Please Verify OTP To Reset Password, OTP Expires in 10 Minutes");
  res.status(200).json({
    status: "success",
    data: {
      message: "An OTP has been sent,Please Verify OTP To Reset The Password",
    },
  });
});
// 2) verify otp
exports.forgotPwdVerifyOtp = catchAsync(async (req, res, next) => {
  const { role, otp, email } = req.body;
  if (!email || !role) {
    res.status(400).json({
      status: "fail",
      data: {
        message: "Please Provide All The Details",
      },
    });
  }
  const User = findUserType(role);
  const doc = await User.findOne({ "email.emailId": email });
  if (!doc) return next(new AppErr("Account Not Found"), 400);
  // check if token is present
  if (!doc.verificationToken.passwordToken && !doc.verificationToken.passwordTokenExpiry)
    return next(new AppErr("Token Not Issued, Route Is FORBIDDEN", 403));
  // check if time expired
  const currDate = new Date(Date.now());
  if (doc.verificationToken.passwordTokenExpiry < currDate) return next(new AppErr("OTP Expired", 400));
  // verify otp
  if (!(doc.verificationToken.passwordToken === otp)) return next(new AppErr("OTP Entered Is Incorrect", 400));
  // update token fields in document
  doc.verificationToken.passwordToken = undefined;
  doc.verificationToken.passwordTokenExpiry = undefined;
  await doc.save();
  generateJwt(doc, req, res);
});

// CHECK IF PROFILE PICTURE ALREADY EXITSTS

exports.checkExisistingProfilePicture = catchAsync(async (req, res, next) => {
  const user = req.user;
  // guard clause
  if (!user.profilePhoto) return next();
  // 1) create file path and unlink from filesystem
  const filePath = path.join(__dirname, "..", "public", "profile-picture", user.profilePhoto);
  console.log(filePath);
  fs.unlinkSync(filePath);
  // 2) set profilePhoto in DB to undefined
  user.profilePhoto = undefined;
  await user.save();
  return next();
});

// UPLOAD PROFILE PICTURE TO FS

exports.uploadProfilePictureFS = upload.single("profile-picture");

// UPLOAD PROFILE PICTURE TO DB
exports.uploadProfilePictureDB = catchAsync(async (req, res, next) => {
  const user = req.user;
  // 1) check if db has profile picture present, if present delete it

  // 2) set profile picture
  user.profilePhoto = req.file.filename;
  await user.save();
  res.status(200).json({
    data: {
      doc: {
        profilePictureLink: user.profilePhoto,
      },
      message: "Profile Picture Updated Successfully",
    },
  });
});

// FETCH PROFILE PICTURE
exports.getProfilePicture = (req, res, next) => {
  const user = req.user;
  if (!user.profilePhoto) return next(new AppErr("User Has No Profile Picture", 400));
  res.status(200).json({
    data: {
      doc: {
        profilePictureLink: `http://localhost:4004/profile-picture/${user.profilePhoto}`,
      },
    },
  });
};
