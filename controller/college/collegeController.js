const express = require("express");
const EnquiryModel = require("../../models/enquiryModel");
const router = express.Router();
const CollegeModel = require("../../models/college");
const upload = require("../../utility/uploadSingleFile");

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
router.post("/adduniversity", upload.single("file"), async (req, res) => {
  try {
    const { university_name, nirf_rank, courses_offered, fee_range } = req.body;

    // console.log(university_name, nirf_rank, courses_offered, fee_range);

    const newUniversity = new CollegeModel({
      university_name,
      nirf_rank,
      courses_offered: courses_offered.split(",").map((data) => {
        data.trim();
      }),
      fee_range,
      university_img: `localhost:3000/uploads/${req.file.filename}`,
    });

    const result = await newUniversity.save();

    if (result) {
      return res.status(200).json({ msg: "saved successfully" });
    }

    return res.status(200).json({ msg: "saved successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internavl Sever Error occured" });
  }
});

module.exports = router;
