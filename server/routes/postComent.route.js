const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const commentController = require("../controllers/postComment.controller");

router.patch("/add/:id", auth, commentController.addComment);
//router.patch("/edit", auth, postController.commentController);
//router.patch("/delete", auth, postController.createPost);

module.exports = router;
