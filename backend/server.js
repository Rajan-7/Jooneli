require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./router/auth-router");
const connectDb = require("./utils/db");

// middleware
app.use(express.json());
app.use("/api/auth", router);

const PORT = 5005;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running in ${PORT}`);
  });
});
