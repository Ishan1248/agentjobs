const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;
const JobPostSchema = new Schema({
   jobDesignation: {
    type: String,
   // required: [true, "Please Provide Job Designation"],
  }, 
  companyLogo: String,
  companyName: String,
  jobType:String,
  jobCode: String,
  // requiredSkillSet: String,
  requiredExperience: {
    fromExperience: Number,
    toExperience: Number,
    // required: [true, "Please Provide Required Job Experience"],
  },
  jobVacancy: {
    type: Number,
    // required: [ture, "Please Provide Job Vacancy"],
  },
  postedOn: {
    type: Date,
    default: Date.now,
  },
  
  responsibility: String,
  keySkills: [{ type: String }],
  jobBenefits: [{ type: String }],
  salaryRange: {
    fromSalary: Number,
    toSalary: Number,
  },
  jobLocation: {
    country: {
      type: String,
      required: [true, "Please Provide Country"],
    },
    state: { type: String, required: [true, "Please Provide State"] },
    city: { type: String, required: [true, "Please Provide City"] },
  },
  // appliedCandidates: [{ type: mongoose.Schema.ObjectId, ref: "Candidate" }],
  selectedCandidates: [{ type: mongoose.Schema.ObjectId, ref: "Candidate" }],
  createdById: {
    type: mongoose.Schema.ObjectId,
    ref: "JobPost",
    required: [true, "Please Provide Owner Id for this Job"],
  },
},
);

const JobPost = mongoose.model("JobPost", JobPostSchema);
module.exports = JobPost;