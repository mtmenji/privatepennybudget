const Budget = require('../models/budgetModel')
const mongoose = require('mongoose')

//GET ALL budgets.


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
    createBudget
}