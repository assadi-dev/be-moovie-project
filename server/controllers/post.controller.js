const postModel = require("../models/post.model");
const ent = require("ent");

exports.createPost = (req, res) => {
  const newPost = new postModel({
    author: req.body.author,
    message: req.body.message,
  });
  try {
    newPost
      .save()
      .then((post) => {
        res.status(201).json(post);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.editPost = (req, res) => {};

exports.deletPost = (req, res) => {};
