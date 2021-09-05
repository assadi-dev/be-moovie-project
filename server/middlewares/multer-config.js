const multer = require("multer");
const fs = require("fs");
const MIME_TYPES = {
  "image/jpg": "jpg",
  "imgage/jpeg": "jpeg",
  "image/gif": "gif",
  "image/png": "png",
};
const maxSize = 5 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const { author } = req.body;
    const dir = `client/public/uploads/${author}`;

    fs.exists(dir, (doc) => {
      if (!doc) {
        return fs.mkdir(dir, (error) => {
          callback(error, dir);
        });
      }
    });
    callback(null, dir);
  },
  filename: (req, file, callback) => {
    const name = file.originalname.toLowerCase().split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, `${Date.now()}_${name}`);
  },
});

const fileFilter = (req, file, callback) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/gif"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
    return callback(new Error("Allowed only .png, .jpg, .jpeg and .gif"));
  }
};

module.exports = multer({
  storage: storage,
  fileFilter: fileFilter,
}).single("picture");
