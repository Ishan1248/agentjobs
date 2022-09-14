const path = require("path");
const multer = require("multer");

// PROFILE PICTURES
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(`${__dirname}`, "..", "public", "profile-picture"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      req.user._id + Date.now() + "-" + Math.round(Math.random() * 1e9) + "." + `${file.mimetype.split("/").at(1)}`;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const imagFileFilter = function (req, file, cb) {
  if (file.mimetype.startsWith("image")) cb(null, true);
  else cb(null, false);
};
const upload = multer({ storage: imageStorage, fileFilter: imagFileFilter });
module.exports = upload;

// DOCUMENTS
