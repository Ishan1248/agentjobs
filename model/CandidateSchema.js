const mongoose = require("mongoose");
const path = require("path");
const moment = require("moment");
const candidateSchemaHelpers = require(path.join(__dirname, "..", "helpers", "candidate", "candidateSchemaHelpers"));
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
  profilePictureLink: String,
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
      job: {
        type: mongoose.Schema.ObjectId,
        ref: "JobPost",
      },
      candidateJobStatus: {
        type: String,
        default: "applied",
        enum: ["applied", "rejected", "shortlisted", "selected"],
      },
      candidateJobDate: {
        type: Date,
        default: moment(new Date(Date.now())).format("YYYY-MM-DD"),
      },
    },
  ],
  bookMarkedJobs: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "JobPost",
    },
  ],
});
CandidateSchema.methods.changePasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < changedTimeStamp;
  }
  return false; // false means password not change & no-error
};

const Candidate = mongoose.model("Candidate", CandidateSchema);
module.exports = Candidate;