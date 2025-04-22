const mongoose = require("mongoose");

const CollegeModel = mongoose.model(
  "College",
  new mongoose.Schema({
    university_name: String,
    nirf_rank: String,
    courses_offered: String,
    fee_range: String,
  })
);

module.exports = CollegeModel;
