const userModel = require("../models/user.model");
const userServices = require("../services/user.services");

/**
 * @param {string} req contient l'id du Post à traiter
 * @return  Ajoute le post dans le tableau du champ postLikes
 */
exports.AddPostLikes = (req, res) => {
  /**
   * @constant id retourne l'id du post recuperé dans les params de la requete
   */

  const { id } = req.params;
  const token = req.headers.authorization.split(" ")[1];
  const userId = userServices.getUserId(token);

  userModel.findOne({ _id: userId }).then(async (user) => {
    /**
     *@type {string}
     *@constant  verif contient l'id du post trouvé dans le tableau de postLikes
     */
    const verif = user.postLikes.find((post) => post == id);

    try {
      if (verif == id) {
        throw "Post already liked";
      }
      await userModel.findOneAndUpdate(
        userId,
        { $addToSet: { postLikes: id } },
        { new: true },
        (err, doc) => {
          if (err) {
            throw err;
          }
          res.status(200).json({ message: "You liked this post" });
        }
      );
    } catch (error) {
      res.status(400).json({ error });
    }
  });
};

/**
 * @param {string} req contient l'id du Post à traiter
 * @return  Retire le post dans le tableau du champ postLikes
 */
exports.removePostLikes = (req, res) => {
  /**
   * @constant id retourne l'id du post recuperé dans les params de la requete
   */

  const { id } = req.params;
  const token = req.headers.authorization.split(" ")[1];
  const userId = userServices.getUserId(token);
  userModel.findOne({ _id: userId }).then(async (user) => {
    /**
     *@type {string}
     *@constant  verif contient l'id du post trouvé dans le tableau de postLikes
     */

    const verif = user.postLikes.find((post) => post == id);

    try {
      if (verif != id) {
        throw "Post not found !";
      }

      await userModel.findOneAndUpdate(
        userId,
        {
          $pull: { postLikes: id },
        },
        { new: true },
        (err, doc) => {
          if (err) {
            throw err;
          }
          res.status(200).json({ message: "this post has removed" });
        }
      );
    } catch (error) {
      res.status(400).json({ error });
    }
  });
};
