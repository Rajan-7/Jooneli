const User = require("../models/user-model");
const bcrypt = require("bcrypt");

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

    res.status(200).json({
      message: "Registration successful",
      token: await userCreated.generateToken(),
      id: userCreated._id.toString(),
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

// Login page
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (!userExist) {
      res.status(400).json({ message: "Invalid credentials" });
    }

    const passwordCheck = await userExist.comparePassword(password);
    if (passwordCheck) {
      res.status(200).json({
        msg: "Login successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

module.exports = { home, register, login };
