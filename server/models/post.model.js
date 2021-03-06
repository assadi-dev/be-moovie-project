const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
    },
    pseudo: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      trim: true,
      required: true,
    },
    media: {
      type: [{ fileName: String, path: String }],
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
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("post", PostSchema);
