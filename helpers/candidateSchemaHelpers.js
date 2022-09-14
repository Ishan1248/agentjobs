exports.personalInformation = {
  country: String,
  state: String,
  city: String,
  nationality: String,
  dateOfBirth: Date,
  maritalStatus: String,
  gender: String,
  disability: String,
  currentAddress: String,
  permanentAddress: String,
  preferredJobs: [String],
  preferredLocations: [String],
  children: [
    {
      fullName: String,
      dateOfBirth: Date,
      gender: String,
    },
  ],
};

exports.educationalQualifications = [
  {
    degreeName: String,
    specialization: String,
    universityName: String,
    collegeName: String,
    courseType: { type: String, enum: ["fulltime", "parttime", "correspondence"] },
    startDate: Date,
    endDate: Date,
  },
];

exports.workExperience = [
  {
    designation: String,
    companyName: String,
    workLocation: String,
    responsibilities: String,
    startDate: Date,
    endDate: Date,
  },
];

exports.documents = {
  passportCopy: {
    documentName: String,
    documentNumber: String,
    documentPath: String,
    isDocumentVerified: Boolean,
    documentExpiryDate: Date,
  },
  passportPhoto: {
    documentName: String,
    documentPath: String,
    isDocumentVerified: Boolean,
  },
  policeClearanceCertificate: {
    documentName: String,
    documentNumber: String,
    documentPath: String,
    isDocumentVerified: Boolean,
  },
  resume: {
    documentName: String,
    documentPath: String,
    isDocumentVerified: Boolean,
  },
  educationalCertificates: [
    {
      documentName: String,
      documentNumber: String,
      documentPath: String,
      isDocumentVerified: Boolean,
    },
  ],
  workExperienceCertificates: [
    {
      documentName: String,
      documentPath: String,
      isDocumentVerified: Boolean,
    },
  ],
};
