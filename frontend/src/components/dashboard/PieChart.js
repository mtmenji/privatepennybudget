import { useEffect, useState } from 'react';
import { useBudgetContext } from '../../hooks/useBudgetContext';

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

    return (
        <div className="m-2">
            <h2 className="text-xl font-bold text-dark1 mb-4">Budget Categories</h2>
            {categories.length > 0 ? (
                <ul className="list-none">
                    {categories.map((category) => (
                        <li key={category.name} className="mb-2 flex justify-between">
                            <span className="font-semibold">{category.name}</span>
                            <span>{category.amount}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No categories found for this budget.</p>
            )}
        </div>
    );
};

export default PieChart;