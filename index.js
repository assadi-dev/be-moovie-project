const http = require("http");
const app = require("./server/app");
require("dotenv").config();
require("./server/models/connectDB");

const port = process.env.PORT || 8000;

const server = http.createServer(app);

server.listen(port, () => console.log(`server listening on port : ${port} `));
