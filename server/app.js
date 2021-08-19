const express = require("express");
const app = express();
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/users.route");

//Midlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

module.exports = app;
