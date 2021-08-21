const express = require("express");
const app = express();
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/users.route");
const moviesRoutes = require("./routes/movies.route");
const seriesRoutes = require("./routes/series.route");
const postLikeRoutes = require("./routes/postLike.route");
var helmet = require("helmet");

//security
app.use(helmet());
//Midlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/user/movies", moviesRoutes);
app.use("/api/user/series", seriesRoutes);
app.use("/api/user/postLike", postLikeRoutes);

module.exports = app;
