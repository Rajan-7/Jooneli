require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDb = require("./utils/db");
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const errorMiddleware = require("./middleware/error-middleware");

// CorsOptions
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["POST,HEAD,GET,PUT,PATCH,DELETE"],
  credentials: true,
};

// middleware
app.use(cors(corsOptions));
app.use(express.json());

// Router middleware
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);

app.use(errorMiddleware);

const PORT = 5005;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running in ${PORT}`);
  });
});
