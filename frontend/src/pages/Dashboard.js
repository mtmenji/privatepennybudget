import { useState } from 'react'
import Goals from "../components/dashboard/Goals"
import PaymentReminders from "../components/dashboard/PaymentReminders"
import Selection from "../components/dashboard/Selection"
import PieChart from '../components/dashboard/PieChart'

const Dashboard = () => {

    const [selectedBudgetId, setSelectedBudgetId] = useState('');

    return (
        <div className='w-full flex justify-between'>
            <div>
                <Selection setSelectedBudgetId={setSelectedBudgetId} />
                <hr className="border-t-4 border-dark1 rounded-2xl mx-2 my-4" />
                <PaymentReminders />
            </div>
            {selectedBudgetId && <PieChart selectedBudgetId={selectedBudgetId} />}
            <Goals/>
        </div>
    )
}

export default Dashboard