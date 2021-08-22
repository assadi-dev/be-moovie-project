const postModel = require("../models/post.model");
const ObjectID = require("mongoose").Types.ObjectId;

/**
 *verifie l'existence du post dans la bdd
 * @param {string} id
 * @return {boolean} true
 */
exports.postExists = async (id) => {
  return postModel.findById(id);
};
