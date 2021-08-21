const postModel = require("../models/post.model");
const ent = require("ent");

exports.readAllPost = async (req, res) => {
  await postModel
    .find()
    .sort({ createdAt: -1 })
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => res.status(400).json(error));
};

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
