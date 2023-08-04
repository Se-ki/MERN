const { blogs, blog_details, create_blog, delete_blog } = require("../controllers/blogController");

// import express from "express"
const express = require("express")

//express router
const router = express.Router();

const authorization = require("../middleware/authorization")

//this authorization will be the one will block the entire route if the user is not authorize
//if the user is authorized it will continue to the next route
router.use(authorization)

//#TODO: make an router.get login
// router.get('/user', user)

// Add this code at the beginning of your 'blogRoutes.js' file
router.get('/', blogs)
router.get('/:id', blog_details)
router.post('/create', create_blog)
router.delete('/:id', delete_blog)

// export default router;
module.exports = router 