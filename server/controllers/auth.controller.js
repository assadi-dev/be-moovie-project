const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");
const ent = require("ent");
const {
  refreshTokenGenerate,
  accessToken,
  setRefreshToken,
} = require("../services/auth.services");

exports.signin = (req, res) => {
  const pseudo = ent.encode(req.body.pseudo);
  const password = ent.encode(req.body.password);
  const email = ent.encode(req.body.email);
  const birthday = ent.encode(req.body.birthday);

  bcrypt
    .hash(password, 16)
    .then((hash) => {
      const user = new UserModel({
        pseudo: pseudo,
        password: hash,
        email: email,
        birthday: birthday,
      });
      user
        .save()
        .then((data) => {
          res.status(201).json(data);
        })
        .catch((error) => {
          res.status(400).json({ error });
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.signup = (req, res) => {
  const email = ent.encode(req.body.email);
  const password = ent.encode(req.body.password);

  UserModel.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          const token = accessToken(user._id);
          const refreshToken = refreshTokenGenerate();
          /*  res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
          }); */
          setRefreshToken(refreshToken, user._id);
          res.status(200).json({ token: token, refreshToken: refreshToken });
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    })
    .catch((error) => res.status(500).json({ error }));
};
