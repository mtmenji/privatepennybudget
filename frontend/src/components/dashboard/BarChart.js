import { useEffect, useState } from 'react';
import { useBudgetContext } from '../../hooks/useBudgetContext';
import { useTransactionsContext } from '../../hooks/useTransactionsContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, BarElement, Title, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Tooltip, Legend, BarElement, Title, CategoryScale, LinearScale);

const BarChart = ({ selectedBudgetId, selectedMonth, selectedYear }) => {
    const { budgets } = useBudgetContext();
    const { transactions } = useTransactionsContext();
    const [categories, setCategories] = useState([]);
    const {user} = useAuthContext()
    const [transactions1, setTransactions1] = useState(null); // or []

    const selectedMonthNumber = (selectedMonth) => {
        const monthMap = {
            January: 1, February: 2, March: 3, April: 4, May: 5, June: 6,
            July: 7, August: 8, September: 9, October: 10, November: 11, December: 12,
        };
        return monthMap[selectedMonth] || 0; // Default to 0 for invalid month names
    };


    useEffect(() => {
        if (selectedBudgetId) {
            const selectedBudget = budgets.find(budget => budget._id === selectedBudgetId);
            console.log(`Test ID: ${selectedBudgetId}`)
            if (selectedBudget && selectedBudget.categories) {
                setCategories(selectedBudget.categories);
            }
        }
    }, [selectedBudgetId, budgets]);

    // Filter transactions based on selected month and year
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch('/transactions', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                const data = await response.json();
                setTransactions1(data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };
        fetchTransactions();
    }, []);

    if (!transactions1) {
        return <p>Loading transactions...</p>;
    }


    const getFilteredTransactions = () => {

        if (!transactions1 || !Array.isArray(transactions1)) {
            console.error("Invalid transactions data");
            return console.log(`FAIL: ${transactions1}`);
        }

        return transactions1.filter(transaction => {
            const transactionDate = new Date(transaction.date);
            return transactionDate.getMonth() + 1 === parseInt(selectedMonthNumber(selectedMonth)) && transactionDate.getFullYear() === parseInt(selectedYear);
        });
    };

    // Aggregate transactions for each category
    const getSpentAmount = (categoryName) => {
        const filteredTransactions = getFilteredTransactions();
        console.log(`Test 989: ${categoryName}`)
        return filteredTransactions
            .filter(transaction => {
                console.log(`Test 6 --- Transaction: ${transaction.category} and Cat: ${categoryName}`)
                return transaction.category === categoryName
            })
            .reduce((total, transaction) => total + transaction.value, 0);
    };

    // Data preparation for the bar chart
    const data = {
        labels: categories.map(category => category.name),
        datasets: [
            {
                label: 'Percentage of Budget Spent',
                data: categories.map(category => {
                    const spentAmount = getSpentAmount(category.name);
                    const percentage = category.amount > 0 ? (spentAmount / category.amount) * 100 : 0;
                    console.log(`Category: ${category.name}`)
                    console.log(`Budgeted: ${category.amount}`)
                    console.log(`Spent: ${spentAmount}`)
                    console.log(`Percent: ${percentage}`)
                    return percentage;
                }),
                backgroundColor: categories.map(() => `hsl(${Math.random() * 360}, 100%, 70%)`),
                borderColor: 'rgba(0, 0, 0, 0.1)',
                borderWidth: 1,
            },
        ],
    };

    // Chart options
    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const categoryName = context.label;
                        const percentageSpent = context.raw.toFixed(2);
                        return `${categoryName}: ${percentageSpent}% of Budget`;
                    },
                },
            },
        },
        scales: {
            y: {
                min: 0,
                max: 100,
                ticks: {
                    stepSize: 10,
                    callback: function (value) {
                        return `${value}%`;
                    },
                },
            },
        },
    };

    return (
        <div className="m-2 overflow-y-auto h-[calc(100vh-96px)]">
            <h2 className="text-xl font-bold text-dark1 mb-4">Budget Category Spending</h2>
            {categories.length > 0 ? (
                <div>
                    <Bar data={data} options={options} />
                    <ul className="list-none mt-4">
                        {categories.map((category, index) => {
                            const spentAmount = getSpentAmount(category.name);
                            const percentageSpent = (category.amount > 0 ? (spentAmount / category.amount) * 100 : 0).toFixed(2);
                            return (
                                <li key={category.name} className="mb-2 flex justify-between text-sm">
                                    <div
                                        className="w-4 h-4 mr-2 rounded-md"
                                        style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}
                                    ></div>
                                    <span className="font-semibold">{category.name}</span>
                                    <span>{spentAmount} / {category.amount} ({percentageSpent}%)</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ) : (
                <p>No categories found for this budget.</p>
            )}
        </div>
    );
};

export default BarChart;
