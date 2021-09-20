const ent = require("ent");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const { isValidObjectId } = require("mongoose");
const userServices = require("../services/user.services");
const dayjs = require("dayjs");

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

    let data = {
      pseudo: ent.encode(req.body.pseudo),
      email: ent.encode(req.body.email),
      presentation: ent.encode(req.body.presentation),
    };

    let pathFile = "";
    let nameFile = "";
    let size = 0;
    if (req.file) {
      pathFile = `../uploads/${req.body.author}/${req.file.filename}`;
      nameFile = req.file.filename;
      size = req.file.size;

      data = {
        ...data,
        avatar: pathFile,
      };
    }

    userModel.findByIdAndUpdate(id, data, { new: true }, (err, doc) => {
      if (err) res.status(500).json(error);
      res.status(200).json(doc);
    });
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

  editAvatar = async (req, res) => {
    let pathFile = "";
    let nameFile = "";
    if (req.file) {
      pathFile = `../uploads/${req.body.author}/${req.file.filename}`;
      nameFile = req.file.filename;
      size = req.file.size;

      data = {
        avatar: pathFile,
      };
    }
    res.status(200);
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
    const { author, action, sourceId } = req.body;
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
            notifications: {
              author: author,
              action: action,
              sourceId: sourceId,
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
        let notification = doc.notifications.filter((notification) =>
          notification._id.equals(idNotification)
        );
        if (err) throw "Noitification no found";

        notification[0].read = read;
        return doc.save((err) => {
          if (err) {
            throw "Error :" + err;
          }
          res.status(200).json(notification);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  deleteNotification = async (req, res) => {
    const { idNotification } = await req.body;
    const { id } = await req.params;

    try {
      if (!isValidObjectId(id)) {
        throw "ID invalid";
      }
      userModel.findByIdAndUpdate(
        id,
        {
          $pull: {
            notifications: {
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
      userModel.findById(id, (err, doc) => {
        doc.notifications = [];

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
}

module.exports = UserController;
