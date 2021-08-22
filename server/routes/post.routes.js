const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const postController = require("../controllers/post.controller");

router.get("/", auth, postController.readAllPost);
router.get("/:id", auth, postController.readOnePost);
router.post("/add", auth, postController.createPost);
router.patch("/comment/add", auth, postController.createPost);
//router.patch("/comment/edit", auth, postController.createPost);
//router.patch("/comment/edit", auth, postController.createPost);

module.exports = router;
