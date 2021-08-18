const mongoose = require("mongoose");

const uri = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0-acerom.ypzqx.mongodb.net/be-movies-database`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));
