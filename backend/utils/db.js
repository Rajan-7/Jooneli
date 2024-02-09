const mongoose = require("mongoose");

const URL =process.env.JOON_URI;

const connectDb = async()=>{
   try {
    await mongoose.connect(URL);
    console.log("Database Connect successfully");
   } catch (error) {
    console.error("Connection failed",error.message);
    process.exit(0);
   }
}

module.exports = connectDb;