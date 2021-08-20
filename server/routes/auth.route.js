const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const tokenController = require("../controllers/token.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/sigin", authController.signin);
router.post("/login", authController.signup);
router.post("/refreshToken", auth, tokenController.newToken);
router.post("/revokeToken", auth, tokenController.revokeToken);

module.exports = router;
