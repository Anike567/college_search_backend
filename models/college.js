const mongoose = require("mongoose");

const CollegeSchema = new mongoose.Schema(
  {
    university_name: { type: String, required: true },
    nirf_rank: { type: String, required: true },
    courses_offered: { type: [String], required: true },
    fee_range: { type: String, required: true },
    description: { type: String, require: true },
    university_img: { type: String, default: null },
  },
  { timestamps: true }
);

const CollegeModel = mongoose.model("College", CollegeSchema);

module.exports = CollegeModel;
