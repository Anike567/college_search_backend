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

    const newUniversity = new CollegeModel({
      university_name,
      nirf_rank,
      courses_offered: courses_offered.split(",").map((data) => data.trim()),
      fee_range,
      university_img: req.file?.path, // For Cloudinary
    });

    const result = await newUniversity.save();

    return res.status(200).json({ msg: "Saved successfully", data: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error occurred" });
  }
});

router.delete("/deleteuniversity", async (req, res) => {
  const { college_id } = req.body;
  console.log(college_id);

  try {
    const result = await CollegeModel.deleteOne({ _id: college_id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ msg: "College not found" });
    }

    return res.status(200).json({ msg: "Deleted Successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
