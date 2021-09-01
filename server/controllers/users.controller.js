const ent = require("ent");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const { isValidObjectId } = require("mongoose");
const userServices = require("../services/user.services");
const dayjs = require("dayjs");

//ent.decode(var)

class UserController {
  getAllUser = (req, res) => {
    userModel
      .find()
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((error) => res.status(500).json(error));
  };

  getOneUser = (req, res) => {
    const id = req.params.id;

    userModel
      .findById(id)
      .then((user) => res.status(200).json(user))
      .catch((error) => res.status(500).json(error));
  };

  editUser = (req, res) => {
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

  editPassUser = (req, res) => {
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

  userFollow = async (req, res) => {
    const { id } = req.params;
    const token = req.headers.authorization.split(" ")[1];
    const userId = userServices.getUserId(token);

    try {
      if (userId == id) {
        throw "vous pouvez pas suivre vous meme";
      }
      await userModel.findByIdAndUpdate(
        id,
        {
          $addToSet: { followers: userId },
        },
        { new: true },
        (err, doc) => {
          if (err) throw err;
        }
      );
      await userModel.findByIdAndUpdate(
        userId,
        {
          $addToSet: { following: id },
        },
        { new: true },
        (err, doc) => {
          if (err) throw err;
          res.status(200).json(doc);
        }
      );
    } catch (error) {
      res.status(500).json(error);
    }
  };

  userUnFollow = async (req, res) => {
    const { id } = req.params;
    const token = req.headers.authorization.split(" ")[1];
    const userId = userServices.getUserId(token);

    try {
      if (userId == id) {
        throw "vous pouvez pas suivre vous meme";
      }
      await userModel.findByIdAndUpdate(
        id,
        {
          $pull: { followers: userId },
        },
        { new: true },
        (err, doc) => {
          if (err) throw err;
        }
      );
      await userModel.findByIdAndUpdate(
        userId,
        {
          $pull: { following: id },
        },
        { new: true },
        (err, doc) => {
          if (err) throw err;
          res.status(200).json(doc);
        }
      );
    } catch (error) {
      res.status(500).json(error);
    }
  };

  /*** Notification ***/

  createNotification = async (req, res) => {
    const { author, nature } = req.body;
    const { id } = req.params;
    const createdAt = dayjs();
    try {
      if (!isValidObjectId(id)) {
        throw "Id Invalid";
      }
      userModel.findByIdAndUpdate(
        id,
        {
          $push: {
            notification: {
              author: author,
              nature: nature,
              createdAt: createdAt,
            },
          },
        },
        { new: true },
        (err, doc) => {
          if (err) throw err;
          res.status(200).json(doc);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  updateNotification = async (req, res) => {
    const { idNotification, read } = req.body;
    const { id } = req.params;

    try {
      userModel.findById(id, (err, doc) => {
        let notification = doc.notification.filter((notification) =>
          notification._id.equals(idNotification)
        );
        if (err) throw "Noitification no found";

        notification[0].read = read;
        return doc.save((err) => {
          if (err) {
            throw "Error :" + err;
          }
          res.status(200).json(doc);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
  deleteNotification = async (req, res) => {
    const { idNotification } = req.body;
    const { id } = req.params;

    try {
      if (!isValidObjectId(id)) {
        throw "ID invalid";
      }
      userModel.findByIdAndUpdate(
        id,
        {
          $pull: {
            notification: {
              _id: idNotification,
            },
          },
        },
        { new: true },
        (err, doc) => {
          if (err) throw err;
          res.status(200).json(doc);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  deleteAllNotification = async (req, res) => {
    const { id } = req.params;

    try {
      if (!isValidObjectId(id)) {
        throw "ID invalid";
      }
      userModel.findByIdAndUpdate(
        id,
        {
          $pullAll: {
            notification: [],
          },
        },
        { new: true },
        (err, doc) => {
          if (err) throw err;
          res.status(200).json(doc);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = UserController;
