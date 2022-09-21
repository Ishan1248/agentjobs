const path = require("path");
const multer = require("multer");
const fs = require("fs");
const util = require("util");
const catchAsync = require(path.join(__dirname, "..", "..", "utils", "catchAsync"));
const checkArr = [
  "introductionVideo",
  "workVideo",
  "passportCopy",
  "passportPhoto",
  "policeClearanceCertificate",
  "resume",
  "educationalCertificates",
  "workExperienceCertificates",
];

// HELPER FUNCTIONS
const makeDir = async function (userId, documentType) {
  const mkdir = util.promisify(fs.mkdir);
  await mkdir(path.join(`${__dirname}`, "..", "..", "public", "candidates", `${userId}`, `${documentType}`), {
    recursive: true,
  });
};

const getFileDestination = function (userId, documentType, documentLink) {
  return path.join(__dirname, "..", "..", "public", "candidates", userId, documentType, documentLink.split("/").at(-1));
};

// TOP LEVEL UNLINKING AND CREATING DIRECTORY
const topLevelUnlinking = async (user, documentType) => {
  //check if pdf exists in our file system
  const documentLink = user["documents"][documentType]["documentLink"];
  if (!documentLink) return;
  const fileDestination = getFileDestination(user._id.toString(), documentType, documentLink);
  const unlink = util.promisify(fs.unlink);
  await unlink(fileDestination);
};

// NESTED LEVEL UNLINKING AND CREATING DIRECTORY
const nestedLevelUnlinking = async (user, documentType, fileType) => {
  // check if pdf exists in our file system
  const userDocuments = user["documents"][documentType];
  // if no documents found simply return out of the function
  if (!userDocuments) return;
  // if documents found loop through array
  const [doc] = userDocuments.filter((el) => {
    return el["fileType"] === fileType;
  });
  if (!doc) return;
  const fileDestination = getFileDestination(user._id.toString(), documentType, doc["documentLink"]);
  const unlink = util.promisify(fs.unlink);
  await unlink(fileDestination);
  doc.remove();
  await user.save();
};

// STORAGE ENGINE
const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const user = req.user;
    return cb(
      null,
      path.join(`${__dirname}`, "..", "..", "public", "candidates", `${user._id}`, `${req.body.documentType}`)
    );
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      req.user._id +
      "-" +
      req.body.documentName +
      "-" +
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      "." +
      `${file.mimetype.split("/").at(1)}`;
    return cb(null, uniqueSuffix);
  },
});

const fileFilter = async function (req, file, cb) {
  const user = req.user;
  // 1) validation
  const { documentName, documentType } = req.body;
  if (!documentName || !documentType || !file) {
    return cb(new Error("Please Provide Document Name And Document Type"), false);
  }
  if (!checkArr.includes(documentType)) {
    return cb(new Error("Please Provide Correct Document Type"), false);
  }

  // 2) check if directory exists
  await makeDir(user._id, req.body.documentType);

  // 3) check if pdf exists in our file system
  if (documentType === "educationalCertificates" || documentType === "workExperienceCertificates") {
    const { fileType } = req.body;
    if (!fileType)
      return cb(
        new Error(
          "Since The Document is educationalCertificates || workExperienceCertificates, Please Provide File Type"
        ),
        false
      );
    await nestedLevelUnlinking(user, documentType, fileType);
  } else {
    await topLevelUnlinking(user, documentType);
  }
  if (file.mimetype.split("/").at(1) === "pdf" || file.mimetype.split("/").at(1) === "mp4") {
    return cb(null, true);
  } else return cb(new Error("Internal Server Error, Unable To Upload File"), false);
};
const upload = multer({ storage: fileStorage, fileFilter: fileFilter });
module.exports = upload;