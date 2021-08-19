const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      trim: true,
    },
    url: {
      type: String,
    },
    media: {
      picture: { type: [{ name: String, path: String }] },
      music: { type: [{ name: String, path: String }] },
      video: { type: [{ name: String, path: String }] },
    },
    likers: {
      type: [String],
    },
    comments: {
      type: [
        {
          author: String,
          pseudo: String,
          text: String,
          createdAt: Date,
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("post", PostSchema);
