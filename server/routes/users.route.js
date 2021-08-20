const express = require("express");
const router = express.Router();
const UserController = require("../controllers/users.controller");
const auth = require("../middlewares/auth.middleware");

router.get("/", auth, UserController.getAllUser);
router.get("/:id", auth, UserController.getOneUser);

module.exports = router;
