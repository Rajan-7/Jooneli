const User = require("../models/user-model");

// Home page
const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to Jooneli ");
  } catch (error) {
    console.log(error);
  }
};

// Registration page
const register = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400).json({ message: "Email already exist" });
    }
    const userCreated = await User.create({ username, email, phone, password });

    res
      .status(200)
      .json({
        message: "Registration successful",
        token: await userCreated.generateToken(),
        id: userCreated._id.toString(),
      });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

module.exports = { home, register };
