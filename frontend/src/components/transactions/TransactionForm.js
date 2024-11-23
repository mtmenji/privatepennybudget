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
        <div>
            <h1 className="text-center font-bold text-bodytext">Create a Transaction</h1>
            <form onSubmit={handleSubmit} className="flex flex-wrap items-center justify-around gap-4 mt-2">
                <input
                    type="date"
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                    className={`p-1 border text-center rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-dark1 ${
                        emptyFields.includes('date') ? 'border-warningcolor' : 'border-light3'
                    }`}
                />

                <input
                    type="text"
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    className={`p-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-dark1 ${
                        emptyFields.includes('title') ? 'border-warningcolor' : 'border-light3'
                    }`}
                />

                <input
                    type="text"
                    placeholder="Category"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                    className={`p-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-dark1 ${
                        emptyFields.includes('category') ? 'border-warningcolor' : 'border-light3'
                    }`}
                />

                <input
                    type="text"
                    placeholder="Note"
                    onChange={(e) => setNote(e.target.value)}
                    value={note}
                    className={`p-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-dark1 ${
                        emptyFields.includes('note') ? 'border-warningcolor' : 'border-light3'
                    }`}
                />

                <div className="flex items-center">
                    <p className="mr-2">$</p>
                    <input
                        type="number"
                        placeholder="0"
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
                        className={`p-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-dark1 ${
                            emptyFields.includes('value') ? 'border-warningcolor' : 'border-light3'
                        }`}
                    />
                </div>

                <button className="material-symbols-outlined border border-dark1 rounded-md bg-dark1 text-light1 font-bold">
                    add
                </button>

                {error && <div className="text-warningcolor">{error}</div>}
            </form>
        </div>
    )
}

export default TransactionForm