import { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';

const GoalsDetails = () => {
  const { user } = useAuthContext();
  const [goals, setGoals] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingGoalId, setEditingGoalId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editAmount, setEditAmount] = useState('');

  // Fetch goals
  useEffect(() => {
    const fetchGoals = async () => {
      if (!user) {
        setError('You must be logged in.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/goals', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const json = await response.json();

        if (!response.ok) {
          setError(json.error || 'Failed to fetch goals.');
        } else {
          setGoals(json);
        }
      } catch (err) {
        setError('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, [user]);

  // Handle delete
  const handleDelete = async (id) => {
    if (!user) {
      setError('You must be logged in.');
      return;
    }

    try {
      const response = await fetch(`/goals/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        const json = await response.json();
        setError(json.error || 'Failed to delete goal.');
        return;
      }

      setGoals((prevGoals) => prevGoals.filter((goal) => goal._id !== id));
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  // Handle edit
  const handleEdit = (id, name, amountGoal) => {
    setEditingGoalId(id);
    setEditName(name);
    setEditAmount(amountGoal);
  };

  const handleSaveEdit = async () => {
    if (!user) {
      setError('You must be logged in.');
      return;
    }

    const updatedGoal = { name: editName, amountGoal: editAmount };

    try {
      const response = await fetch(`/goals/${editingGoalId}`, {
        method: 'PUT',
        body: JSON.stringify(updatedGoal),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error || 'Failed to update goal.');
        return;
      }

      setGoals((prevGoals) =>
        prevGoals.map((goal) =>
          goal._id === editingGoalId ? { ...goal, ...updatedGoal } : goal
        )
      );

      setEditingGoalId(null);
      setEditName('');
      setEditAmount('');
      setError(null);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading goals...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="w-full max-w-3xl p-6 bg-light3 rounded-lg shadow-2xl">
      <h3 className="text-xl font-bold mb-4 text-dark1">Your Savings Goals</h3>
      {goals.length === 0 ? (
        <p className="text-gray-600">No goals found. Start by creating a new goal.</p>
      ) : (
        <ul className="space-y-4">
            {goals.map((goal) => (
            <li key={goal._id} className="flex flex-col bg-light1 p-4 rounded-md shadow space-y-2">
                <div className="flex items-center justify-between">
                {editingGoalId === goal._id ? (
                    <div className="flex-grow">
                    <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="number"
                        value={editAmount}
                        onChange={(e) => setEditAmount(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    </div>
                ) : (
                    <span className="flex-grow">
                    <span className="font-bold">{goal.name}:</span> Goal: ${goal.amountGoal} Saved: ${goal.amountActual}
                    </span>
                )}

                {editingGoalId === goal._id ? (
                    <button
                    onClick={handleSaveEdit}
                    className="bg-green-500 text-white px-4 py-2 rounded-md ml-4"
                    >
                    Save
                    </button>
                ) : (
                    <button
                    onClick={() => handleEdit(goal._id, goal.name, goal.amountGoal)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md ml-4"
                    >
                    Edit
                    </button>
                )}

                <button
                    onClick={() => handleDelete(goal._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md ml-2"
                >
                    Delete
                </button>
                </div>

                {/* Progress Bar */}
                <div className="relative w-full h-4 bg-gray-200 rounded-md overflow-hidden">
                <div
                    className="absolute top-0 left-0 h-full bg-blue-500"
                    style={{
                    width: `${(goal.amountActual / goal.amountGoal) * 100}%`,
                    }}
                />
                </div>
                <p className="text-sm text-gray-600 text-center">
                {Math.min(((goal.amountActual / goal.amountGoal) * 100).toFixed(2), 100)}% of goal achieved
                </p>
            </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default GoalsDetails;