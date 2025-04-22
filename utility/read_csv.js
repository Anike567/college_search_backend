const mongoose = require("mongoose");
const EnquiryModel = require("./../models/enquiryModel");

mongoose.connect("mongodb://127.0.0.1:27017/college_search", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", async () => {
  console.log("Connected to MongoDB");

  EnquiryModel.find()
    .then((colleges) => {
      const cleanData = colleges.map((college) => college.toObject());
      console.log(cleanData);
      mongoose.connection.close();
    })
    .catch((err) => {
      console.error("Error fetching colleges:", err);
    });
});
