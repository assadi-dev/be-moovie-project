const refreshTokenModel = require("../models/refreshToken.model");
const {
  accessToken,
  refreshTokenGenerate,
  setRefreshToken,
} = require("../services/auth.services");

exports.newToken = async (req, res, next) => {
  const { userId } = req.body;
  await refreshTokenModel
    .findOne({ userId: userId })
    .then(() => {
      const token = accessToken(userId);
      const refreshToken = refreshTokenGenerate();
      setRefreshToken(refreshToken, userId);
      res.status(200).json({ token: token, refreshToken: refreshToken });
    })
    .catch((error) => res.status(500).json({ error }));
  next();
};

exports.revokeToken = async (req, res, next) => {
  const { userId } = req.body;
  const result = await refreshTokenModel.findOne({ userId: userId });
  if (result) {
    refreshTokenModel
      .deleteOne({ _id: result._id })
      .then(() => res.status(200).json({ message: "Objet supprimé !" }))
      .catch((error) => res.status(400).json({ error }));
  }
  next();
};
