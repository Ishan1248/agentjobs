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
      courseType: String,
      startDate: Date,
      endDate: Date,
    },
  ];
  
  exports.workExperience = [
    {
      designation: String,
      companyName: String,
      workLocation: String,
      responsibility: String,
      startDate: Date,
      endDate: Date,
    },
  ];
  
  exports.documents = {
    introductionVideo: {
      documentName: String,
      documentLink: String,
      isDocumentVerified: Boolean,
    },
    workVideo: {
      documentName: String,
      documentLink: String,
      isDocumentVerified: Boolean,
    },
    passportCopy: {
      documentName: String,
      documentNumber: String,
      documentLink: String,
      isDocumentVerified: Boolean,
      documentExpiryDate: Date,
    },
    passportPhoto: {
      documentName: String,
      documentLink: String,
      isDocumentVerified: Boolean,
    },
    policeClearanceCertificate: {
      documentName: String,
      documentNumber: String,
      documentLink: String,
      isDocumentVerified: Boolean,
    },
    resume: {
      documentName: String,
      documentLink: String,
      isDocumentVerified: Boolean,
    },
    educationalCertificates: [
      {
        fileType: String,
        documentName: String,
        documentLink: String,
        isDocumentVerified: Boolean,
      },
    ],
    workExperienceCertificates: [
      {
        fileType: String,
        documentName: String,
        documentLink: String,
        isDocumentVerified: Boolean,
      },
    ],
  };