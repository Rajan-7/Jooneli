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
  blogs,
  updateUserById,
  Cnews,
  Inews,
  getBlogs,
  getCnews,
  getInews
} = require("../controllers/admin-controller");

// Admin -> Users Route
router.route("/users").get(authMiddleware, adminMiddleware, getAllUser);
router.route("/users/:id").get(authMiddleware, adminMiddleware, getUserById);
router
  .route("/users/delete/:id")
  .delete(authMiddleware, adminMiddleware, deleteUserById);
router
  .route("/users/update/:id")
  .patch(authMiddleware, adminMiddleware, updateUserById);

// Admin -> Contacts Route
router.route("/contacts").get(authMiddleware, adminMiddleware, getAllContact);
router
  .route("/contacts/:id")
  .get(authMiddleware, adminMiddleware, getContactById);
router
  .route("/contacts/delete/:id")
  .delete(authMiddleware, adminMiddleware, deleteContactById);

// Admin -> Blogs Route
router.route("/blogs").post(authMiddleware, adminMiddleware, blogs);
router.route("/blogs").get(authMiddleware, adminMiddleware, getBlogs);

// Admin -> Corporate News
router.route("/cnews").post(authMiddleware, adminMiddleware, Cnews);
router.route("/cnews").get(authMiddleware, adminMiddleware, getCnews);


// Admin -> Image News
router.route("/inews").post(authMiddleware, adminMiddleware, Inews);
router.route("/inews").get(authMiddleware, adminMiddleware, getInews);


module.exports = router;
