import { useEffect } from 'react'
import { useBudgetContext } from '../../hooks/useBudgetContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import BudgetListItem from "./BudgetListItem"


const BudgetList = ({ onCreateClick, onSelectBudget }) => {

    const {budgets, dispatch} = useBudgetContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchBudgets = async () => {
            const response = await fetch('/budgets', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_BUDGETS', payload: json})
            }
        }

        if (user) {
            fetchBudgets()
        }
    }, [dispatch, user])

    return (
        <div className='h-full w-full'>
            <h1>Monthly Budgets List</h1>
            <button 
                onClick={onCreateClick} 
                className="mt-4 bg-button text-white p-2 rounded-md hover:bg-buttonhover"
            >
                Create Budget
            </button>
            <div>
                {budgets && budgets.map((budget) => (
                    <BudgetListItem key={budget._id} budget={budget} onSelectBudget={onSelectBudget}/>
                ))}
            </div>
        </div>
    )

}

export default BudgetList