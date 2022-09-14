const jobPostSchema = require("../../model/jobPostModel");
const ErrorHandler = require("../../utils/errorHandler");
const catchAsyncErrors = require("../../common_middleware/catchAsyncError");
const ApiFeatures = require("../../utils/apiFeatures");

// job post
exports.createJobPost = catchAsyncErrors(async (req, res, next) => {
  const {
    jobDesignation,
    salaryRange,
    requiredExperience,
    jobLocation,
    jobType,
    jobVacancies,
    postedJobDate,
    rolesAndResposibility,
    requiredSkillSet,
    keySkills,
    Benefits,
  } = req.body;

  const postJob = await jobPostSchema.create({
    jobDesignation,
    salaryRange,
    requiredExperience,
    jobLocation,
    jobType,
    jobVacancies,
    postedJobDate,
    rolesAndResposibility,
    requiredSkillSet,
    keySkills,
    Benefits,
  });
  res.status(200).json({
      success: true,
      postJob,
    });
});

// get all job post
exports.getAllJobpost = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 5;
  const jobCount = await jobPostSchema.countDocuments();
  const apiFeature = new ApiFeatures(jobPostSchema.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const postedJobs = await apiFeature.query;
  res.status(200).json({
    success: true,
    postedJobs,
    // jobCount,
  });
});

// get single jobPost
exports.getSingleJobPost = catchAsyncErrors(async (req, res, next) => {
  const singleJob = await jobPostSchema.findById(req.params.id);
  if (!singleJob) {
    return next(new ErrorHandler("jobPost not found"), 404);
  }
  res.status(200).json({
    success: true,
    singleJob,
  });
});

// update product
exports.updateJobPost = catchAsyncErrors(async (req, res) => {
  let updateJob = jobPostSchema.findById(req.param.id);
  if (!updateJob) {
    return next(new ErrorHandler("Jobpost not found"), 404);
  }
  updateJob = await jobPostSchema.findByIdAndUpdate(req.params.id, req.body, {
    renValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    updateJob,
  });
});

// Delete product
exports.deleteJobPost = catchAsyncErrors(async (req, res, next) => {
  const delJobPost = await jobPostSchema.findById(req.params.id);
  if (!delJobPost) {
    return next(new ErrorHandler("Job Post not found"), 404);
  }
  await delJobPost.remove();

  res.status(200).json({
    success: true,
    message: "Job post deleted",
  });
});