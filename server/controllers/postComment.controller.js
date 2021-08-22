const postModel = require("../models/post.model");
const userModel = require("../models/user.model");
const userServices = require("../services/user.services");
const ObjectID = require("mongoose").Types.ObjectId;

exports.addComment = (req, res) => {
  try {
    res.send("Add comment");
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
