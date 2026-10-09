const jwt = require("jsonwebtoken");

const generateAccessToken = (userId) => {
  return jwt.sign({ sub: userId.toString() }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
};

module.exports = { generateAccessToken };
