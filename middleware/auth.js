const verifyToken = require("./../utility/verifyToken");

const checkForLogin = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  const result = await verifyToken(token);

  if (result.error) {
    console.log("unauthorised");
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  if (result.decoded) next();
  else
    return res.status(401).json({
      message: "Unauthorized",
    });
};

module.exports = checkForLogin;
