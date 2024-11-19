import { useAuthContext } from '../../hooks/useAuthContext'
import { useBudgetContext } from '../../hooks/useBudgetContext'

const BudgetListItem = ({ budget, onSelectBudget }) => {
    const { dispatch } = useBudgetContext()
    const { user } = useAuthContext()

    const handleClick = async () => {
        if (!user) {
            return
        }

        const isConfirmed = window.confirm(`Are you sure you want to delete the budget for ${budget.month} ${budget.year}?`)
        if (!isConfirmed) {
            return // If user cancels, stop here
        }

        const response = await fetch('/budgets/' + budget._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_BUDGET', payload: json})
        }
    }

    return (
        <div className='flex items-center bg-dark1 w-full'>
            <button 
                onClick={handleClick} 
                className="p-2 material-symbols-outlined hover:bg-dark2"
                aria-label="Delete Budget"
            >
                delete
            </button>
            <button 
                onClick={() => onSelectBudget(budget)} 
                className="w-full text-left p-2 bg-dark1 text-light1 hover:bg-dark2"
            >
                {budget.month} {budget.year}
            </button>
        </div>
    )
}

export default BudgetListItem