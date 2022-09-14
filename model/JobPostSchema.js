const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;
const JobPostSchema = new Schema({
  jobDesignation: {
    type: String,
    required: [true, "Please Provide Job Designation"],
  },
  requiredExperience: {
    type: String,
    required: [true, "Please Provide Required Job Experience"],
  },
  jobVacancy: {
    type: Number,
    required: [ture, "Please Provide Job Vacancy"],
  },
  postedOn: {
    type: Date,
    default: moment(Date.now()).format("YYYY-MM-DD"),
  },
  responsibilities: String,
  keySkills: [{ type: String }],
  jobBenefits: [{ type: String }],
  salaryRange: {
    fromSalary: String,
    toSalary: String,
  },
  jobLocation: {
    country: {
      type: String,
      required: [true, "Please Provide Country"],
    },
    state: { type: String, required: [true, "Please Provide State"] },
    city: { type: String, required: [true, "Please Provide City"] },
  },
  appliedCandidates: [{ type: mongoose.Schema.ObjectId, ref: "Candidate" }],
  selectedCandidates: [{ type: mongoose.Schema.ObjectId, ref: "Candidate" }],
  createdById: {
    type: mongoose.Schema.ObjectId,
    ref: "JobPost",
    required: [true, "Please Provide Owner Id for this Job"],
  },
});

const JobPost = mongoose.model("JobPost", JobPostSchema);
module.exports = JobPost;
