const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post("/sigin", authController.signin);

router.post("/login", (req, res) => {
  res.statut(200).json({ message: "login" });
});

module.exports = router;
