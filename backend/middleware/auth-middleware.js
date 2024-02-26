const jwt = require("jsonwebtoken");
const User = require('../models/user-model');

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ msg: "Unauthorized Request. Token not provided." });
  }

  //Triming the space of Token: assuming token is in the form "Bearer <tokenValue>"
  const jwtToken = token.replace("Bearer", "").trim();
  console.log("Token From Middleware", jwtToken);

  try {
    const isVerified = jwt.verify(jwtToken,process.env.JOON_SECRET_KEY);
    const userData = await User.findOne({email:isVerified.email}).select({
      password:0
    });
    req.user = userData;
    req.token = token;
    req.userID = userData._id;
    console.log(userData);
  } catch (error) {
    return res.status(401).json({ msg: "Token not provided" });
  }

  next();
};

module.exports = authMiddleware;
