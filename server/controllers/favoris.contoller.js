const userModel = require("../models/user.model");
const userServices = require("../services/user.services");

exports.addMovieFavorie = (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization.split(" ")[1];
  const userId = userServices.getUserId(token);

  userModel
    .findOne({ _id: userId })
    .then((user) => {
      userModel
        .findByIdAndUpdate(
          { _id: user._id },
          { movies: { favoris: [...user.movies.favoris, id] } }
        )
        .then(() => {
          res.status(200).json({ message: "this movie has aded to favoris" });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.addSerieFavorie = (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization.split(" ")[1];
  const userId = userServices.getUserId(token);

  userModel.findOne({ _id: userId }).then((user) => {
    userModel
      .findByIdAndUpdate(
        { _id: user._id },
        { series: { favoris: [...user.series.favoris, id] } }
      )
      .then(() => {
        res.status(200).json({ message: " this serie has added to favoris" });
      });
  });
};

exports.removeMovieFavorie = (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization.split(" ")[1];
  const userId = userServices.getUserId(token);

  userModel.findOne({ _id: userId }).then((user) => {
    const favories = user.series.favoris;
    console.log(favories);
    res.status(200).json({ message: favories });
    /*  userModel
      .findByIdAndUpdate(
        { _id: user._id },
        { movies: { favoris: [...user.movies.favoris, id] } }
      )
      .then(() => {
        res.status(200).json({ message: "this serie has removed to favoris" });
      }); */
  });
};
