const path = require("path");
const catchAsync = require(path.join(__dirname, "..", "..", "utils", "catchAsync"));
const AppErr = require(path.join(__dirname, "..", "..", "utils", "AppErr"));
const checkArr=[
    "jobDesignation",
    "salaryRange",
    "requiredExperience",
    "jobLocation",
    "jobVaccancy",
    "jobPostedOn",
    "responsibility",
    "keySkills",
    "jobBenefits",
    "appliedCandidates",
    "selectedCandidates",
];

//GET ALL JOBS POSTED
exports.getAllJobPost=catchAsync(async(req,res,next)=>{
    const user=req.user;
    if(!user==="Recruiter") return next(new AppErr("Unauthorized.Please Login using Recruiter",403));

    res.status(200).json({
        message:"JOBS POSTED",
        user,
    })
});

//ADD JOBS POSTED
exports.addJobPost=catchAsync(async(req,res,next)=>{
    const user=req.user;
    const job={};
    if(!user.role==="Recruiter") return next(new AppErr("Unauthorized,Please Login Using Recruiter",403));
    for(const [key,value] of Object.entries(req.body)){
        if(!checkArr.includes(key)) return next(new AppErr(`Wrong value entered ${key}`));
        job[key]=value;
    }
    user.jobsPosted=job;
    await user.save;
    res.status(200).json({
        message:"Job Successfully Added",
        job:job,
    })
});

//UPDATE JOBS POSTED
exports.UpdateJobPost=catchAsync(async(req,res,next)=>{
    const user=req.user;
    const {jobId}=req.body;
    if(!jobId) return next(new AppErr("Please provide Job ID",400));
    const job=user.jobsPosted.id(jobId);
    for(const [key,value] of Object.entries(req.body)){
        if(key==="jobId") continue;
        if(!checkArr.includes(key)) return next(new AppErr(`Wrong value entered ${key}`));
        job[key]=value;
    }
    await user.save();
    res.status(200).json({
        message:"Job Successfully Updated",
        job:job,
    })
});

//DELETE JOBS POSTED
exports.deleteJobPost=catchAsync(async(req,res,next)=>{
    const user=req.user;
    const {jobId}=req.body;
    if(!jobId) return next(new AppErr("Please provide Job ID",400));
    const job=user.jobsPosted.id(jobId);
    job.remove();
    await user.save();
    res.status(200).json({
        message:"Job Successfully Deleted",
        job:job,
    })
});