const express = require("express");
const EnquiryModel = require("../../models/enquiryModel");
const router = express.Router();
const CollegeModel = require("../../models/college");

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

    const newEnquiryModel = new EnquiryModel({
      university_name,
      nirf_ranking,
      course_offered,
      fee_range,
      name,
      email,
      contact,
      course,
    });

    const result = await newEnquiryModel.save();
    console.log(result);

    if (result) {
      res.status(200).json({ msg: "ok" });
    } else {
      res.status(500).json({ error: "Internal Error Occures" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Error Occurred" });
  }
});

module.exports = router;
