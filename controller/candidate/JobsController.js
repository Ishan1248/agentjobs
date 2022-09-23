const path = require("path");
const Candidate = require(path.join(__dirname, "..", "..", "model", "CandidateSchema"));
const catchAsync = require(path.join(__dirname, "..", "..", "utils", "catchAsync"));
const AppErr = require(path.join(__dirname, "..", "..", "utils", "AppErr"));
const JobPost = require(path.join(__dirname, "..", "..", "model", "JobPostSchema"));
const ApiFeatures = require(path.join(__dirname, "..", "..", "utils", "apiFeature"));

// GET ALL JOB POSTED
exports.availableJobs = catchAsync(async (req, res, next) => {
  const user = req.user;
  if (user.role === "candidate") {
    const resultPerPage = 1000;
    const apiFeature = new ApiFeatures(JobPost.find(), req.query).search().filter().pagination(resultPerPage);
    const availableJobs = await apiFeature.query;
    const suggestedJobs = availableJobs.filter((item) => {
      return !user.appliedJobs.includes(item._id);
    });
    res.status(201).json({
      success: true,
      result: suggestedJobs.length,
      suggestedJobs,
    });
  } else {
    return next(new AppErr("Unauthorized, Please Login Using Candidate", 403));
  }
});

// CANDIDATE APPLIED JOB
exports.appliedJobs = catchAsync(async (req, res, next) => {
  const user = req.user;
  if (user.role === "candidate") {
    const appliedJobs = await Candidate.find(user).populate("appliedJobs");
    res.status(201).json({
      success: true,
      appliedJobs,
    });
  } else {
    return next(new AppErr("Unauthorized, Please Login Using Candidate", 403));
  }
});

// CANDIDATE APPLY JOB
exports.applyJob = catchAsync(async (req, res, next) => {
  const user = req.user;
  if (user.role === "candidate") {
    const jobId = req.body;
    if (user.appliedJobs.includes(jobId._id)) {
      return next(new AppErr("You Have already Applied to this job", 403));
    } else {
      user.appliedJobs.push(jobId);
      await user.save();
      const [data] = await JobPost.find(req.body);
      data.appliedCandidates.push(user._id);
      await data.save();
    }
    res.status(200).json({
      success: true,
      message: "Applied Successfully",
    });
  } else {
    return next(new AppErr("Unauthorized, Please Login Using Candidate", 403));
  }
});

// CANDIDATE SAVE JOB
exports.saveJob = catchAsync(async (req, res, next) => {
  const user = req.user;
  if (user.role === "candidate") {
    const jobId = req.body;
    if (user.bookMarkedJobs.includes(jobId._id)) {
      return next(new AppErr("You Have already save this job", 403));
    } else {
      user.bookMarkedJobs.push(jobId);
      await user.save();
    }
    res.status(200).json({
      success: true,
      message: "Saved Job Successfully",
    });
  } else {
    return next(new AppErr("Unauthorized, Please Login Using Candidate", 403));
  }
});

// CANDIDATE GET SAVED JOB
exports.getSavedJob = catchAsync(async (req, res, next) => {
  const user = req.user;
  if (user.role === "candidate") {
    // console.log(user.bookMarkedJobs)
    const getsavejob = await Candidate.find(user).populate("bookMarkedJobs");

    res.status(200).json({
      success: true,
      getsavejob,
    });
  } else {
    return next(new AppErr("Unauthorized, Please Login Using Candidate", 403));
  }
});

exports.searchJob = catchAsync(async (req, res, next) => {
  const user = req.user;
  if (user.role === "candidate") {
    const apiFeature = new ApiFeatures(JobPost.find(), req.query)
      .searchJobDesignation()
      .searchJobType()
      .searchKeySkill()
      .searchJobLocation();
    const searchJobs = await apiFeature.query;
    // console.log(searchJobs)

    res.status(201).json({
      success: true,
      result: searchJobs.length,
      searchJobs,
    });
  } else {
    return next(new AppErr("Unauthorized, Please Login Using Candidate", 403));
  }
});

exports.filterJob = catchAsync(async (req, res, next) => {
  const user = req.user;
  if (user.role === "candidate") {
    const apiFeature = new ApiFeatures(JobPost.find(), req.query).filterSalary().filterExperience();
    const filterJobs = await apiFeature.query;
    // console.log(searchJobs)

    res.status(201).json({
      success: true,
      result: filterJobs.length,
      filterJobs,
    });
  } else {
    return next(new AppErr("Unauthorized, Please Login Using Candidate", 403));
  }
});