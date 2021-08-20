const express = require("express");
const router = express.Router();
const postLikeController = require("../controllers/postLike.controller");
const auth = require("../middlewares/auth.middleware");

router.patch("/add", auth);
//router.patch("/remove", auth, UserController.getOneUser);

module.exports = router;
