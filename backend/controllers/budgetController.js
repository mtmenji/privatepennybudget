const Budget = require('../models/budgetModel')
const mongoose = require('mongoose')

//GET ALL budgets.
const getBudgets = async (req, res) => {
    const user_id = req.user._id
    const budget = await Budget.find({ user_id }).sort({createdAt: -1})
    res.status(200).json(budget)
}

//GET SINGLE budget.


//CREATE budget.
const createBudget = async (req, res) => {
    const {month, year, categories} = req.body

    let emptyFields = []
    if(!month) {
        emptyFields.push('month')
    }
    if (!year) {
        emptyFields.push('year')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please enter a month and year.', emptyFields})
    }

    try {
        const user_id = req.user._id
        const budget = await Budget.create({month, year, categories, user_id})
        
        res.status(200).json(budget)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//DELETE budget.


//UPDATE budget.


//Export
module.exports = {
    getBudgets,
    createBudget
}