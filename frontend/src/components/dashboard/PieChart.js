import { useEffect, useState } from 'react';
import { useBudgetContext } from '../../hooks/useBudgetContext';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, ArcElement, Title, CategoryScale } from 'chart.js'

ChartJS.register(Tooltip, Legend, ArcElement, Title, CategoryScale)

const PieChart = ({ selectedBudgetId }) => {
    const { budgets } = useBudgetContext();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (selectedBudgetId) {
            const selectedBudget = budgets.find(budget => budget._id === selectedBudgetId);
            if (selectedBudget && selectedBudget.categories) {
                setCategories(selectedBudget.categories);
            }
        }
    }, [selectedBudgetId, budgets]);

    const totalAmount = categories.reduce((total, category) => total + category.amount, 0)
    const colors = categories.map(() => `hsl(${Math.random() * 360}, 100%, 70%)`)

    //Data Prep for Chart
    const data = {
        labels: categories.map(category => category.name),
        datasets: [
            {
                label: 'Budget Categories',
                data: categories.map(category => category.amount),
                backgroundColor: colors,
                borderWidth: 1,
            },
        ],
    };

    //Tooltip
    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const categoryName = context.label;
                        const categoryAmount = context.raw;
                        const categoryPercentage = ((categoryAmount / totalAmount) * 100).toFixed(2);
                        return `${categoryName}: $${categoryAmount} (${categoryPercentage}%)`;
                    },
                },
            },
        },
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        }
    }

    return (
        <div className="m-2 overflow-y-auto h-[calc(100vh-96px)]">
            <h2 className="text-xl font-bold text-dark1 mb-4 text-center">Budget Categories</h2>
            {categories.length > 0 ? (
                <div className='p-2'>
                    <p className='text-center text-sm mb-2'>A visual breakdown of your budgeted categories.</p>
                    <Pie data={data} options={options}/>
                    <ul className="list-none mt-4">
                        {categories.map((category, index) => (
                            <li key={category.name} className="mb-2 flex justify-between text-sm">
                                <div
                                    className="w-4 h-4 mr-2 rounded-md"
                                    style={{ backgroundColor: colors[index] }}
                                ></div>
                                <span className="font-semibold">{category.name}</span>
                                <span>${category.amount}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No categories found for this budget.</p>
            )}
        </div>
    );
};

export default PieChart;