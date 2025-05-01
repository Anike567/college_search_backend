const express = require("express");
const connectToDb = require("./config/db");
const cors = require("cors");
const path = require("path");
const authMiddleware = require("./middleware/auth");
const collegeController = require("./controller/college/collegeController");
const authController = require("./controller/auth/authController");
const adminController = require("./controller/adminController./adminController");
const enquiryController = require("./controller/normalUser/enquiry");
const connectToCloudinary = require("./config/cloudnary");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

connectToDb();
connectToCloudinary();

app.use("/auth", authController);
app.use("/user", enquiryController);
app.use("/college", authMiddleware, collegeController);
app.use("/enquiries", authMiddleware, adminController);

app.listen(3000, () => {
  console.log("server is up and running on port 3000");
});
