import { useTransactionsContext } from '../hooks/useTransactionsContext'
import { useAuthContext } from '../hooks/useAuthContext'

const TransactionDetails = ({ transaction }) => {
    const { dispatch } = useTransactionsContext()
    const { user } = useAuthContext()

    const handleClick = async () => {
        if (!user) {
            return
        }

        const response = await fetch('/transactions/' + transaction._id, {
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
            <h4>{transaction.title}</h4>
            <p><strong>Date: </strong>{transaction.date}</p>
            <p><strong>Category </strong>{transaction.category}</p>
            <p><strong>Sub-Category </strong>{transaction.subcategory}</p>
            <p><strong>Value </strong>{transaction.value}</p>
            <p>{transaction.createdAt}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default TransactionDetails