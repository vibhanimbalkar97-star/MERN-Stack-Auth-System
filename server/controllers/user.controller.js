const asyncHandler = require("express-async-handler");
const User = require("../models/user.model.js");

// get all users
const getUsers = asyncHandler(async (req, res) => {
  // create pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;
  const skip = (page - 1) * limit;
  const total = await User.countDocuments();
  const users = await User.find().skip(skip).limit(limit).select("-password");
  res.status(200).json({
    users,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  });
});

// delete user
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({ message: "User deleted successfully" });
});

// get user info
const gerProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json(user);
});
