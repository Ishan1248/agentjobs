const path = require("path");
const multer = require("multer");
const fs = require("fs");
const util = require("util");
const catchAsync = require(path.join(__dirname, "..", "..", "utils", "catchAsync"));

// PROFILE PICTURES
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(`${__dirname}`, "..", "..", "public", "profile-picture"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      req.user._id +
      "-" +
      file.fieldname +
      "-" +
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      "." +
      `${file.mimetype.split("/").at(1)}`;
    cb(null, uniqueSuffix);
  },
});

const imagFileFilter = async function (req, file, cb) {
  const user = req.user;
  // check if file exists
  if (!file) return cb(new Error("Please Provide File To Be Uploaded"), false);
  // check if directory exists
  const mkdir = util.promisify(fs.mkdir);
  await mkdir(path.join(`${__dirname}`, "..", "..", "public", "profile-picture"), { recursive: true });
  // check if user has already a profile picture
  if (user.profilePictureLink) {
    const fileDestination = path.join(
      __dirname,
      "..",
      "..",
      "public",
      "profile-picture",
      user.profilePictureLink.split("/").at(-1)
    );
    const unlink = util.promisify(fs.unlink);
    await unlink(fileDestination);
  }
  if (file.mimetype.startsWith("image")) return cb(null, true);
  else return cb(new Error("Internal Server Error, Unable To Upload File"), false);
};
const upload = multer({ storage: imageStorage, fileFilter: imagFileFilter });
module.exports = upload;