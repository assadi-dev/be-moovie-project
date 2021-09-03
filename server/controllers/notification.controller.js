const userModel = require("../models/user.model");
const { isValidObjectId } = require("mongoose");
const userServices = require("../services/user.services");
const dayjs = require("dayjs");

class Notification {
  constructor(io, socket) {
    this.socket = socket;
    this.io = io;
    socket.on("join_room", (pseudo) => {
      socket.join("public");
      console.log(`${pseudo} as join the room `);
    });

    socket.on("createdPost", (data) => {
      if (data.followers.length > 0) {
        data.followers.forEach((follower) => {
          this.addNotification(follower, data);
        });
      }
    });
  }

  addNotification = (id, data) => {
    const { author, action, sourceId } = data;

    try {
      if (!isValidObjectId(author)) {
        throw "Id Invalid";
      }

      userModel.findByIdAndUpdate(
        id,
        {
          $push: {
            notifications: {
              author: author,
              action: action,
              sourceId: sourceId,
              createdAt: dayjs(),
            },
          },
        },
        { new: true },
        (err, doc) => {
          if (err) throw err;

          this.io.sockets.to("public").emit("news", doc.notifications);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
}

const notifyAction = (io) => {
  io.on("connection", (socket) => {
    new Notification(io, socket);
  });
};

module.exports = notifyAction;
