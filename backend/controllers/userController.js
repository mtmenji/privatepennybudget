const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

// JWT Creation
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d'})
}

// Login User
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.status(200).json({ email, token, theme: user.theme })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Sign Up User
const registerUser = async (req, res) => {
    const {email, password, nickname, theme} = req.body

    try {
        const user = await User.register(email, password, nickname, theme)
        const token = createToken(user._id)
        res.status(200).json({ email, theme, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Update Account Settings
const updateUser = async (req, res) => {

    const {email, password, nickname, theme} = req.body
    const userId = req.user._id

    try {
        const user = await User.findById(userId)
        await user.update(email, password, nickname, theme)

        const token = createToken(user._id)
        return res.status(200).json({email: user.email, theme: user.theme, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Delete Account
const deleteUser = async (req, res) => {
    const { password } = req.body
    const userId = req.user._id

    try {
        const user = await User.findById(userId)
        const response = await user.deleteUser(password)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { loginUser, registerUser, updateUser, deleteUser }