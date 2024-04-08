const connectDb = require("../utils/db");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Home page
const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to Jooneli");
  } catch (error) {
    console.log(error);
  }
};

// Registration page
const register = async (req, res) => {
  try {
    const { username, email, contact, password } = req.body;
    const conn = await connectDb();

    // Checking if the email already exist or not
    const emailExist = await new Promise((resolve, reject) => {
      conn.query("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row.length > 0);
        }
      });
    });

    if (emailExist) {
      res.status(200).json({ Message: "Email already exist/Try with new one" });
    }

    // Hashing the password
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(password, saltRound);

    // Token Generation
    const token = jwt.sign(
      {
        email: email,
      },
      process.env.JOON_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );

    // Registration Query
    conn.query(
      "INSERT INTO users(username,email,contact,password) values(?,?,?,?)",
      [username, email, contact, hash_password],
      (err, response) => {
        if (err) {
        return  res.status(500).json({ Error: "Internal server errror" });
        } else {
        return  res.status(200).json({ message:"Registration successful",token:token });
        }
      }
    );
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

// Login page

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const conn = await connectDb();

    // Checking If User exist or not
    const userExist = new Promise((resolve, reject) => {
      conn.query("SELECT * FROM users WHERE email = ?", [email], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });

    const user = await userExist;

    if (!user.length) {
      res.status(401).json({ Error: "Invalid Credentials" });
    }

    // Validating the password
    const isPasswordValid = await bcrypt.compare(password, user[0].password);

    // Generating Token
    if (isPasswordValid) {
      const token = jwt.sign(
        {
          email: user[0].email,
          isAdmin: user[0].isAdmin,
        },
        process.env.JOON_SECRET_KEY,
        {
          expiresIn: "30d",
        }
      );
      res
        .status(200)
        .json({
          Message: "Login successful",
          token: token,
        });
    } else {
      res.status(401).json({ Error: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

// To get
const getAllUser = async(req,res)=>{
    try {
      const conn = await connectDb();
      conn.query("SELECT * FROM users",(err,rows)=>{
        if(err){
         return res.status(500).json({message:"Internal server error"});
        }else{
         return res.status(200).json(rows);
        }
      })
    } catch (error) {
      console.log(error);
    }
}

module.exports = { home, register, login,getAllUser };
