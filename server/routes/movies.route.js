const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const FavorieController = require("../controllers/favoris.contoller");

const favorieController = new FavorieController();
router.patch("/add/:id", auth, favorieController.addMovieFavorie);
router.patch("/remove/:id", auth, favorieController.removeMovieFavorie);

module.exports = router;
