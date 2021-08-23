const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const commentController = require("../controllers/postComment.controller");

router.patch("/add/:id", auth, commentController.addComment);
router.patch("/edit/:id", auth, commentController.editComment);
router.patch("/remove/:id", auth, commentController.removeComment);

module.exports = router;
