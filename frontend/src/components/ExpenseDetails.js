import { useExpensesContext } from '../hooks/useExpensesContext'
import { useAuthContext } from '../hooks/useAuthContext'

const ExpenseDetails = ({ expense }) => {
    const { dispatch } = useExpensesContext()
    const { user } = useAuthContext()

    const handleClick = async () => {
        if (!user) {
            return
        }

        const response = await fetch('/expenses/' + expense._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_EXPENSE', payload: json})
        }
    }

    return (
        <div>
            <h4>{expense.title}</h4>
            <p><strong>Date: </strong>{expense.date}</p>
            <p><strong>Category </strong>{expense.category}</p>
            <p><strong>Sub-Category </strong>{expense.subcategory}</p>
            <p><strong>Value </strong>{expense.value}</p>
            <p>{expense.createdAt}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default ExpenseDetails