const mongoose = require("mongoose");

const { MongoMemoryServer } = require("mongodb-memory-server");

exports.dbConnect = async () => {
  //const uri = `mongodb://localhost:27017/test`;
  const mongoServer = await MongoMemoryServer.create();

  const uri = await mongoServer.getUri();

  console.log(uri);

  const mongooseOpts = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };
  await mongoose.connect(uri, mongooseOpts);
};

exports.dbDisconnect = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
};
