const express = require('express')
const router = express.Router()

//Controller Functions
const { loginUser, registerUser } = require('../controllers/userController')

//Login Route
router.post('/login', loginUser)


//Register Route
router.post('/register', registerUser)





module.exports = router