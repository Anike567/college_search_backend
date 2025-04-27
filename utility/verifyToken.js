const jwt = require("jsonwebtoken");

async function verifyToken(token) {
  const secret = process.env.JWT_SECRET || "your-default-secret";
  try {
    const decoded = jwt.verify(token, secret);
    return { error: false, decoded };
  } catch (err) {
    return { error: true, message: err.message };
  }
}

module.exports = verifyToken;
