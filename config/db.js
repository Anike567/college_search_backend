const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/college_search", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to database successfully");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectToDb;
