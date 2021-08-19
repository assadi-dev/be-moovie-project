const mongoose = require("mongoose");

const refreshTokenSchema = mongoose.Schema(
  {
    refresh_token: {
      type: String,
      trim: true,
      required: true,
    },
    userId: {
      type: String,
      trim: true,
      required: true,
    },
    expireIn: {
      type: Date,
      default: Date.now(),
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("refresh_token", refreshTokenSchema);
