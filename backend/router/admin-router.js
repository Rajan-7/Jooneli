const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth-middleware');
const getAllUser = require('../controllers/admin-controller');

router.route('/users').get(authMiddleware,getAllUser);

module.exports =router