import { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';

const GoalsCreate = () => {
  const { user } = useAuthContext();
  const [name, setName] = useState('');
  const [amountGoal, setAmountGoal] = useState('');
  const [amountActual, setAmountActual] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in.');
      return;
    }

    const saving = { name, amountGoal, amountActual };

    const response = await fetch('/goals', {
      method: 'POST',
      body: JSON.stringify(saving),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    } else {
      setName('');
      setAmountGoal('');
      setAmountActual('');
      setError(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl p-6 bg-light3 rounded-lg shadow-2xl">
      <h3 className="text-xl font-bold mb-4 text-dark1">Create a New Savings Goal</h3>

      {/* Savings Name */}
      <label className="block text-dark1 mb-2">Savings Name:</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className="w-full p-2 border border-gray-300 rounded-md bg-light1"
        placeholder="Enter Savings Name"
        required
      />

      {/* Savings Amount */}
      <label className="block text-dark1 mb-2 mt-4">Target Amount:</label>
      <input
        type="number"
        onChange={(e) => setAmountGoal(e.target.value)}
        value={amountGoal}
        className="w-full p-2 border border-gray-300 rounded-md bg-light1"
        placeholder="Enter Amount"
        required
      />

      {/* Starting Amount */}
      <label className="block text-dark1 mb-2 mt-4">Starting Amount:</label>
      <input
        type="number"
        onChange={(e) => setAmountActual(e.target.value)}
        value={amountActual}
        className="w-full p-2 border border-gray-300 rounded-md bg-light1"
        placeholder="Enter Amount"
        required
      />

      {/* Button */}
      <button type="submit" className="w-full mt-4 bg-button hover:bg-buttonhover text-white p-2 rounded-md">
        Create
      </button>
      {error && <div className="error text-red-500 mt-2">{error}</div>}
    </form>
  );
};

export default GoalsCreate;
