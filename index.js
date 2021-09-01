const http = require("http");
const app = require("./server/app");
require("dotenv").config();
require("./server/models/connectDB");
const socketIo = require("socket.io");

const port = process.env.PORT || 8000;

const server = http.createServer(app);
/**Socket io */
// Quand un client se connecte, on le note dans la console
const io = socketIo(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  socket.on("logged", (pseudo) => {
    console.log(`${pseudo} est connecté`);
  });
});

server.listen(port, () => console.log(`server listening on port : ${port} `));
