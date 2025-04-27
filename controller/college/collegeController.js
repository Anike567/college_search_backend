const express = require("express");
const EnquiryModel = require("../../models/enquiryModel");
const router = express.Router();
const CollegeModel = require("../../models/college");
const upload = require("../../utility/uploadSingleFile");

router.get("/", (req, res) => {
  try {
    CollegeModel.find().then((colleges) => {
      const cleanData = colleges.map((college) => college.toObject());

      res.json({ college: cleanData });
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/adduniversity", upload.single("file"), async (req, res) => {
  try {
    const { university_name, nirf_rank, courses_offered, fee_range } = req.body;

    console.log(university_name, nirf_rank, courses_offered, fee_range);

    const newUniversity = new CollegeModel({
      university_name,
      nirf_rank,
      courses_offered,
      fee_range,
      university_img: `localhost:3000/uploads/${req.file.filename}`,
    });

    const result = await newUniversity.save();

    if (result) {
      res.status(200).json({ msg: "saved successfully" });
    }

    res.status(200).json({ msg: "saved successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internavl Sever Error occured" });
  }
});

router.post("/enquiry", async (req, res) => {
  try {
    const {
      university_name,
      nirf_ranking,
      course_offered,
      fee_range,
      name,
      email,
      contact,
      course,
    } = req.body;

    console.log(
      university_name,
      nirf_ranking,
      course_offered,
      fee_range,
      name,
      email,
      contact,
      course
    );

    const newEnquiry = new EnquiryModel({
      university_name,
      nirf_ranking,
      course_offered,
      fee_range,
      name,
      email,
      contact,
      course,
    });

    const result = await newEnquiry.save();
    console.log(result);

    if (result) {
      res.status(200).json({ msg: "ok" });
    } else {
      res.status(500).json({ error: "Internal Error Occurred" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Error Occurred" });
  }
});

module.exports = router;
