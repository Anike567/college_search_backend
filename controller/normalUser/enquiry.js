const express = require("express");

const router = express.Router();

const EnquiryModel = require("./../../models/enquiryModel");
const CollegeModel = require("./../../models/college");

router.get("/", (req, res) => {
  try {
    CollegeModel.find().then((colleges) => {
      const cleanData = colleges.map((college) => college.toObject());

      return res.json({ college: cleanData });
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

    if (result) {
      return res.status(200).json({ msg: "ok" });
    }

    return res.status(500).json({ error: "Internal Error Occurred" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Error Occurred" });
  }
});

module.exports = router;
