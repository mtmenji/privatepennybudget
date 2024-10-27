const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subcategory: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        require: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Transaction', transactionSchema)