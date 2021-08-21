const postModel = require("../models/post.model");
const ent = require("ent");

exports.createPost = async (req, res) => {
    const {}
    const newPost = new postModel({
      
  });
  try {
    newPost
      .save()
      .then((post) => {
        res.status(201).json(post);
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.editPost = (req, res) => {};

exports.deletPost = (req, res) => {};
