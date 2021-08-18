const express = require("express");
const router = express.Router();
const UserController = require("../controllers/users.controller");

router.get("/", UserController.getAllUser);
router.get("/:id", UserController.getOneUser);

module.exports = router;
