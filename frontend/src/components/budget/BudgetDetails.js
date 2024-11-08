import { useAuthContext } from '../../hooks/useAuthContext'
import { useBudgetContext } from '../../hooks/useBudgetContext'

const BudgetDetails = ({ budget }) => {
    const { dispatch } = useBudgetContext
    const { user } = useAuthContext

    const handleClick = async () => {
        if (!user) {
            return
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
        <div>
            <h4>{budget.month} {budget.year}</h4>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default BudgetDetails