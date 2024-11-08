const express = require('express')
const { createBudget, getBudgets, deleteBudget } = require('../controllers/budgetController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
router.use(requireAuth)

//GET all budgets.
router.get('/', getBudgets)

//GET a single budgets.

//POST a single budget.
router.post('/', createBudget)

//DELETE a budget.
router.delete('/:id', deleteBudget)
//UPDATE a single budget.



module.exports = router