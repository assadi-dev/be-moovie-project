const { json } = require("express");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

/**
 * @param token token de l'utilisateur
 * @returns {string} retourne l'ID de l'utilisareur
 */
exports.getUserId = (token) => {
  const userId = jwt.decode(token).userId;
  return userId;
};

/* exports.UserData = async (userId) => {
  let array = [];
  await UserModel.findOne({ _id: userId }).then((result) => {
    array = result;
    return array;
  });
}; */
