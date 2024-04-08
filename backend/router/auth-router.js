const express = require("express");
const router = express.Router();
const {register,home,login,getAllUser} = require("../controllers/auth-controller");
// const { signupSchema, loginSchema } = require("../validators/auth-validator");
// const validate = require("../middleware/validate-middleware");
// const authMiddleware = require("../middleware/auth-middleware");

router.route("/").get(home);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/user").get(getAllUser)



// router.route("/user").get(authMiddleware, authcontroller.user);

module.exports = router;
