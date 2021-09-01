const express = require("express");
const router = express.Router();
const UserController = require("../controllers/users.controller");
const auth = require("../middlewares/auth.middleware");
const userController = new UserController();
router.get("/", auth, userController.getAllUser);
router.get("/:id", auth, userController.getOneUser);
router.put("/:id", auth, userController.editUser);
router.patch("/password/:id", auth, userController.editPassUser);
router.patch("/follow/:id", auth, userController.userFollow);
router.patch("/unfollow/:id", auth, userController.userUnFollow);
router.patch("/notification/add/:id", auth, userController.createNotification);
router.patch(
  "/notification/update/:id",
  auth,
  userController.updateNotification
);
router.patch(
  "/notification/delete/:id",
  auth,
  userController.deleteNotification
);
router.patch(
  "/notification/clearAll/:id",
  auth,
  userController.deleteAllNotification
);

module.exports = router;
