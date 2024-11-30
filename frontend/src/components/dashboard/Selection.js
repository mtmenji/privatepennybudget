import { useEffect } from 'react';
import { useBudgetContext } from '../../hooks/useBudgetContext';
import { useAuthContext } from '../../hooks/useAuthContext';

const Selection = ({ setSelectedBudgetId }) => {
    const { budgets, dispatch } = useBudgetContext();
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchBudgets = async () => {
            const response = await fetch('/budgets', {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            const json = await response.json();

            if (response.ok) {
                dispatch({ type: 'SET_BUDGETS', payload: json });
            }
        };

        if (user) {
            fetchBudgets();
        }
    }, [dispatch, user]);

    const getMonthNumber = (month) => {
        const monthMap = {
            January: 1, February: 2, March: 3, April: 4, May: 5, June: 6,
            July: 7, August: 8, September: 9, October: 10, November: 11, December: 12,
        };
        return monthMap[month] || 0; // Default to 0 for invalid month names
    };

    const sortedBudgets = budgets
        ? [...budgets].sort((a, b) => {
              if (b.year !== a.year) {
                  return b.year - a.year;
              }
              return getMonthNumber(b.month) - getMonthNumber(a.month);
          })
        : [];

    return (
        <div className='m-2'>
            <label htmlFor="budget-select" className="block text-xl font-bold mb-4 text-dark1 text-center">
                Month Selection
            </label>
            <select
                id="budget-select"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={(e) => setSelectedBudgetId(e.target.value)}
            >
                <option value="">-- Select Month --</option>
                {sortedBudgets.map((budget) => (
                    <option key={budget._id} value={budget._id}>
                        {`${budget.month} ${budget.year}`}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Selection;