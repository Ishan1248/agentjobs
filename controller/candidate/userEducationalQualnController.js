const path = require("path");
const moment = require("moment");
const catchAsync = require(path.join(__dirname, "..", "..", "utils", "catchAsync"));
const AppErr = require(path.join(__dirname, "..", "..", "utils", "AppErr"));

const checkArr = [
  "degreeName",
  "specialization",
  "universityName",
  "collegeName",
  "courseType",
  "startDate",
  "endDate",
];

// GET ALL EDUCATIONAL QUALIFICATION
exports.getAllEducationalQn = catchAsync(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    data: {
      message: "EDUCATIONAL QUALIFICATIONS",
      doc: user.educationalQualifications,
    },
  });
});

// ADD EDUCATIONAL QUALIFICATION
exports.addEducationalQn = catchAsync(async (req, res, next) => {
  const user = req.user;
  const edQn = {};
  if (!user.role === "candidate") return next(new AppErr("Unauthorized, Please Login Using Candidate", 403));
  for (const [key, value] of Object.entries(req.body)) {
    if (!checkArr.includes(key)) return next(new AppErr(`Wrong Value Entered ${key}`, 400));
    edQn[key] = value;
  }
  user.educationalQualifications.push(edQn);
  await user.save();
  res.status(200).json({
    data: {
      message: "EducationAL Qualification Successfully Added",
      doc: edQn,
    },
  });
});

// UPDATE EDUCATIONAL QUALIFICATION
exports.updateEducationalQn = catchAsync(async (req, res, next) => {
  const user = req.user;
  const { edqDocId } = req.body;
  if (!edqDocId) return next(new AppErr("Please Provide Sub Document ID", 400));
  const edqSubDoc = user.educationalQualifications.id(edqDocId);
  // loop through req.body
  for (const [key, value] of Object.entries(req.body)) {
    // if docid then dont go through further steps
    if (key === "edqDocId") continue;
    // check if field available in checkArr, if not return error
    if (!checkArr.includes(key)) return next(new AppErr(`Wrong Value Entered ${key}`, 400));
    // update subdocument
    edqSubDoc[key] = value;
  }
  // save parentDocument
  await user.save();
  res.status(200).json({
    data: {
      edqSubDoc,
    },
  });
});

// DELETE EDUCATIONAL QUALIFICATION
exports.deleteEducationalQn = catchAsync(async (req, res, next) => {
  const { edqDocId } = req.body;
  const user = req.user;
  if (!edqDocId) return next(new AppErr("Please Provide Sub Document ID", 400));
  user.educationalQualifications.id(edqDocId).remove();
  await user.save();
  res.status(200).json({
    data: {
      message: "Document Successfully Deleted...",
    },
  });
});
