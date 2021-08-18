const express = require("express");
const app = express();
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/users.route");

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
module.exports = app;
