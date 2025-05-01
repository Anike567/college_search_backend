const mongoose = require("mongoose");
const StudentDetails = require("./../models/studentDetails");

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://admin-aniket:Test123@cluster0.bikic.mongodb.net/college_search",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Handle connection success
mongoose.connection.once("open", async () => {
  try {
    const result = await StudentDetails.deleteMany({});
    console.log(`Deleted ${result.deletedCount} student documents`);

    // Optional: Close connection after deletion
    mongoose.connection.close();
  } catch (err) {
    console.error("Error deleting student entries:", err);
    mongoose.connection.close();
  }
});

// Handle connection error
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
