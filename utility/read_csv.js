const mongoose = require("mongoose");
const csv = require("csv-parser");
const fs = require("fs");
const collegeModel = require("./../models/college");

const rawResults = [];

// Read CSV
fs.createReadStream("indian_private_universities_sample.csv")
  .pipe(csv())
  .on("data", (data) => rawResults.push(data))
  .on("end", async () => {
    // Transform data into clean format
    const transformedResults = rawResults.map((data) => ({
      university_name: data["University Name"],
      nirf_rank: Number(data["NIRF Rank 2024"]),
      courses_offered: data["Courses Offered"]
        .split(",")
        .map((course) => course.trim()),
      fee_range: data["Fee Range (INR)"],
      university_img: null,
    }));

    // console.log(transformedResults);

    await mongoose.connect(
      "mongodb+srv://admin-aniket:Test123@cluster0.bikic.mongodb.net/college_search",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    try {
      const result = await collegeModel.insertMany(transformedResults);
      console.log(result);
      console.log(result.length);
    } catch (err) {
      console.log(err);
    }

    mongoose.disconnect();
  });
