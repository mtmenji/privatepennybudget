import '../index.css'
import { useState } from "react"
import { useTransactionsContext } from '../hooks/useTransactionsContext'
import { useAuthContext } from '../hooks/useAuthContext'

const TransactionForm = () => {

    const { dispatch } = useTransactionsContext()
    const { user } = useAuthContext()

    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [category, setCategory] = useState('')
    const [subcategory, setSubcategory] = useState('')
    const [value, setValue] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in.')
            return
        }

        const transaction = {title, date, category, subcategory, value}
        const response = await fetch('/transactions', {
            method: 'POST',
            body: JSON.stringify(transaction),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if (response.ok) {
            setTitle('')
            setDate('')
            setCategory('')
            setSubcategory('')
            setValue('')
            setError(null)
            setEmptyFields([])
            console.log('New Transaction Added', json)
            dispatch({type: 'CREATE_EXPENSE', payload: json})
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Add a New Transaction</h3>

            <label>Transaction Title:</label>
            <input
                type='text'
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Date:</label>
            <input
                type='date'
                onChange={(e) => setDate(e.target.value)}
                value={date}
                className={emptyFields.includes('date') ? 'error' : ''}
            />

            <label>Category:</label>
            <input
                type='text'
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className={emptyFields.includes('category') ? 'error' : ''}
            />

            <label>Sub-Category:</label>
            <input
                type='text'
                onChange={(e) => setSubcategory(e.target.value)}
                value={subcategory}
                className={emptyFields.includes('subcategory') ? 'error' : ''}
            />

            <label>Value:</label>
            <input
                type='number'
                onChange={(e) => setValue(e.target.value)}
                value={value}
                className={emptyFields.includes('value') ? 'error' : ''}
            />

            <button>Add Transaction</button>
            {error && <div>{error}</div>}
        </form>
    )
}

export default TransactionForm