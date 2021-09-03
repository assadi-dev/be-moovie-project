const http = require("http");
const app = require("./server/app");
require("dotenv").config();
require("./server/models/connectDB");
const socketIo = require("socket.io");
const notifyAction = require("./server/controllers/notification.controller");

const port = process.env.PORT || 8000;

const server = http.createServer(app);
/**Socket io */
// Quand un client se connecte, on le note dans la console
const io = socketIo(server, { cors: { origin: "*" } });

notifyAction(io);

server.listen(port, () => console.log(`server listening on port : ${port} `));
