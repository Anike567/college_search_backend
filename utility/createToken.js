const jwt = require("jsonwebtoken");

async function createToken(payload) {
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
  return token;
}

module.exports = createToken;
