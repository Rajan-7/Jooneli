const connectDb = require("../utils/db");

const blogs = async (req, res) => {
  try {
    const { name, description, image } = req.body;
    const conn = await connectDb();
    conn.query(
      "INSERT INTO blogs(name,description,image) values(?,?,?)",
      [name, description, image],
      (err, response) => {
        if (err) {
          res.status(500).json({ Error: "Internal server error" });
        } else {
          res.status(201).json({ Message: response });
        }
      }
    );
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const getBlogs = async (req, res) => {
  try {
    const conn = await connectDb();
    conn.query("SELECT * FROM blogs", (err, result) => {
      if (err) {
        return res.status(500).json({ Error: "Internal server error" });
      } else {
        return res.status(200).json(result);
      }
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { blogs, getBlogs };
