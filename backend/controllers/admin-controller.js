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
    conn.query(
      "SELECT id,username,email,contact,isAdmin FROM users WHERE id=?",
      [id],
      (err, rows) => {
        if (err) {
          return res.status(500).json({ error: "Internal server error" });
        } else {
          return res.status(200).json(rows[0]);
        }
      }
    );
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

// To update users by id
const updateUserById = async (req, res) => {
  try {
    const id = req.params;
    const { username, email, contact } = req.body;
    const conn = await connectDb();

    // const sqlQuery = "UPDATE users SET username = ?, email = ?, contact=? WHERE id = ?";
    // const value = [username,email,contact,id];

    // const [rows] = conn.query(sqlQuery,value);
    // res.status(200).json(rows);
    conn.query(
      "UPDATE users SET username = ?, email = ?, contact=? WHERE id = ?",
      [username, email, contact, id],
      (err, row) => {
        if (err) {
          console.log(`Updation error`, err);
        } else {
          res.status(200).json(row);
        }
      }
    );
  } catch (error) {
    console.log(`Error updating the user data`, error);
  }
};

// To Get All The Contacts Data
const getAllContact = async (req, res) => {
  try {
    const conn = await connectDb();
    conn.query("SELECT * FROM contacts", (err, rows) => {
      if (err) {
        console.log(`Error While Fetching  Data:${err}`);
      } else {
        res.status(200).json(rows);
      }
    });
  } catch (error) {
    console.log(`Error While Fetching Contacts Data:${error}`);
  }
};

// To get contact by Id
const getContactById = async (req, res) => {
  try {
    const id = req.params.id;
    const conn = await connectDb();
    conn.query("SELECT * FROM contacts WHERE id = ? ", [id], (err, rows) => {
      if (err) {
        console.log("Error", err);
      } else {
        res.status(200).json(rows[0]);
      }
    });
  } catch (error) {
    console.log(`Error While Data Fetching:${error}`);
  }
};

// To delete contact by Id
const deleteContactById = async (req, res) => {
  try {
    const id = req.params.id;
    const conn = await connectDb();
    conn.query("DELETE FROM contacts WHERE id =?", [id], (err, row) => {
      if (err) {
        console.log("From contact delete", err);
      } else {
        res.status(200).json({ message: "Contact deleted successfully" });
      }
    });
  } catch (error) {
    console.log(`Error on deleting contact:`, error);
  }
};

// Blogs -> To post Blogs
const blogs = async (req, res) => {
  try {
    const { name, description, image } = req.body;
    const conn = await connectDb();
    conn.query(
      "INSERT INTO blogs(name,description,image) VALUES(?,?,?)",
      [name, description, image],
      (err, rows) => {
        if (err) {
          console.log(`Error While Posting`, err);
        } else {
          res.status(200).json({ message: "Blogs inserted successfully" });
        }
      }
    );
  } catch (error) {
    console.log(`Error While Posting Blogs`, error);
  }
};


// To post Corporate News
const Cnews = async (req,res)=>{
  try {
    const {date,description,image}=req.body;
    const conn = await connectDb();
    conn.query("INSERT INTO cnews (image,description,date) VALUES(?,?,?)",[image,description,date],(err,rows)=>{
      if(err){
        console.log(`Posting cnews:`,err);
      }else{
        res.status(200).json(rows);
      }
    })
  } catch (error) {
    console.log(`Error while posting Cnews`,error);
  }
}

// To post Image news/Inews
const Inews = async(req,res)=>{
  try {
    const {image,description,name,type}=req.body;
    const conn = await connectDb();
    conn.query("INSERT INTO inews(image,description,name,type) VALUES(?,?,?,?)",[image,description,name,type],(err,rows)=>{
      if(err){
        console.log(`Error postin Inews `,err);
      }else{
        res.status(200).json(rows);
      }
    })
  } catch (error) {
    console.log(`Error while posting Inews`,error);
  }
}


module.exports = {
  getAllUser,
  deleteUserById,
  getUserById,
  getAllContact,
  getContactById,
  deleteContactById,
  blogs,
  updateUserById,
  Cnews,
  Inews
};
