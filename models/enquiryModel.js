const mongoose = require("mongoose");

const EnquirySchema = new mongoose.Schema(
  {
    university_name: { type: String, required: true },
    nirf_ranking: { type: String, required: true },
    course_offered: { type: [String], required: true },
    fee_range: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true, match: /^[0-9]{10}$/ },
    course: { type: String, required: true },
    resolved: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  }
);

const EnquiryModel = mongoose.model("Enquiry", EnquirySchema);

module.exports = EnquiryModel;
