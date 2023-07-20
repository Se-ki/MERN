/*
schema is a configuration object that defines the structure of a MongoDB document. It provides a way to define the shape of the documents and the data types of the fields within the collection. Mongoose uses schemas to enforce data integrity and to provide a clear structure for your MongoDB collections.
*/
// import { Blog } from "../model/blog"
const { Blog } = require("../model/blog")

/*
Notes:
res or response means send a data to browser
while req or request is to fetch a data from a server
*/

const blogs = (req, res) => {
    Blog.find().sort({ createdAt: -1 }).then((result) => res.json(result)).catch(err => console.log(err))
}

const about = (req, res) => {
    //code
}

const blog_details = (req, res) => {
    console.log(req.params.id)
    Blog.findById(req.params.id).then((result) => {
        res.send(result)
    }).catch(err => {
        console.log(err)
    })
}

const create_blog = (req, res) => {
    const blog = new Blog(req.body)
    blog.save().then((result) => {
        res.statusCode = 201
        res.send(result)
    }).catch(err => {
        res.statusCode =
            console.log(err)
    });
}

const delete_blog = async (req, res) => {
    const id = req.params.id;

    const deleteBlog = await Blog.findByIdAndDelete(id);

    if (!deleteBlog) {
        return res.status(404).json({ error: "Blog not found." })
    }
    res.send(deleteBlog);

    console.log("deleted!");
}

module.exports = {
    blogs,
    about,
    blog_details,
    create_blog,
    delete_blog,
}