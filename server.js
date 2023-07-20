//use express third party framework
// import express from 'express';
const express = require('express');

//dotenv for environment
// import dotenv from 'dotenv';
const dotenv = require('dotenv');

//to prevent cross-origin block 
// import cors from 'cors';
const cors = require('cors');

//thirdparty middleware
// import morgan from "morgan";
const morgan = require("morgan");

//import mongoose
// import mongoose from 'mongoose';
const mongoose = require('mongoose');

// import router from './router/blogRoutes.js';
const { router } = require('./router/blogRoutes.js');

//to use express third party framework
const app = express();

//for dotenv 
dotenv.config();

app.use(cors());

app.use(morgan('dev'))

app.use(express.json());

/*
 It simplifies the deployment process and ensures that both the front-end and back-end are served from the same origin, avoiding Cross-Origin Request Blocked errors.
*/
app.use(express.static('client/build'))

//connect to mongodb
const dbURI = 'mongodb+srv://cautor3:2021BSi.t@nodetuts.fhdmslu.mongodb.net/blogdb';
mongoose.connect(dbURI).then((result) => {
    app.listen(process.env.PORT, () => {
        console.log(`http://localhost:${process.env.PORT}`)
    })
}).catch(err => console.log(err))

//blog routes   
app.use('/blogs', router);

//404 not found page
app.use((req, res) => {
    res.status(404).sendFile()
})














