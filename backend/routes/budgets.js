const express = require('express')
const { createBudget } = require('../controllers/budgetController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
router.use(requireAuth)

//GET all budgets.
router.get('/', createBudget)

//GET a single budgets.

//POST a single budget.
router.post('/', createBudget)

//DELETE a budget.

//UPDATE a single budget.



module.exports = router