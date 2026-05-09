const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

// verify token
const verifyToken = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader && !authHeader.startsWith("Bearer")) {
    res.status(404);
    throw new Error("No token provided");
  }

  // extract token part
  const token = authHeader.split(" ")[1];

  // if token is true need to verify
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.status(403);
      throw new Error("Invalid token");
    }
    req.user = user;
    next();
  });
});

// role based
const verifyRole = (role) => {
  return (req, res, next) => {
    const userRole = req.user?.role;
    if (userRole !== role) {
      return res.status(403).json({ message: "Access Denied" });
    }
    next();
  };
};

module.exports = {
  verifyToken,
  verifyRole
}
