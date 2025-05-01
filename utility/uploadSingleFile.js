const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // Optional folder name in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

// Optional file filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

// Create multer instance
const upload = multer({ storage, fileFilter });

module.exports = upload;
