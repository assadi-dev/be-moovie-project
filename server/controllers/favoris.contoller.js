const userModel = require("../models/user.model");
const userServices = require("../services/user.services");

exports.addMovieFavorie = (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization.split(" ")[1];
  const userId = userServices.getUserId(token);

  userModel.findOne({ _id: userId }).then((user) => {
    const verif = user.movies.favoris.find((movie) => movie == id);

    try {
      if (verif == id) {
        throw "movie already in favorie !";
      }
      userModel
        .findByIdAndUpdate(
          { _id: user._id },
          { movies: { favoris: [...user.movies.favoris, id] } }
        )
        .then(() => {
          res.status(200).json({ message: "this movie has aded to favoris" });
        });
    } catch (error) {
      res.status(400).json({ error });
    }
  });
};

exports.removeMovieFavorie = (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization.split(" ")[1];
  const userId = userServices.getUserId(token);

  userModel.findOne({ _id: userId }).then((user) => {
    const verif = user.movies.favoris.find((movie) => movie == id);
    try {
      if (verif != id) {
        throw "movie not found !";
      }
      const favorieRemoved = user.movies.favoris.filter((movie) => movie != id);
      userModel
        .findByIdAndUpdate(
          { _id: user._id },
          { movies: { favoris: favorieRemoved } }
        )
        .then(() => {
          res
            .status(200)
            .json({ message: "this serie has removed to favoris" });
        });
    } catch (error) {
      res.status(400).json({ error });
    }
  });
};

//Series actions

exports.addSerieFavorie = (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization.split(" ")[1];
  const userId = userServices.getUserId(token);

  userModel.findOne({ _id: userId }).then((user) => {
    const verif = user.series.favoris.find((serie) => serie == id);

    try {
      if (verif == id) {
        throw "serie already in favorie !";
      }
      userModel
        .findByIdAndUpdate(
          { _id: user._id },
          { series: { favoris: [...user.series.favoris, id] } }
        )
        .then(() => {
          res.status(200).json({ message: "this serie has added to favoris" });
        });
    } catch (error) {
      res.status(400).json({ error });
    }
  });
};

exports.removeSerieFavorie = (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization.split(" ")[1];
  const userId = userServices.getUserId(token);

  userModel.findOne({ _id: userId }).then((user) => {
    const verif = user.series.favoris.find((serie) => serie == id);
    try {
      if (verif != id) {
        throw "movie not found !";
      }
      const favorieRemoved = user.series.favoris.filter((serie) => serie != id);
      userModel
        .findByIdAndUpdate(
          { _id: user._id },
          { series: { favoris: favorieRemoved } }
        )
        .then(() => {
          res
            .status(200)
            .json({ message: "this serie has removed to favoris" });
        });
    } catch (error) {
      res.status(400).json({ error });
    }
  });
};
