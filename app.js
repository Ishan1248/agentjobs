// THIRD PARTY MODULES
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
 //const multer = require("multer");
// CORE MODULES
const express = require("express");

// SELF MODULES
const userAuthRouter = require(path.join(__dirname, "route", "userAuthRoute"));
const userPersonalInfoRouter = require(path.join(__dirname, "route", "candidate", "userPersonalInfoRoute"));
const userEducationalQualnRouter = require(path.join(__dirname, "route", "candidate", "userEducationalQualnRoute"));
const userWorkExperienceRouter = require(path.join(__dirname, "route", "candidate", "userWorkExperienceRoute"));
const candidateVideoRouter=require(path.join(__dirname,"route","candidate","userPersonalInfoRoute"));
//Agent Routes
const agentCompanyInfoRouter = require(path.join(__dirname, "route", "Agent", "agentCompanyInfoRoute"));
const agentDocsUploadRouter = require(path.join(__dirname, "route", "Agent", "agentDocUploadRoute"));
const agentJobsRouter=require(path.join(__dirname,"route","Agent","agentJobsRoute"));
const allCandidatesRouter=require(path.join(__dirname,"route","Agent","allCandidatesRoute"));
const agentProfileRouter=require(path.join(__dirname,"route","Agent","agentProfileRoute"));

//Recruiter Routes
const recCompanyInfoRouter=require(path.join(__dirname,"route","Recruiter","recCompanyInfoRoute"));
const recDocsUploadRouter=require(path.join(__dirname,"route","Recruiter","recDocsUploadRoute"));
//JobPost Routes
const jobPostRouter=require(path.join(__dirname,"route","JobPost","jobPostRoute"));
const globalErrorHandler = require(path.join(__dirname, "utils", "globalErrorHandler"));

const app = express();
app.use(cors());
app.options("*", cors());
app.use(express.static(path.join(__dirname ,"public")));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(globalErrorHandler);
app.use("/eman-api/v1/userAuth/", userAuthRouter);
app.use("/eman-api/v1/candidatePI/", userPersonalInfoRouter);
app.use("/eman-api/v1/candidateEQ/", userEducationalQualnRouter);
app.use("/eman-api/v1/candidateWX/", userWorkExperienceRouter);

//Video upload
app.use("/eman-api/v1/candidateVU/", candidateVideoRouter);

//Agent Company Info routes
app.use("/eman-api/v1/agentCI/", agentCompanyInfoRouter);
//Agent Docs Upload routes
app.use("/eman-api/v1/agentDocsUpload/", agentDocsUploadRouter);
//Agent Jobs routes
app.use("/eman-api/v1/agentJobs/",agentJobsRouter);
//All candidates routes for agent
app.use("/eman-api/v1/allCandidates/",allCandidatesRouter);
//AGENT PROFILE ROUTES
app.use("/eman-api/v1/agentProfile/",agentProfileRouter);


//RECRUITER ROUTES
app.use("/eman-api/v1/recCI/",recCompanyInfoRouter);
app.use("/eman-api/v1/recDocsUpload/",recDocsUploadRouter);
//Jobpost Routes
app.use("/eman-api/v1/jobPost/",jobPostRouter);
module.exports = app;
