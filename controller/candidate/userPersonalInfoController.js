const path = require("path");
const moment = require("moment");
const catchAsync = require(path.join(__dirname, "..", "..", "utils", "catchAsync"));
const AppErr = require(path.join(__dirname, "..", "..", "utils", "AppErr"));

const checkArr = [
  "country",
  "state",
  "city",
  "middleName",
  "nationality",
  "dateOfBirth",
  "maritalStatus",
  "gender",
  "disability",
  "currentAddress",
  "permanentAddress",
  "children",
  "preferredJobs",
  "preferredLocations",
];

// UPDATE PERSONAL INFO FOR USER (BOTH TO ADD AND UPDATE DETAILS)
exports.updatePersonalInfo = catchAsync(async (req, res, next) => {
  const user = req.user;
  if (!user.role === "candidate") return next(new AppErr("Unauthorized, Please Login Using Candidate", 403));
  for (const [key, value] of Object.entries(req.body)) {
    if (!checkArr.includes(key)) return next(new AppErr(`Wrong Value Entered ${key}`, 400));
    user["personalInformation"][`${key}`] = value;
  }
  const doc = await user.save();
  res.status(200).json({
    status: "success",
    data: {
      message: "User Data Successfully Updated",
      doc,
    },
  });
});

// GET PERSONAL INFO OF USER
exports.getPersonalInfo = catchAsync(async (req, res, next) => {
  const user = req.user;
  if (!user) return next(new AppErr("Please Login To Continue", 401));
  if (!user?.personalInformation)
    return next(new AppErr("No Personal Information Found, Please Update PI Secton", 404));
  res.status(200).json({
    status: "success",
    data: {
      message: "Personal Information For User Data Sent",
      doc: {
        personalInformation: user.personalInformation,
      },
    },
  });
});
