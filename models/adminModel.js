const mongoose = require("mongoose");

const AdminModel = mongoose.model(
  "Admin",
  new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    contact: String,
  })
);

module.exports = AdminModel;
