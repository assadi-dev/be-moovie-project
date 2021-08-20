const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const favorieController = require("../controllers/favoris.contoller");

router.patch("/add/:id", auth, favorieController.addMovieFavorie);
router.patch("/remove/:id", auth, favorieController.removeMovieFavorie);

module.exports = router;
