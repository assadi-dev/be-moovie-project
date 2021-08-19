const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");
const { validate } = require("./post.model");

const userSchema = mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minLenght: 3,
      maxLenght: 55,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 6,
    },
    picture: {
      type: String,
      default: "../uploads/avatar/random-user.png",
    },
    presentation: {
      type: String,
      max: 1024,
    },
    followers: {
      type: [String],
    },
    following: {
      type: [String],
    },
    postLikes: {
      type: [String],
    },
    movies: {
      favoris: { type: [String] },
      likes: { type: [String] },
    },
    series: {
      favoris: { type: [String] },
      likes: { type: [String] },
    },
  },
  {
    timestamps: true,
  }
);

// Execute les fonctions avant de sauvegarder dans  la base de donées

//plugin verification de la presence unique de l'email
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("user", userSchema);
