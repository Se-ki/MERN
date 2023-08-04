//use express third party framework
// import express from 'express';
const express = require('express');

//dotenv for environment
// import dotenv from 'dotenv';
const dotenv = require('dotenv');

//to prevent cross-origin block 
const cors = require('cors');

//import mongoose to connect to database
const mongoose = require('mongoose');

//routers
const blogRoutes = require('./router/blogRoutes.js');
const authorRoutes = require('./router/authorRoutes.js');


const cookieParser = require('cookie-parser');

//to use express third party framework
const app = express();

//for dotenv 
dotenv.config();

//middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser())
app.use(express.static('client/build'))

/*
 It simplifies the deployment process and ensures that both the front-end and back-end are served from the same origin, avoiding Cross-Origin Request Blocked errors.
*/

//connect to mongodb
mongoose.connect(process.env.MONGODB_URI).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`http://localhost:${process.env.PORT}`)
    })
}).catch(err => console.log(err))

//login routes
app.use('/user', authorRoutes)

//blog routes   
app.use('/blogs', blogRoutes);















