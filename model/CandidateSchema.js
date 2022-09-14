const mongoose = require("mongoose");
const path = require("path");
const candidateSchemaHelpers = require(path.join(__dirname, "..", "helpers", "candidateSchemaHelpers"));
const Schema = mongoose.Schema;
const CandidateSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "Please Provide First Name"],
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, "Please Provide Last Name"],
  },
  password: {
    type: String,
    required: [true, "Please Provide Password"],
    select: false,
  },
  passwordChangedAt: {
    type: Date,
    select: false,
  },
  isAllDocumentsVerified: Boolean,
  profilePhoto: String,
  role: {
    type: String,
    enum: ["recruiter", "candidate", "agent"],
    default: "candidate",
  },
  email: {
    emailId: {
      type: String,
      unique: [true, "Email Id Already Exists"],
      required: [true, "Please Provide Email ID"],
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  mobile: {
    mobileNumber: {
      type: String,
      unique: [true, "Mobile Number Already Exists"],
      required: [true, "Please Provide Mobile Number"],
    },
    isMobileVerified: {
      type: Boolean,
      default: false,
    },
  },
  verificationToken: {
    emailToken: String,
    emailTokenExpiry: Date,
    mobileToken: String,
    mobileTokenExpiry: Date,
    passwordToken: String,
    passwordTokenExpiry: Date,
  },
  personalInformation: candidateSchemaHelpers.personalInformation,
  educationalQualifications: candidateSchemaHelpers.educationalQualifications,
  workExperience: candidateSchemaHelpers.workExperience,
  documents: candidateSchemaHelpers.documents,
  agentId: {
    type: mongoose.Schema.ObjectId,
    ref: "Agent",
  },
  appliedJobs: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "JobPost",
    },
  ],
  selectedJobs: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "JobPost",
    },
  ],
});

const Candidate = mongoose.model("Candidate", CandidateSchema);
module.exports = Candidate;
