const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

//Static Register Method
userSchema.statics.register = async function (email, password) {

    //Validation: Is the email or password missing?
    if (!email || !password) {
        throw Error('All fields must be filled.')
    }
    //Validation: Is the email valid?
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid.')
    }
    //Validation: Does the email exist on the database already?
    const emailExists = await this.findOne({ email })
    if (emailExists) {
        throw Error('Email already in use.')
    }
    //Validation: Is the password strong?
    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough.')
    }

    //Hash password.
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    //Create user.
    const user = await this.create({ email, password: hash})
    return user
}

//Static Login Method
userSchema.statics.login = async function(email, password) {
    //Validation: Did the user enter a email and password?
    if (!email || !password) {
        throw Error('All fields must be filled.')
    }

    //Find the user with this email.
    const user = await this.findOne({ email })
    if (!user) {
        throw Error('Incorrect Email')
    }

    //If password is correct, proceed with login.
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Incorrect Password')
    }
    return user
}

module.exports = mongoose.model('User', userSchema)