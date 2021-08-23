const express = require("express");
const app = express();
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/users.route");
const moviesRoutes = require("./routes/movies.route");
const seriesRoutes = require("./routes/series.route");
const postLikeRoutes = require("./routes/postLike.route");
const postRoutes = require("./routes/post.routes");
const postCommentRoutes = require("./routes/postComent.route");
const helmet = require("helmet");
const path = require("path");
const cors = require("cors");

//security
app.use(helmet());
//Midlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cors config
const corsOptions = {
  origin: "*",
  allowedHeaders: [
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
  ],
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));

//Routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/user/movies", moviesRoutes);
app.use("/api/user/series", seriesRoutes);
app.use("/api/user/postLike", postLikeRoutes);
app.use("/api/post", postRoutes);
app.use("/api/post/comment", postCommentRoutes);

//static page
app.use(express.static("client/build"));
app.use(express.static("server/uploads"));
app.get("/*", (_, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

module.exports = app;
