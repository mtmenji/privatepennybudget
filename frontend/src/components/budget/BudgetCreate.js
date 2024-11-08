import { useState } from 'react';

const BudgetCreate = ({ onCancel }) => {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [useCategories, setUseCategories] = useState(null);
  const [copyAmounts, setCopyAmounts] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState('');

  const handleCancel = () => {
    setMonth('')
    setYear('')
    setUseCategories(null)
    setCopyAmounts(null)
    setSelectedBudget('')
    onCancel()
  }

  return (
    <form className="w-full max-w-3xl p-6 bg-light3 rounded-lg shadow-2xl">
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
            {["January 2022", "February 2022", "March 2022"].map((budget) => (
              <option key={budget} value={budget}>{budget}</option>
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
      <button type="button" className="w-full mt-4 bg-button hover:bg-buttonhover text-white p-2 rounded-md">
        Create
      </button>
      <button
        type="button"
        onClick={handleCancel}
        className="w-full mt-2 bg-light1 border border-gray-300 text-dark1 p-2 rounded-md"
      >
        Cancel
      </button>
    </form>
  );
}

export default BudgetCreate;