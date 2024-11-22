import { useEffect } from 'react'
import { useTransactionsContext } from '../hooks/useTransactionsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import TransactionDetails from '../components/transactions/TransactionDetails'
import TransactionForm from '../components/transactions/TransactionForm'

const Transactions = () => {

    const {transactions, dispatch} = useTransactionsContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchTransactions = async () => {
            const response = await fetch('/transactions', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_EXPENSES', payload: json})
            }
        }

        if (user) {
            fetchTransactions()
        }
    }, [dispatch, user])

    return (
        <div className='flex flex-col w-full'>
            <h2>Transactions</h2>
            <TransactionForm />
            <hr className='border-t-2 border-dark1 mt-2'/>
            <div className='w-full px-4'>
                <div className='grid grid-cols-12 items-center w-full my-2 font-bold'>
                    <p className='col-span-1'>Date</p>
                    <p className='col-span-3'>Title</p>
                    <p className='col-span-3'>Category</p>
                    <p className='col-span-3'>Note</p>
                    <p className='col-span-1'>Value</p>
                    <span className="col-span-1"></span>
                </div>
                {transactions && transactions.map((transaction) => (
                    <TransactionDetails key={transaction._id} transaction={transaction} />
                ))}
            </div>
        </div>
    )
}

export default Transactions