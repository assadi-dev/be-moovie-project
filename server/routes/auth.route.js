const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post("/sigin", authController.signin);
router.post("/login", authController.signup);

module.exports = router;
