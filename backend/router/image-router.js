const express = require('express');
const router = express.Router();

const imageUploader = require('../controllers/image-controller');
const upload = require('../middleware/image-uploader');

router.route('/images').post(upload.single('image'),imageUploader);

module.exports = router;