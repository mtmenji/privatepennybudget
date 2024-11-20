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
const deleteBudget = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such budget.'})
    }
    const budget = await Budget.findOneAndDelete({_id: id})
    if (!budget) {
        return res.status(404).json({error: 'No such budget.'})
    }
    res.status(200).json(budget)
}

//UPDATE budget.
const updateBudget = async (req, res) => {
    const { id } = req.params; // Get the budget ID from the route params
    const { month, year, categories } = req.body; // Destructure the fields from the request body
    const user_id = req.user._id; // Get the authenticated user's ID

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such budget.' });
    }

    // Build the update object dynamically based on provided fields
    const updateFields = {};
    if (month !== undefined) updateFields.month = month;
    if (year !== undefined) updateFields.year = year;
    if (categories !== undefined) updateFields.categories = categories;

    try {
        // Find the budget by ID and user ID and update it
        const budget = await Budget.findOneAndUpdate(
            { _id: id, user_id }, // Filter by ID and authenticated user
            { $set: updateFields }, // Update only the provided fields
            { new: true } // Return the updated document
        );

        // If no budget was found, return an error
        if (!budget) {
            return res.status(404).json({ error: 'No such budget.' });
        }

        // Return the updated budget
        res.status(200).json(budget);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//Export
module.exports = {
    getBudgets,
    createBudget,
    deleteBudget,
    updateBudget
}