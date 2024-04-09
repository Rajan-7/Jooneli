const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth-middleware');
const adminMiddleware = require('../middleware/admin-middleware')
const getAllUser = require('../controllers/admin-controller');

router.route('/users').get(authMiddleware,adminMiddleware,getAllUser);

module.exports =router