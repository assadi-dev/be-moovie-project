const express = require("express");
const PostLike = require("../controllers/postLike.controller");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");

const postLikeController = new PostLike();
router.patch("/add/:id", auth, postLikeController.AddPostLikes);
router.patch("/remove/:id", auth, postLikeController.removePostLikes);

module.exports = router;
