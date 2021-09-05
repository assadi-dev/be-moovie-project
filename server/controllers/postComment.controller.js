const postModel = require("../models/post.model");
const userModel = require("../models/user.model");
const userServices = require("../services/user.services");
const ent = require("ent");
const { isValidObjectId } = require("mongoose");
const dayjs = require("dayjs");
var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone"); // dependent on utc plugin
dayjs.extend(utc);
dayjs.extend(timezone);

class PostComment {
  addComment = (req, res) => {
    const { id } = req.params;
    const token = req.headers.authorization.split(" ")[1];
    const userId = userServices.getUserId(token);
    const author = userId;
    const pseudo = ent.encode(req.body.pseudo);
    const text = ent.encode(req.body.text);
    const createdAt = dayjs();

    try {
      if (!isValidObjectId(id)) {
        throw "Id Invalid";
      }

      postModel.findByIdAndUpdate(
        id,
        {
          $push: {
            comments: {
              author: author,
              pseudo: pseudo,
              text: text,
              createdAt: createdAt,
            },
          },
        },
        { new: true },
        (err, docs) => {
          if (err) {
            throw err;
          }
          res.status(200).json(docs);
        }
      );
    } catch (error) {
      res.status(500).json(error);
    }
  };

  editComment = (req, res) => {
    const { id } = req.params;
    const idComment = req.body.idComment;
    const text = ent.encode(req.body.text);

    try {
      if (!isValidObjectId(id)) {
        throw "ID invalid";
      }

      postModel.findById(id, (err, docs) => {
        if (err) throw "Erreur" + err;
        const theComment = docs.comments.find((comment) =>
          comment._id.equals(idComment)
        );

        if (!theComment) throw "Comment no found !";
        theComment.text = text;
        return docs.save((err) => {
          if (err) throw "Erreur : " + err;
          res.status(200).json(docs);
        });
      });
    } catch (error) {
      res.status(500).json(error);
    }
  };

  removeComment = (req, res) => {
    const { id } = req.params;
    const idComment = req.body.idComment;

    try {
      if (!isValidObjectId(id)) {
        throw "ID invalid";
      }

      postModel.findOneAndUpdate(
        id,
        {
          $pull: {
            comments: {
              _id: idComment,
            },
          },
        },
        { new: true },
        (err, docs) => {
          if (err) throw "Erreur :" + err;
          res.status(200).json(docs);
        }
      );
    } catch (error) {
      res.status(500).json(error);
    }
  };
}

module.exports = PostComment;
