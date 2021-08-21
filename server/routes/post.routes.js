const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const postControler = require("../controllers/post.controller");

router.post("/add", auth, postControler.createPost);
//router.patch("/remove/:id", auth);

module.exports = router;
