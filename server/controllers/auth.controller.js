const asyncHandler = require("express-async-handler");
const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/generateToken.js");
const {
  setRefreshTokenCookie,
  clearRefreshTokenCookie,
} = require("../utils/cookie.js");

// register user
const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // check user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // hashed password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// login user
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  //check for user email
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  // password check
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400);
    throw new Error("Invalid credentials");
  }

  // access token
  const accessToken = generateAccessToken(user._id, user.role);

  // refresh token
  const refreshToken = generateRefreshToken(user._id, user.role);

  // set cookie
  setRefreshTokenCookie(res, refreshToken);

  res.status(201).json({
    accessToken,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
});

const refreshToken = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    res.status(401);
    throw new Error("No refresh token provided");
  }

  // verify token
  const decoded = verifyRefreshToken(token);
  const user = await User.findById(decoded.id); //fetch user

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  //  create new access token
  const newAccessToken = generateAccessToken(user._id, user.role);

  res.status(201).json({
    accessToken: newAccessToken,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
});

// logout user
const logout = asyncHandler(async (req, res) => {
  clearRefreshTokenCookie(res);
  res.status(201).json({ message: "Logout successfully" });
});

module.exports = {
  register,
  login,
  logout,
  refreshToken
}