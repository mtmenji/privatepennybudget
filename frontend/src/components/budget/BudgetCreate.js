import { useState, useEffect } from 'react';
import { useBudgetContext } from '../../hooks/useBudgetContext';
import { useAuthContext } from '../../hooks/useAuthContext';

const BudgetCreate = ({ onCancel }) => {
  const { dispatch } = useBudgetContext();
  const { user } = useAuthContext();
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [categories, setCategories] = useState([]);
  const [useCategories, setUseCategories] = useState(null);
  const [copyAmounts, setCopyAmounts] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState('');
  const [availableBudgets, setAvailableBudgets] = useState([]);
  const [budgetedIncome, setBudgetedIncome] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (useCategories && user) {
      const fetchBudgets = async () => {
        try {
          const response = await fetch('http://localhost:4001/budgets', {
          // const response = await fetch('https://budgetbuddy-backend-hhs9.onrender.com/budgets', {
            headers: {
              'Authorization': `Bearer ${user.token}`,
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch budgets');
          }

          const budgets = await response.json();
          setAvailableBudgets(budgets);
        } catch (err) {
          setError(err.message);
        }
      };

      fetchBudgets();
    }
  }, [useCategories, user]);

  useEffect(() => {
    if (selectedBudget && user) {
      const fetchBudgetDetails = async () => {
        try {
          console.log(`TEST 101: ${selectedBudget}`)
          const response = await fetch(`http://localhost:4001/budgets/${selectedBudget}`, {
          // const response = await fetch(`https://budgetbuddy-backend-hhs9.onrender.com/budgets/${selectedBudget}`, {
            headers: {
              'Authorization': `Bearer ${user.token}`,
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch budget details');
          }

          const budget = await response.json();
          const copiedCategories = budget.categories.map((category) => ({
            name: category.name,
            amount: copyAmounts ? category.amount : 0,
          }));
          setCategories(copiedCategories);
        } catch (err) {
          setError(err.message);
        }
      };

      fetchBudgetDetails();
    }
  }, [selectedBudget, copyAmounts, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
        setError('You must be logged in.');
        return;
    }

    const budget = { month, year, categories, budgetedIncome };

    const response = await fetch('/budgets', {
        method: 'POST',
        body: JSON.stringify(budget),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        }
    });

    const json = await response.json();

    if (!response.ok) {
        setError(json.error);
    } else {
        setMonth('');
        setYear('');
        setUseCategories(null);
        setCopyAmounts(null);
        setSelectedBudget('');
        setBudgetedIncome('');
        setCategories([]);
        setError(null);
        dispatch({ type: 'CREATE_BUDGET', payload: json });
        onCancel();
    }
  }

  const handleCancel = () => {
    setMonth('')
    setYear('')
    setUseCategories(null)
    setCopyAmounts(null)
    setSelectedBudget('')
    setCategories([])
    setBudgetedIncome('')
    onCancel()
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl p-6 bg-light3 rounded-lg shadow-2xl">
      <h3 className="text-xl font-bold mb-4 text-dark1">Create a New Budget</h3>

      {/* Select Month and Year */}
      <label className="block text-dark1 mb-2">Select Month and Year:</label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <select
          onChange={(e) => setMonth(e.target.value)}
          value={month}
          className="w-full p-2 border border-gray-300 rounded-md bg-light1"
          required
        >
          <option value="" disabled>Select Month</option>
          {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            .map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
        </select>
        <input
          type="number"
          onChange={(e) => setYear(e.target.value)}
          value={year}
          className="w-full p-2 border border-gray-300 rounded-md bg-light1"
          placeholder="Enter Year"
          required
        />
      </div>

      {/* Select a Budgeted Income */}
      <label className="block text-dark1 mb-2">What is your expected income?</label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <input
          type="number"
          onChange={(e) => setBudgetedIncome(e.target.value)}
          value={budgetedIncome}
          className="w-full p-2 border border-gray-300 rounded-md bg-light1"
          placeholder="Enter Income"
          required
        />
      </div>

      {/* Use Categories from Another Month */}
      <label className="block text-dark1 mb-2">Would you like to use the same categories as another month?</label>
      <div className="flex gap-4 mb-4">
        <button
          type="button"
          onClick={() => setUseCategories(true)}
          className={`w-full p-2 rounded-md ${useCategories ? 'bg-button text-white' : 'bg-light1 border border-gray-300 text-dark1'}`}
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => setUseCategories(false)}
          className={`w-full p-2 rounded-md ${useCategories === false ? 'bg-button text-white' : 'bg-light1 border border-gray-300 text-dark1'}`}
        >
          No
        </button>
      </div>

      {/* Select Previous Budget (Conditional) */}
      {useCategories && (
        <>
          <label className="block text-dark1 mb-2">Select a previous budget:</label>
          <select
            onChange={(e) => setSelectedBudget(e.target.value)}
            value={selectedBudget}
            className="w-full p-2 border border-gray-300 rounded-md mb-4 bg-light1"
            required
          >
            <option value="" disabled>Select Budget</option>
            {availableBudgets.map(({ month, year, _id }) => (
              <option key={_id} value={_id}>
                {`${month} ${year}`}
              </option>
            ))}
          </select>

          {/* Copy Budgeted Amounts (Conditional) */}
          <label className="block text-dark1 mb-2">
            Would you like to use the same budgeted amounts from the copied categories? These can be edited later.
          </label>
          <div className="flex gap-4 mb-4">
            <button
              type="button"
              onClick={() => setCopyAmounts(true)}
              className={`w-full p-2 rounded-md ${copyAmounts ? 'bg-button text-white' : 'bg-light1 border border-gray-300 text-dark1'}`}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => setCopyAmounts(false)}
              className={`w-full p-2 rounded-md ${copyAmounts === false ? 'bg-button text-white' : 'bg-light1 border border-gray-300 text-dark1'}`}
            >
              No
            </button>
          </div>
        </>
      )}

      {/* Create Button */}
      <button type="submit" className="w-full mt-4 bg-button hover:bg-buttonhover text-white p-2 rounded-md">
        Create
      </button>
      <button
        type="button"
        onClick={handleCancel}
        className="w-full mt-2 bg-light1 border border-gray-300 text-dark1 p-2 rounded-md"
      >
        Cancel
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default BudgetCreate;