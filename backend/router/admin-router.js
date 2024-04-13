const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware");
const {
  getAllUser,
  deleteUserById,
  getUserById,
  getAllContact,
  getContactById,
  deleteContactById,
  blogs
} = require("../controllers/admin-controller");

// Admin -> Users Route
router.route("/users").get(authMiddleware, adminMiddleware, getAllUser);
router.route("/users/:id").get(authMiddleware, adminMiddleware, getUserById);
router
  .route("/users/delete/:id")
  .delete(authMiddleware, adminMiddleware, deleteUserById);

// Admin -> Contacts Route
router.route("/contacts").get(authMiddleware, adminMiddleware, getAllContact);
router
  .route("/contacts/:id")
  .get(authMiddleware, adminMiddleware, getContactById);
router
  .route("/contacts/delete/:id")
  .delete(authMiddleware, adminMiddleware, deleteContactById);

// Admin -> Blogs Route
router.route('/blogs').post(authMiddleware,adminMiddleware,blogs);

module.exports = router;
