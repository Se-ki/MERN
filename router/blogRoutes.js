const { blogs, blog_details, about, create_blog, delete_blog } = require("../controllers/blogController");

// import express from "express"
const express = require("express")

//express router
const router = express.Router();

// Add this code at the beginning of your 'blogRoutes.js' file

router.get('/', blogs)
router.get('/:id', blog_details)
router.get('/about', about)
router.post('/create', create_blog)
router.delete('/:id', delete_blog)

// export default router;
module.exports = { router }