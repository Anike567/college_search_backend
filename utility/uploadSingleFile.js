const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Ensure the 'uploads' directory exists
const uploadDir = path.join(__dirname, "./../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadDir);
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    callback(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
    req.uploadedFilePath;
  },
});

// Optional: Filter only image files (uncomment if needed)

const fileFilter = (req, file, callback) => {
  if (file.mimetype.startsWith("image/")) {
    callback(null, true);
  } else {
    callback(new Error("Only image files are allowed!"), false);
  }
};

// Create the multer upload instance
const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;
