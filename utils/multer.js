const multer = require("multer");
const util = require("util");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

let upload = multer({ storage: storage }).single("file");
module.exports = util.promisify(upload).bind(multer);
