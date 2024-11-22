import '../../index.css'
import { useState } from "react"
import { useTransactionsContext } from '../../hooks/useTransactionsContext'
import { useAuthContext } from '../../hooks/useAuthContext'

const TransactionForm = () => {

    const { dispatch } = useTransactionsContext()
    const { user } = useAuthContext()

    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [category, setCategory] = useState('')
    const [note, setNote] = useState('')
    const [value, setValue] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in.')
            return
        }

        const transaction = {title, date, category, note, value}
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
            setEmptyFields(json.emptyFields || [])
        }

        if (response.ok) {
            setTitle('')
            setDate('')
            setCategory('')
            setNote('')
            setValue('')
            setError(null)
            setEmptyFields([])
            console.log('New Transaction Added', json)
            dispatch({type: 'CREATE_EXPENSE', payload: json})
        }
    }

    return (
        <form onSubmit={handleSubmit} className='flex justify-around'>
            <input
                type='date'
                onChange={(e) => setDate(e.target.value)}
                value={date}
                className={emptyFields.includes('date') ? 'error' : ''}
            />

            <input
                type='text'
                placeholder='Title'
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <input
                type='text'
                placeholder='Category'
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className={emptyFields.includes('category') ? 'error' : ''}
            />

            <input
                type='text'
                placeholder='Note'
                onChange={(e) => setNote(e.target.value)}
                value={note}
                className={emptyFields.includes('note') ? 'error' : ''}
            />

            <div className='flex flex-row'>
                <p>$</p>
                <input
                    type='number'
                    placeholder='0'
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    className={emptyFields.includes('value') ? 'error' : ''}
                />
            </div>

            <button className='material-symbols-outlined'>add</button>
            {error && <div>{error}</div>}
        </form>
    )
}

export default TransactionForm