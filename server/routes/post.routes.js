const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const postController = require("../controllers/post.controller");

router.get("/", auth, postController.readAllPost);
router.get("/:id", auth, postController.readOnePost);
router.post("/add", auth, postController.createPost);
router.put("/edit/:id", auth, postController.editPost);
router.delete("/delete/:id", auth, postController.deletPost);

module.exports = router;
