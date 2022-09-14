const jwt = require("jsonwebtoken");
const generateJwt = function (user, req, res) {
  const payload = { role: user.role, id: user._id };
  const token = jwt.sign({ payload }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 3600 * 1000),
    httpOnly: true,
  };
  res.cookie("jwt", token, cookieOptions);
  res.status(200).json({
    status: "success",
    data: {
      message: "User Successfully Logged In",
      user,
    },
  });
};

module.exports = generateJwt;
