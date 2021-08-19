const refreshTokenModel = require("../models/refreshToken.model");
const dayjs = require("dayjs");

exports.setRefreshToken = async (refresh_token, userId) => {
  const result = await refreshTokenModel.findOne({
    userId: userId,
  });

  if (result) {
    refreshTokenModel
      .updateOne(
        { _id: result._id },
        {
          refresh_token: "refresh_token",
          _id: result._id,
          expireIn: dayjs().add(7, "day"),
        }
      )
      .then(() => {
        console.log("updated");
      })
      .catch((error) => console.log(error));
    console.log(result);
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
