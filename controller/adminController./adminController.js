const express = require("express");
const enquiryModel = require("../../models/enquiryModel");
const StudentDetails = require("./../../models/studentDetails");
const upload = require("../../utility/uploadSingleFile");

const router = express.Router();

router.post("/getallenquiry", async (req, res) => {
  try {
    const result = await enquiryModel.find();
    res.json({ enquiries: result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal Server occured" });
  }
});

router.post("/getresolvedenquiry", async (req, res) => {
  try {
    const result = await enquiryModel.find({ resolved: true }); // Even better: filter directly in the DB!

    return res.status(200).json({ data: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server occurred" });
  }
});

router.post("/getunresolvedenquiry", async (req, res) => {
  try {
    const result = await enquiryModel.find({ resolved: false }); // Even better: filter directly in the DB!

    return res.status(200).json({ data: result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server occured" });
  }
});
router.patch("/markedasresolved", async (req, res) => {
  try {
    const { id } = req.body;

    const enquiry = await enquiryModel.findOneAndUpdate(
      { _id: id },
      { resolved: true },
      { new: true } // This option returns the updated document
    );

    if (!enquiry) {
      return res.status(404).json({ msg: "Enquiry not found" });
    }

    return res.status(200).json({ msg: "Marked as resolved", enquiry });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.patch("/markedasunresolved", async (req, res) => {
  try {
    const { id } = req.body;

    const enquiry = await enquiryModel.findOneAndUpdate(
      { _id: id },
      { resolved: false },
      { new: true } // This option returns the updated document
    );

    if (!enquiry) {
      return res.status(404).json({ msg: "Enquiry not found" });
    }

    return res.status(200).json({ msg: "Marked as unresolved", enquiry });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/addstudents", upload.single("file"), async (req, res) => {
  const { email, name, contact, address, course, university, doj, doc } =
    req.body;

  console.log(email, name, contact, address, course, university, doj, doc);
  console.log(req.file);
  const newStudent = new StudentDetails({
    email,
    name,
    contact,
    address,
    course,
    university,
    doj: new Date(doj), // correct usage
    doc: new Date(doc), // correct usage
    image: `localhost:3000/uploads/${req.file.filename}`,
  });

  try {
    await newStudent.save();
    res.status(200).json({ msg: "done" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Internal Server Error occurred" });
  }
});

router.get("/getstudentdetails", async (req, res) => {
  try {
    const students = await StudentDetails.find(); // renamed to "students"

    res.status(200).json({ data: students });
  } catch (err) {
    console.log(err);

    res.status(500).json({ err: "Internal server error occurred" });
  }
});

module.exports = router;
