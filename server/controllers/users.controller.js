const ent = require("ent");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");

//ent.decode(var)

exports.getAllUser = (req, res) => {
  userModel
    .find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => res.status(500).json(error));
};

exports.getOneUser = (req, res) => {
  const id = req.params.id;

  userModel
    .findById(id)
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(500).json(error));
};

exports.editUser = (req, res) => {
  const { id } = req.params;
  const pseudo = ent.encode(req.body.pseudo);
  const email = ent.encode(req.body.email);
  const presentation = ent.encode(req.body.presentation);

  userModel.findByIdAndUpdate(
    id,
    {
      pseudo: pseudo,
      email: email,
      presentation: presentation,
    },
    { new: true },
    (err, doc) => {
      if (err) res.status(500).json(error);
      res.status(200).json(doc);
    }
  );
};

exports.editPassUser = (req, res) => {
  const { id } = req.params;
  const password = ent.encode(req.body.password);
  const confirmPassword = ent.encode(req.body.confirmPassword);

  try {
    if (password !== confirmPassword) {
      throw "Les mot de passe ne se correspondent pas";
    }

    if (password.length < 6) {
      throw "Le mot de pass doit faire au moins 6 caractere";
    }

    bcrypt.hash(password, 16).then((hash) => {
      userModel.findByIdAndUpdate(
        id,
        {
          password: hash,
        },
        { new: true },
        (err, doc) => {
          if (err) throw err;
          res.status(200).json(doc);
        }
      );
    });
  } catch (error) {
    res.status(400).json(error);
  }
};
