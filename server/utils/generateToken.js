const jwt = require("jsonwebtoken");

// Access token
const generateAccessToken = (userId, role) => {
  return jwt.sign(
    {
      userId,
      role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    },
  );
};

// Refresh token
const generateRefreshToken = (userId, role) => {
  return jwt.sign(
    {
      userId,
      role,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    },
  );
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken
};
