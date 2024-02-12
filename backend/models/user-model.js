const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// ? Securing the password
userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, salt);
    user.password = hash_password;
  } catch (error) {
    console.error("Hashing Error", error.message);
    // next(error);
  }
});

// ? Comparing the password
userSchema.methods.comparePassword = async function(pass){
  return await bcrypt.compare(pass,this.password);
}

// ? Generating the token using jsonwebtoken
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        username: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JOON_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.error(error);
  }
};

// creating user model
const User = new mongoose.model("User", userSchema);
module.exports = User;
