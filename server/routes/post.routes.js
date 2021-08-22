const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const postController = require("../controllers/post.controller");

router.get("/", auth, postController.readAllPost);
router.get("/:id", auth, postController.readOnePost);
router.post("/add", auth, postController.createPost);

module.exports = router;
