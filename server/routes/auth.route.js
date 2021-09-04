const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const tokenController = require("../controllers/token.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/signin", authController.signin);
router.post("/login", authController.signup);
router.post("/refreshToken", tokenController.newToken);
router.post("/revokeToken", tokenController.revokeToken);

module.exports = router;
