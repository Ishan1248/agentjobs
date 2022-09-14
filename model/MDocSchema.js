const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MDocSchema = new Schema({
  documents: [
    {
      documentName: {
        type: String,
        required: [true, "Please Provide Document Name"],
      },
      documentNumber: {
        type: String,
        required: [true, "Please Provide Document Number"],
      },
      documentPath: {
        type: String,
        required: [true, "Please Provide Document Path"],
      },
      isDocumentVerified: Boolean,
      documentExpiryDate: {
        type: String,
        required: [true, "Please Provide Document Expiry Date"],
      },
    },
  ],
  candidateId: {
    type: mongoose.Schema.ObjectId,
    ref: "Candidate",
    required: [true, "Candidate ID Missing"],
  },
  recruiterId: {
    type: mongoose.Schema.ObjectId,
    ref: "Recruiter",
    required: [true, "Recruiter ID Missing"],
  },
  jobPostId: {
    type: mongoose.Schema.ObjectId,
    ref: "JobPost",
    required: [true, "Job Post ID Missing"],
  },
});

const MDoc = mongoose.model("MDoc", MDocSchema);
module.exports = MDoc;
