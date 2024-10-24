const Expense = require('../models/expenseModel')
const mongoose = require('mongoose')

//GET ALL expenses.
const getExpenses = async (req, res) => {
    const user_id = req.user._id
    const expenses = await Expense.find({ user_id }).sort({createdAt: -1}) //-1 means descending order.
    res.status(200).json(expenses)
}

//GET SINGLE expense.
const getExpense = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such expense.'})
    }
    const expense = await Expense.findById(id)
    if (!expense) {
        return res.status(404).json({error: 'No such workout.'})
    }
    res.status(200).json(expense)
}

//CREATE expense.
const createExpense = async (req, res) => {
    const {date, title, category, subcategory, value} = req.body

    let emptyFields = []
    if(!title) {
        emptyFields.push('title')
    }
    if (!date) {
        emptyFields.push('date')
    }
    if (!category) {
        emptyFields.push('category')
    }
    if (!value) {
        emptyFields.push('value')
    }
    if (!subcategory) {
        emptyFields.push('subcategory')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields.', emptyFields})
    }

    try {
        const user_id = req.user._id
        const expense = await Expense.create({date, title, category, subcategory, value, user_id})
        
        res.status(200).json(expense)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//DELETE expense.
const deleteExpense = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such expense.'})
    }
    const expense = await Expense.findOneAndDelete({_id: id})
    if (!expense) {
        return res.status(404).json({error: 'No such expense.'})
    }
    res.status(200).json(expense)
}

//UPDATE expense.
const updateExpense = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such expense.'})
    }
    const expense = await Expense.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    if (!expense) {
        return res.status(404).json({error: 'No such expense.'})
    }
    res.status(200).json(expense)
}

//Export
module.exports = {
    getExpenses,
    getExpense,
    createExpense,
    deleteExpense,
    updateExpense
}