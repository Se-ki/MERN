// import mongoose from "mongoose";
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    snippet: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    }

}, { timestamps: true })

//collection means table in sql 
//that Blogs will create automatically a collection in the mongodb database
//                             ⬇
const Blog = mongoose.model('Blogs', blogSchema)
module.exports = Blog
