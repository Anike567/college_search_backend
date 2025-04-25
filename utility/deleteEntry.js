const StudentDetails = require("./../models/studentDetails");

async function deleteAllStudents() {
  try {
    const result = await StudentDetails.deleteMany({});
    console.log(`Deleted ${result.deletedCount} documents`);
  } catch (err) {
    console.log("Error deleting entries: ", err);
  }
}

const mongoose = require("mongoose");
const EnquiryModel = require("./../models/enquiryModel");

mongoose.connect("mongodb://127.0.0.1:27017/college_search", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", async () => {
  deleteAllStudents();
});
