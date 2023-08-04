/*
schema is a configuration object that defines the structure of a MongoDB document. It provides a way to define the shape of the documents and the data types of the fields within the collection. Mongoose uses schemas to enforce data integrity and to provide a clear structure for your MongoDB collections.
*/
// import { Blog } from "../model/blog"
const { mongoose } = require("mongoose");
const Blog = require("../model/blog")

/*
Notes:
res or response means send a data to browser
while req or request is to fetch a data from a server
*/

const blogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        if (!blogs) return res.status(200).json({ error: "No more blogs to read. Write some blogs." })
        res.status(200).json(blogs)
    } catch (error) {
        res.status(500).json({ error: "Server Problem." })
    }
}

const blog_details = async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(200).json({ error: "ID is not valid." })
        const blog = await Blog.findById(id)
        res.status(200).json(blog)
    } catch (error) {
        res.status(500).json({ error: "Server Problem." })
    }
}

const create_blog = async (req, res) => {
    try {
        const { title, snippet, body } = req.body;
        if (!title || !snippet || !body) throw Error('All fields must be filled.')
        const blog = await Blog.create({ title, snippet, body })
        res.status(201).json(blog);
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

const delete_blog = async (req, res) => {
    try {
        const id = req.params.id;
        await Blog.findByIdAndDelete(id);
        res.status(200).json({ id });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    blogs,
    blog_details,
    create_blog,
    delete_blog,
}