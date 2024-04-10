const connectDb = require("../utils/db");

// To Fetch All The Users Data
const getAllUser = async (req, res) => {
  try {
    const conn = await connectDb();
    conn.query("SELECT * FROM users", (err, rows) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      } else {
        return res.status(200).json(rows);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// To Fetch Single User Data By Id
const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const conn = await connectDb();
    conn.query("SELECT id,username,email,contact FROM users WHERE id=?", [id],(err,rows)=>{
      if(err){
        return res.status(500).json({error:"Internal server error"});
      }else{
        return res.status(200).json(rows[0]);
      }
    });
  } catch (error) {
    console.log(`Error While Fetching Single User:${error}`);
  }
};

// TO Delete Users By id
const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const conn = await connectDb();
    conn.query("DELETE FROM users WHERE id = ?", [id]);
    return res.status(200).json({ Message: `User Deleted Successfully` });
  } catch (error) {
    console.log(`Error While Deleting Users:${error}`);
  }
};

module.exports = { getAllUser, deleteUserById, getUserById };
