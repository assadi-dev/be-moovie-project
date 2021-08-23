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

exports.addComment = async (req, res) => {
  const { id } = req.params;
  const author = req.body.author;
  const pseudo = ent.encode(req.body.pseudo);
  const text = ent.encode(req.body.text);
  const createdAt = dayjs();

  try {
    if (!isValidObjectId(id)) {
      throw "Id Invalid";
    }

    await postModel.findByIdAndUpdate(
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

exports.editComment = (req, res) => {
  res.send("Edit comment");
};

exports.removeComment = (req, res) => {
  res.send("Remove comment");
};
