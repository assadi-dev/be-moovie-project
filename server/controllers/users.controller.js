const ent = require("ent");

//ent.decode(var)

exports.getAllUser = (req, res) => {
  res.status(200).json({ message: "alluser" });
};

exports.getOneUser = (req, res) => {
  const id = req.params.id;
  res.status(200).json({ id: id, message: "OneUser" });
};
