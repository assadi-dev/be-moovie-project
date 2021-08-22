const express = require("express");
const router = express.Router();
const UserController = require("../controllers/users.controller");
const auth = require("../middlewares/auth.middleware");

router.get("/", auth, UserController.getAllUser);
router.get("/:id", auth, UserController.getOneUser);
router.put("/:id", auth, UserController.editUser);
router.patch("/password/:id", auth, UserController.editPassUser);
router.patch("/follower/add/:id", auth, (req, res) => {
  res.send("test");
});

module.exports = router;
