require("dotenv").config();
const express = require("express");
const app = express();
const connectDb = require("./utils/db");
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router")
const errorMiddleware = require("./middleware/error-middleware");

// middleware
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/form",contactRoute);

app.use(errorMiddleware);

const PORT = 5005;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running in ${PORT}`);
  });
});
