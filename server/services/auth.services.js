const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const refreshTokenModel = require("../models/refreshToken.model");
const dayjs = require("dayjs");

exports.refreshTokenGenerate = () => {
  return crypto.randomBytes(45).toString("hex");
};

exports.accessToken = (id) => {
  return jwt.sign({ userId: id }, process.env.APP_SECRET, {
    expiresIn: 60 * 60,
  });
};

exports.setRefreshToken = async (refresh_token, userId) => {
  const result = await refreshTokenModel.findOne({
    userId: userId,
  });

  if (result) {
    refreshTokenModel
      .updateOne(
        { _id: result._id },
        {
          refresh_token: refresh_token,
          _id: result._id,
          expireIn: dayjs().add(7, "day"),
        }
      )
      .then(() => {
        console.log("token refresh updated");
      })
      .catch((error) => console.log(error));

    return;
  }
  const token = new refreshTokenModel({
    refresh_token,
    userId,
  });
  token.save().then(() => {
    console.log("refresh create");
  });
};
