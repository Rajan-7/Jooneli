const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth-middleware');
const adminMiddleware = require('../middleware/admin-middleware')
const {getAllUser,deleteUserById,getUserById} = require('../controllers/admin-controller');

router.route('/users').get(authMiddleware,adminMiddleware,getAllUser);
router.route('/users/:id').get(authMiddleware,adminMiddleware,getUserById);
router.route('/users/delete/:id').delete(authMiddleware,adminMiddleware,deleteUserById)

module.exports =router