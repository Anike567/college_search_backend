const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin-aniket:Test123@cluster0.bikic.mongodb.net/college_search",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("connected to database successfully");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectToDb;
