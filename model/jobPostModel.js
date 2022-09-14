const mongoose = require("mongoose");

const jobPostSchema = new mongoose.Schema({
  jobDesignation: {
    type: String,
    required: [true, "please enter the job Designation"],
  },
  salaryRange: {
    fromSalary: {
      type: String,
      required: [true, "please enter the salary staring amount"],
    },
    toSalary: {
      type: String,
      required: [true, "please enter the salary staring amount"],
    },
  },
  requiredExperience: {
    type: String,
    required: [true, "please enter the expreience"],
  },
  jobLocation:{
    country: {
      type: String,
      required: [false, "please enter the country name"],
    },
    state: {
      type: String,
      required: [false, "please enter the state"],
    },
    city: {
      type: String,
      required: [false, "please enter the city"],
    },
  },
  jobType: {
    type: String,
    required: [false, "please enter the job Type"],
  },
  jobVacancies: {
    type: String,
    required: [false, "please enter the job vaccencies"],
  },
  postedJobDate: {
    type: Date,
    default: Date.now,
    timestamp: true,
  },
  rolesAndResposibility: {
    type: String,
  },
  requiredSkillSet: {
    type: String,
  },
  keySkills: {
    type: String,
  },
  jobBenefits: {
    type: String,
  },
});

module.exports = mongoose.model("jobPostSchema", jobPostSchema);