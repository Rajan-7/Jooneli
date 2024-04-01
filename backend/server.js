require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDb = require("./utils/db");
const authImg = require('./router/image-router');
const authBlog = require('./router/blog-router');
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");



// middleware
app.use(cors());
app.use(express.json());

// Router middleware
app.use("/api/image",authImg);
app.use("/api/blog",authBlog);
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);



const PORT = 5005;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running in ${PORT}`);
  });
});
