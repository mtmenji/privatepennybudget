import { useState } from 'react'
import Goals from "../components/dashboard/Goals"
import PaymentReminders from "../components/dashboard/PaymentReminders"
import Selection from "../components/dashboard/Selection"
import PieChart from '../components/dashboard/PieChart'
import BarChart from '../components/dashboard/BarChart'
import Ratio from '../components/dashboard/Ratio'

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
        <div className='w-full flex justify-between'>
            <div>
                <Selection onSelectionChange={handleSelectionChange} />
                <hr className="border-t-4 border-dark1 rounded-2xl mx-2 my-4" />
                <PaymentReminders />
            </div>
            <div className='gallery'>
                {selectedBudgetId && <PieChart selectedBudgetId={selectedBudgetId} />}
                {selectedBudgetId && <BarChart selectedMonth={selectedMonth} selectedYear={selectedYear} selectedBudgetId={selectedBudgetId} />}
                {selectedBudgetId && <Ratio selectedMonth={selectedMonth} selectedYear={selectedYear} />}
            </div>
            <Goals/>
        </div>
    )
}

export default Dashboard