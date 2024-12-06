import { useState } from 'react'
import Goals from "../components/dashboard/Goals"
import PaymentReminders from "../components/dashboard/PaymentReminders"
import Selection from "../components/dashboard/Selection"
import Gallery from '../components/dashboard/Gallery'

const Dashboard = () => {

    const [selectedBudgetId, setSelectedBudgetId] = useState('');
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [selectedYear, setSelectedYear] = useState(null);

    const handleSelectionChange = (budgetId, month, year) => {
        setSelectedBudgetId(budgetId);
        setSelectedMonth(month);
        setSelectedYear(year);
    };

    return (
        <div className='w-full flex'>
            <div className='w-4/12'>
                <Selection onSelectionChange={handleSelectionChange} />
                <hr className="border-t-4 border-dark1 rounded-2xl mx-2 my-4" />
                <PaymentReminders/>
            </div>
            <div className='w-5/12 flex justify-center items-center'>
                {selectedBudgetId ? (
                    <Gallery selectedBudgetId={selectedBudgetId} selectedMonth={selectedMonth} selectedYear={selectedYear} />
                ) : (
                    <p>Please select a budget to view your reports.</p>
                )}
            </div>
            <div className='w-3/12'>
                <Goals/>
            </div>
        </div>
    )
}

export default Dashboard