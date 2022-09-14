const path = require("path");
const moment = require("moment");
const catchAsync = require(path.join(__dirname, "..", "..", "utils", "catchAsync"));
const AppErr = require(path.join(__dirname, "..", "..", "utils", "AppErr"));
const checkArr = ["designation", "companyName", "workLocation", "responsibilities", "startDate", "endDate"];

// ADD USER WORK EXPERIENCES
exports.addWorkExp = catchAsync(async (req, res, next) => {
  const user = req.user;
  let workExp = {};
  if (!user.role === "candidate") return next(new AppErr("Unauthorized, Please Login Using Candidate", 403));
  for (const [key, value] of Object.entries(req.body)) {
    if (!checkArr.includes(key)) return next(new AppErr(`Wrong Value Entered ${key}`, 400));
    if (key === "startDate" || key === "endDate") {
      const date = moment(new Date(value)).format("YYYY-MM-DD");
      workExp[key] = date;
      continue;
    }
    workExp[key] = value;
  }
  user.workExperience.push(workExp);
  await user.save();
  res.status(200).json({
    status: "success",
    data: {
      message: "User Data Successfully Updated",
      user,
    },
  });
});

// UPDATE USER WORK EXP
exports.updateWorkExperience = catchAsync(async (req, res, next) => {
  const user = req.user;
  const { workExpDocId } = req.body;
  if (!workExpDocId) return next(new AppErr("Please provide Document Id", 403));
  const workExpDoc = user.workExperience.id(workExpDocId);
  for (const [key, value] of Object.entries(req.body)) {
    if (key === "workExpDocId") continue;
    if (!checkArr.includes(key)) return next(new AppErr(`Wrong Value Entered ${key}`, 400));
    workExpDoc[key] = value;
  }
  await user.save();
  res.status(200).json({
    status: "success",
    data: {
      workExpDoc,
    },
  });
});

// GET USER WORK EXPERIENCE
exports.getAllWorkExperience = catchAsync(async (req, res, next) => {
  const user = req.user;
  if (!user) return next(new AppErr("Please Login To Continue", 401));
  if (!user?.workExperience) return next(new AppErr("No Work Experience Found, Please Update PI Secton", 404));
  res.status(200).json({
    status: "success",
    data: {
      message: " Work Experience For User Data Sent",
      doc: {
        workExperience: user.workExperience,
      },
    },
  });
});

// DELETE WORK EXPERIENCE DOC
exports.deleteWorkExperience = catchAsync(async (req, res, next) => {
  const { workExpId } = req.body;
  const user = req.user;
  if (!workExpId) {
    return next(new AppErr("please provide the doc ID", 404));
  }
  user.workExperience.id(workExpId).remove();
  await user.save();
  res.status(200).json({
    data: {
      message: "Document Successfully deleted...",
    },
  });
});
