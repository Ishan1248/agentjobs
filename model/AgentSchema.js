const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AgentSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "Please Provide First Name"],
  },
  lastName: {
    type: String,
    required: [true, "Please Provide Last Name"],
  },
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
    default: "agent",
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
  companyInformation: 
    {
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
  registeredCandidates: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Candidate",
    },
  ],
  referredCandidates: [
    // explicit check required as we will be needing both ID's
    {
      candidateId: {
        type: mongoose.Schema.ObjectId,
        ref: "Candidate",
      },
      recruiterId: {
        type: mongoose.Schema.ObjectId,
        ref: "Recruiter",
      },
    },
  ],
});

const Agent = mongoose.model("Agent", AgentSchema);
module.exports = Agent;
