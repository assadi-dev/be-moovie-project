const userModel = require("../models/user.model");
const userServices = require("../services/user.services");

/**
 *
 * @param {string} req contient l'id du film à traiter
 * @return  Ajoute le film dans le tableau favoris du champ movies
 */
exports.addMovieFavorie = (req, res) => {
  /**  @constant id retourne l'id du film recuperé dans les params de la requete */
  const { id } = req.params;
  const token = req.headers.authorization.split(" ")[1];
  const userId = userServices.getUserId(token);

  userModel.findOne({ _id: userId }).then(async (user) => {
    /**
     *@type {string}
     *@constant  verif contient l'id trouvé dans le tableau movies
     */
    const verif = user.movies.favoris.find((movie) => movie == id);

    try {
      if (verif == id) {
        throw "movie already in favorie !";
      }
      await userModel.findByIdAndUpdate(
        userId,
        { movies: { favoris: [...user.movies.favoris, id] } },
        { new: true },
        (err, doc) => {
          if (err) {
            throw err;
          }
          res.status(200).json({ message: "this movie has aded to favoris" });
        }
      );
    } catch (error) {
      res.status(400).json({ error });
    }
  });
};

/**
 *
 * @param {string} req contient l'id du film à traiter
 * @return {object}  Retire le film dans le tableau favoris du champ movies
 */
exports.removeMovieFavorie = (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization.split(" ")[1];
  const userId = userServices.getUserId(token);

  userModel.findOne({ _id: userId }).then(async (user) => {
    /**
     *@type {string}
     *@constant  verif contient l'id trouvé dans le tableau movies
     */
    const verif = user.movies.favoris.find((movie) => movie == id);
    try {
      if (verif != id) {
        throw "movie not found !";
      }
      const favorieRemoved = user.movies.favoris.filter((movie) => movie != id);
      await userModel.findByIdAndUpdate(
        userId,
        {
          movies: { favoris: favorieRemoved },
        },
        { new: true },
        (err, doc) => {
          if (err) {
            throw err;
          }
          res
            .status(200)
            .json({ message: "this movie has removed to favoris" });
        }
      );
    } catch (error) {
      res.status(400).json({ error });
    }
  });
};

//Series actions

/**
 * @param {string} req contient l'id du film à traiter
 * @return {object}  Ajoute le film dans le tableau favoris du champ series
 */
exports.addSerieFavorie = (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization.split(" ")[1];
  const userId = userServices.getUserId(token);

  userModel.findOne({ _id: userId }).then(async (user) => {
    /**
     *@type {string}
     *@constant  verif contient l'id trouvé dans le tableau series
     */
    const verif = user.series.favoris.find((serie) => serie == id);

    try {
      if (verif == id) {
        throw "serie already in favorie !";
      }
      await userModel.findByIdAndUpdate(
        userId,
        { series: { favoris: [...user.series.favoris, id] } },
        { new: true },
        (err, doc) => {
          if (err) {
            throw err;
          }
          res.status(200).json({ message: "this serie has added to favoris" });
        }
      );
    } catch (error) {
      res.status(400).json({ error });
    }
  });
};

/**
 *
 * @param {string} req contient l'id du film à traiter
 * @return {object}  Retire le film dans le tableau favoris du champ series
 */

exports.removeSerieFavorie = (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization.split(" ")[1];
  const userId = userServices.getUserId(token);

  userModel.findOne({ _id: userId }).then(async (user) => {
    /**
     *@type {string}
     *@constant  verif contient l'id trouvé dans le tableau series
     */
    const verif = user.series.favoris.find((serie) => serie == id);
    try {
      if (verif != id) {
        throw "serie not found !";
      }
      const favorieRemoved = user.series.favoris.filter((serie) => serie != id);
      await userModel.findByIdAndUpdate(
        { _id: user._id },
        { series: { favoris: favorieRemoved } },
        { new: true },
        (err, doc) => {
          if (err) {
            throw err;
          }
          res
            .status(200)
            .json({ message: "this serie has removed to favoris" });
        }
      );
    } catch (error) {
      res.status(400).json({ error });
    }
  });
};
