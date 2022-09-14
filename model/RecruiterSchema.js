const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RecruiterSchema = new Schema({
  firstName: { type: String, required: [true, "Please Provide First Name"] },
  lastName: { type: String, required: [true, "Please Provide Last Name"] },
  designation: String,
  password: {
    type: String,
    required: [true, "Please Providde Password"],
    select: false,
  },
  passwordChangedAt: {
    type: Date,
    select: false,
  },
  isAllDocumentsVerified: Boolean,
  profilePhoto: String,
  accountFreezeDate: Date,
  role: {
    type: String,
    enum: ["recruiter", "candidate", "agent"],
    default: "recruiter",
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
  companyInformation: {
    country: String,
    state: String,
    city: String,
    companyName: String,
    companyType: String,
    companyAddress: String,
  },
  documents: {
    taxIdNumber: {
      documentName: String,
      documentNumber: String,
      documentPath: String,
      isDocumentVerified: Boolean,
      documentExpiryDate: Date,
    },
  },
  createdJobs: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "JobPost",
    },
  ],
});

const Recruiter = mongoose.model("Recruiter", RecruiterSchema);
module.exports = Recruiter;
