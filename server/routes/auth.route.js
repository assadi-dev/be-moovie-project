const express = require("express");
const router = express.Router();

router.post("/sigin", (req, res) => {
  res.statut(200).json({ message: "signin" });
});

router.post("/login", (req, res) => {
  res.statut(200).json({ message: "login" });
});

module.exports = router;
