const Author = require('../model/author');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const validator = require('validator');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" })
}

//login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const author = await Author.findOne({ email })
        //check if user is signup
        if (!author) {
            res.status(400).json({ error: 'You have not registered yet.' })
            return
        };
        const userInputType = password;
        const storedHashPassword = author.password
        const match = await bcrypt.compare(userInputType, storedHashPassword)
        if (!match) {
            res.status(400).json({ error: "Incorrect Password." })
            return;
        }
        const token = createToken(author._id);
        res.status(200).json({ email, fullname: author.fullname, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//signup
const signup = async (req, res) => {
    try {
        const { fullname, email, password } = req.body
        const isEmailAlreadyExist = await Author.findOne({ email })
        if (isEmailAlreadyExist) throw Error('Email is already used.');
        if (!validator.isEmail(email)) throw Error("Email is not valid")
        if (!validator.isStrongPassword(password)) throw Error('Weak Password. Easy to hack!')
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt)
        await Author.create({ fullname, email, password: hash })
        res.status(200).json({ msg: "Done Created. You can now login." })
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

module.exports = { login, signup }