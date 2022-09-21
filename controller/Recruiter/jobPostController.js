const path = require("path");
const catchAsync = require(path.join(__dirname, "..", "..", "utils", "catchAsync"));
const AppErr = require(path.join(__dirname, "..", "..", "utils", "AppErr"));
const JobPost = require(path.join(__dirname, "..", "..", "model", "JobPostSchema"));
const Recruiter = require(path.join(__dirname, "..", "..", "model", "RecruiterSchema"));

// ADD JOB POST
exports.addJobPost = catchAsync(async (req, res, next) => {
  const user = req.user;
  const {
    jobDesignation,
    companyLogo,
    companyName,
    jobType,
    requiredExperience,
    jobVacancy,
    postedOn,
    responsibility,
    keySkills,
    jobBenefits,
    salaryRange,
    jobLocation,
  } = req.body;

  if (user || user.role === "recruiter") {
    const jobCode = Math.floor(Math.random() * 1000000 + 1);
    const createdById = user._id;
    const createJob = await JobPost.create({
      jobDesignation,
      companyLogo,
      companyName,
      jobType,
      jobCode,
      requiredExperience,
      jobVacancy,
      postedOn,
      responsibility,
      keySkills,
      jobBenefits,
      salaryRange,
      jobLocation,
      createdById,
    });

    user.createdJobs.push(createJob._id);
    await user.save();
    res.status(200).json({
      status: "success",
      data: {
        message: "Job post create Successfully ",
        createJob,
        // user,
      },
    });
  } else {
    return next(new AppErr("Unauthorized, Please Login as recruiter", 403));
  }
});

// GET JOB POSTED BY RECRUITER
exports.getJobPostedToRecruiter = catchAsync(async (req, res, next) => {
  const user = req.user;
  if(user.role==="recruiter"){
    const data = await Recruiter.findOne(user).populate("createdJobs");
    res.status(201).json({
      success: true,
      data
    });
  }else{
    return next(new AppErr("Unauthorized, Please Login as recruiter", 403));
  } 
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
