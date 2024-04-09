const jwt = require("jsonwebtoken");
const connectDb = require("../utils/db");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  // console.log(req.header);

  if (!token) {
    return res
      .status(401)
      .json({ msg: "Unauthorized Request. Token not provided." });
  }

  //Triming the space of Token: assuming token is in the form "Bearer <tokenValue>"
  const jwtToken = token.replace("Bearer", "").trim();
  console.log("Token From Middleware", jwtToken);

  try {
    const conn = await connectDb();
    const isVerified = jwt.verify(jwtToken, process.env.JOON_SECRET_KEY);

    // Query
    const [queryResult] = await conn.promise().query(
      "SELECT id,username,email,contact,isAdmin FROM users WHERE email = ?",
      [isVerified.email]
    );

    // Extracting only row data
    const userData = queryResult[0];

    // If no user found, return unauthorized
    if(!userData){
      return res.status(401).json({message:"Unauthorized user"});
    }

    req.user = userData;
    req.token = token;
    req.userID = userData.id;
    console.log(userData);
    // next();
  } catch (error) {
    return res
      .status(401)
      .json({ msg: "Unauthorized HTTP,Token not provided" });
  }
  next();
};

module.exports = authMiddleware;
