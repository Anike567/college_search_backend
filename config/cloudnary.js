const cloudinary = require("cloudinary").v2;

function connectToCloudinary() {
  cloudinary.config({
    cloud_name: "dfnxcomj6",
    api_key: "641416399318511",
    api_secret: "FVvKwHs1Gz4XQpyp_r8IvLbT4YI",
  });
}

module.exports = connectToCloudinary;
