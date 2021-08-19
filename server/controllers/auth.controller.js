const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const UserModel = require("../models/user.model");
const refreshTokenModel = require("../models/refreshToken.model");
const dayjs = require("dayjs");

const accessToken = (id) => {
  return jwt.sign({ id: id }, process.env.APP_SECRET, {
    expiresIn: 60 * 60,
  });
};

const refreshTokenGenerate = () => {
  return crypto.randomBytes(45).toString("hex");
};

exports.signin = (req, res) => {
  const { pseudo, password, email } = req.body;

  bcrypt
    .hash(password, 16)
    .then((hash) => {
      let password = hash;
      const user = new UserModel({ pseudo, password, email });
      user
        .save()
        .then((data) => {
          res.status(201).json({ data: data, message: "Utilisiteur créé !" });
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
          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
          });
          res.status(200).json({ token: token, refreshToken: refreshToken });
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    })
    .catch((error) => res.status(500).json({ error }));
};
