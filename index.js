const http = require("http");
const app = require("./server/app");
require("dotenv").config();
require("./server/models/connectDB");
const socketIo = require("socket.io");
const loginController = require("./server/controllers/auth.controller");
const postController = require("./server/controllers/post.controller");

const port = process.env.PORT || 8000;

const server = http.createServer(app);
/**Socket io */
// Quand un client se connecte, on le note dans la console
const io = socketIo(server, { cors: { origin: "*" } });
console.log("new user");
io.on("connection", (socket) => {
  socket.emit("logged", loginController.message);
  socket.on("postCreated", (res) => {
    socket.broadcast.emit("post", "newPost");
  });
});

server.listen(port, () => console.log(`server listening on port : ${port} `));
