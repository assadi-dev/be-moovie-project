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
    media: {
      picture: { type: [{ name: String, path: String }] },
      audio: { type: [{ name: String, path: String }] },
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
          createdAt: Date.now(),
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("post", PostSchema);
