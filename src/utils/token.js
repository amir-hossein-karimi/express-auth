const jwt = require("jsonwebtoken");

const generateAccessToken = (userId) => {
  return jwt.sign({ sub: userId.toString() }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET, {
    algorithms: ["HS256"],
  });
};

module.exports = { generateAccessToken, verifyAccessToken };
