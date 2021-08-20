const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const favorieController = require("../controllers/favoris.contoller");

router.patch("/add/:id", auth, favorieController.addSerieFavorie);
router.patch("/remove/:id", auth, favorieController.removeSerieFavorie);

module.exports = router;
