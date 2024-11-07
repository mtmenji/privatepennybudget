const express = require('express')
const router = express.Router()
const requireAuth = require('../middleware/requireAuth')

//Controller Functions
const { loginUser, registerUser, updateUser } = require('../controllers/userController')

//Login Route
router.post('/login', loginUser)

//Register Route
router.post('/register', registerUser)

//Update Account Information
router.put('/settings', requireAuth, updateUser)



module.exports = router