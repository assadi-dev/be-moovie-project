const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

exports.signin = (req, res) => {
  const { password } = req.body;
  try {
    bcrypt.hash(req.body.password, 16).then((hash) => {
      const user = new UserModel({ password });
      user
        .save()
        .then((res) => {
          res.status(201).json({ message: res.id });
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    });
  } catch (error) {}
};
