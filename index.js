const express = require("express");
const connectToDb = require("./config/db");
const cors = require("cors");
const collegeController = require("./controller/college/collegeController");
const authController = require("./controller/auth/authController");
const adminController = require("./controller/adminController./adminController");

const app = express();
app.use(cors());
app.use(express.json());

connectToDb();

app.use("/college", collegeController);
app.use("/auth", authController);
app.use("/enquiries", adminController);

app.listen(3000, () => {
  console.log("server is up and running on port 3000");
});
