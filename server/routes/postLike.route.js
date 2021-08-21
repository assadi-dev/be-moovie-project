const express = require("express");
const router = express.Router();
const postLikeController = require("../controllers/postLike.controller");
const auth = require("../middlewares/auth.middleware");

router.patch("/add/:id", auth, postLikeController.AddPostLikes);
router.patch("/remove/:id", auth, postLikeController.removePostLikes);

module.exports = router;
