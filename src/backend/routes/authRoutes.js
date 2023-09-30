// authRoutes.js (Express.js Routes)
const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");

const { login, signup } = require("../controllers/authController");

router.post("/login", login);

router.post("/signup", signup);

module.exports = router;
