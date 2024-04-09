const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");
// const { signupSchema, loginSchema } = require("../validators/auth-validator");
// const validate = require("../middleware/validate-middleware");
// const authMiddleware = require("../middleware/auth-middleware");

router.route("/").get(authController.home);
router.route("/register").post(authController.register);
router.route("/login").post(authController.login);

// router.route("/user").get(authMiddleware, authcontroller.user);

module.exports = router;
