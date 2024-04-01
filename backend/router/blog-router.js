const express = require('express');
const router = express.Router();

const {blogs,getBlogs} = require('../controllers/blogs-controller');

router.route('/blogs').post(blogs);
router.route('/blogs').get(getBlogs);


module.exports = router