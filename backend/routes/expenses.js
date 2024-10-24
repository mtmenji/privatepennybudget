const express = require('express')
const { getExpenses, getExpense, createExpense, deleteExpense, updateExpense } = require('../controllers/expenseController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
router.use(requireAuth)

/************************************************************************
*************************************************************************
The following is example routes that include GET ALL, GET SINGLE, POST, DELETE SINGLE, and PATCH (update) routes. Update as necesary.
*************************************************************************
**************************************************************************/

            //GET all expenses.
            router.get('/', getExpenses)

            //GET a single expenses.
            router.get('/:id', getExpense)

            //POST a single expenses.
            router.post('/', createExpense)

            //DELETE a expense.
            router.delete('/:id', deleteExpense)

            //UPDATE a single expenses.
            router.patch('/', updateExpense)
/************************************************************************
*************************************************************************/




module.exports = router