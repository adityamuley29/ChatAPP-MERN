const express = require("express");

const router = express.Router();

const {
  login,
  register,
  setAvatar,
  getAllUsers,
} = require("../controllers/authController");

router.post("/login", login);
router.post("/register", register);
router.post("/setAvatar/:id", setAvatar);
router.get("/allUsers/:id", getAllUsers);

module.exports = router;
