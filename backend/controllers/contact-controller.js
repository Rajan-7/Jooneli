const connectDb = require("../utils/db");

const contactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const conn = await connectDb();
    conn.query(
      "INSERT INTO contacts(name,email,subject,message) values(?,?,?,?)",
      [name, email, subject, message],
      (err, response) => {
        if (err) {
          res.status(500).json({ Message: "Message not delivered" });
        } else {
          res.status(200).json({ Message: "Delivered the message successfully!"});
        }
      }
    );
  } catch (error) {
    res.status(500).json({ Message: "Message not delivered" });
  }
};

module.exports = contactForm;
