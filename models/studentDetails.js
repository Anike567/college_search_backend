const { mongoose } = require("mongoose");
const StudentDetails = mongoose.model(
  "StudentDetails",
  new mongoose.Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    contact: { type: String, required: true },
    address: { type: String, required: true },
    course: { type: String, required: true },
    university: { type: String, required: true },
    doj: { type: Date, required: true },
    doc: { type: Date, required: true },
    image: { type: String }, // store file path here
  })
);

module.exports = StudentDetails;
