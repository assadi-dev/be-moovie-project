const postModel = require("../models/post.model");
const ent = require("ent");
const ObjectID = require("mongoose").Types.ObjectId;
const postServices = require("../services/post.services");

exports.createPost = (req, res) => {
  const newPost = new postModel({
    author: ent.encode(req.body.author),
    pseudo: ent.encode(req.body.pseudo),
    message: ent.encode(req.body.message),
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

exports.readAllPost = async (req, res) => {
  await postModel
    .find()
    .sort({ createdAt: -1 })
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => res.status(400).json(error));
};
exports.readOnePost = async (req, res, next) => {
  const { id } = req.params;
  /**
   *@constant ObjectId verifie la presence de l'id du post reçus en parametre
   */
  if (!ObjectID.isValid(id)) {
    return res.status(404).json({ message: `ID : ${id} est inrouvable` });
  }

  await postModel
    .findOne({ _id: id })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => res.status(400).json(error));
};

exports.editPost = (req, res) => {
  const { id } = req.params;
  const message = ent.encode(req.body.message);
  if (!ObjectID.isValid(id)) {
    return res.status(404).json({ message: `ID : ${id} est inrouvable` });
  }

  try {
    postModel.findByIdAndUpdate(
      id,
      { message: message },
      { new: true },
      (err, doc) => {
        if (err) throw err;
        res.status(200).json(doc);
      }
    );
  } catch (error) {}
};

exports.deletPost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res
      .status(404)
      .json({ message: `poste ${req.params.id} not found` });
  }

  await postModel
    .deleteOne({ _id: req.params.id })
    .then(() =>
      res
        .status(200)
        .json({ message: `le poste ${req.params.id} à été supprimé` })
    )
    .catch((err) => res.status(500).json(err));
};
