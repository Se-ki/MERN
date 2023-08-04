const Author = require("../model/author")
const jwt = require("jsonwebtoken");

//middleware
const authorization = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ error: 'Authorization token required.' })

    const token = authorization.split(" ")[1]
    try {
        const { _id } = jwt.verify(token, process.env.SECRET)
        await Author.findOne({ _id }).select('_id')
        next();
    } catch (error) {
        res.status(400).json({ error: 'Request is not authorized.' })
    }
}

module.exports = authorization;