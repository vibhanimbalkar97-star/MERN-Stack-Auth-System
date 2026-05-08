const express = require("express");
const {
  getUsers,
  deleteUser,
  getProfile,
} = require("../controllers/user.controller.js");
const { verifyToken, verifyRole } = require("../middleware/auth.middleware.js");
const router = express.Router();

router.get("/", verifyToken, verifyRole("admin"), getUsers); //only admin can accessible the function
router.delete("/:id", verifyToken, verifyRole("admin"), deleteUser); //only admin
router.get("/me", verifyToken, getProfile); //for any user access the profile, it being required logged in

module.exports = router;

// protect route by using verifyRole, verifyToken
// url delete = delete/api/users/12345

