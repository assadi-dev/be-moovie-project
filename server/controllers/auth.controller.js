const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");
const ent = require("ent");
const {
  refreshTokenGenerate,
  accessToken,
  setRefreshToken,
} = require("../services/auth.services");

exports.signin = (req, res) => {
  const { pseudo, password, email, birthday } = req.body;
  let pseudoEncoded = ent.encode(pseudo);
  let passwordEncoded = ent.encode(password);
  let emailEncoded = ent.encode(email);
  let birthdayEncoded = ent.encode(birthday);

  bcrypt
    .hash(passwordEncoded, 16)
    .then((hash) => {
      let password = hash;
      const user = new UserModel({
        pseudo: pseudoEncoded,
        password: password,
        email: emailEncoded,
        birthday: birthdayEncoded,
      });
      user
        .save()
        .then((data) => {
          res.status(201).json({ data: data, message: "Utilisateur créé !" });
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
  const { email, password } = req.body;

  let emailEncoded = ent.encode(email);
  let passwordEncoded = ent.encode(password);

  UserModel.findOne({ email: emailEncoded })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(passwordEncoded, user.password)
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
