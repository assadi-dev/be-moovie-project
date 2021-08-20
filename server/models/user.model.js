const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { isEmail } = require("validator");

const userSchema = mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minLenght: 3,
      maxLenght: 55,
      unique: true,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 6,
      required: true,
    },
    birthday: {
      type: String,
      trim: true,
      required: true,
    },
    avatar: {
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
