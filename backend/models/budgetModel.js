const mongoose = require('mongoose')
const Schema = mongoose.Schema

const budgetSchema = new Schema({
    month: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    categories: [{
        name: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        }
    }],
    budgetedIncome: {
        type: Number
    },
    user_id: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Budget', budgetSchema)