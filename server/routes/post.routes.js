const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const PostController = require("../controllers/post.controller");
const { upload } = require("../middlewares/multer-config");

const postController = new PostController();

router.get("/", auth, postController.readAllPost);
router.get("/:id", auth, postController.readOnePost);
router.post("/add", auth, upload.single("picture"), postController.createPost);
router.put("/edit/:id", auth, postController.editPost);
router.delete("/delete/:id", auth, postController.deletPost);

module.exports = router;
