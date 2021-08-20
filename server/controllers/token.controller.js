const refreshTokenModel = require("../models/refreshToken.model");
const {
  accessToken,
  refreshTokenGenerate,
  setRefreshToken,
} = require("../services/auth.services");

/**
 * @return Génére le nouveau JWT de l'utilisateur ainsi que son refresh token
 */
exports.newToken = async (req, res, next) => {
  const { refresh_token } = req.body;

  await refreshTokenModel
    .findOne({ refresh_token: refresh_token })
    .then((data) => {
      const userId = data.userId;
      const token = accessToken(userId);
      const refreshToken = refreshTokenGenerate();
      setRefreshToken(refreshToken, userId);
      res.status(200).json({ token: token, refreshToken: refreshToken });
    })
    .catch((error) => res.status(500).json({ error }));
  next();
};

/**
 * @return retire le token de l'utilisateur dans la base de donnée
 */
exports.revokeToken = async (req, res, next) => {
  const { refresh_token } = req.body;
  await refreshTokenModel
    .findOne({
      refresh_token: refresh_token,
    })
    .then((result) => {
      refreshTokenModel
        .deleteOne({ _id: result._id })
        .then(() => res.status(200).json({ message: "Objet supprimé !" }))
        .catch((error) => res.status(401).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
