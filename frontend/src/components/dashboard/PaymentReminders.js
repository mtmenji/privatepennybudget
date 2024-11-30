import { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';

const PaymentReminders = () => {
  const { user } = useAuthContext();
  const [reminders, setReminders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingReminderId, setEditingReminderId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [name, setName] = useState('');
  const [date, setdate] = useState('');
  const [amount, setAmount] = useState('');

  // Fetch reminders
  useEffect(() => {
    const fetchReminders = async () => {
      if (!user) {
        setError('You must be logged in.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/reminders', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const json = await response.json();

        if (!response.ok) {
          setError(json.error || 'Failed to fetch reminders.');
        } else {
          setReminders(json);
        }
      } catch (err) {
        setError('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchReminders();
  }, [user]);

  const handleToggleCheckbox = async (id, newCheckboxValue) => {
    if (!user) {
      setError('You must be logged in.');
      return;
    }
  
    try {
      const response = await fetch(`/reminders/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ checkbox: newCheckboxValue }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });
  
      const json = await response.json();
  
      if (!response.ok) {
        setError(json.error || 'Failed to update checkbox.');
        return;
      }
  
      setReminders((prevReminders) =>
        prevReminders.map((reminder) =>
          reminder._id === id ? { ...reminder, checkbox: newCheckboxValue } : reminder
        )
      );
      setError(null);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!user) {
      setError('You must be logged in.');
      return;
    }

    try {
      const response = await fetch(`/reminders/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        const json = await response.json();
        setError(json.error || 'Failed to delete reminder.');
        return;
      }

      setReminders((prevReminders) => prevReminders.filter((reminder) => reminder._id !== id));
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  // Handle edit
  const handleEdit = (id, name, date, amount) => {
    setEditingReminderId(id);
    setEditName(name);
    setEditDate(date);
    setEditAmount(amount);
  };

  const handleSaveEdit = async () => {
    if (!user) {
      setError('You must be logged in.');
      return;
    }

    const updatedReminder = { name: editName, date: editDate, amount: editAmount };

    try {
      const response = await fetch(`/reminders/${editingReminderId}`, {
        method: 'PUT',
        body: JSON.stringify(updatedReminder),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error || 'Failed to update reminder.');
        return;
      }

      setReminders((prevReminders) =>
        prevReminders.map((reminder) =>
          reminder._id === editingReminderId ? { ...reminder, ...updatedReminder } : reminder
        )
      );

      setEditingReminderId(null);
      setEditName('');
      setEditDate('');
      setEditAmount('');
      setError(null);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  // Handle create
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in.');
      return;
    }

    const newReminder = { name, date, amount };

    try {
      const response = await fetch('/reminders', {
        method: 'POST',
        body: JSON.stringify(newReminder),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      } else {
        setReminders((prevReminders) => [...prevReminders, json]);
        setName('');
        setdate('');
        setAmount('');
        setError(null);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading payment reminders...</p>;
  }

  if (error) {
    console.log(`Error Message: ${error}`)
  }

  return (
    <div className="max-w-sm m-2 bg-light1 h-full">
      <h3 className="text-xl font-bold mb-4 text-dark1 text-center">Your Payment Reminders</h3>

      {error && (
        <p className='text-center text-red-500 mb-4'>
            {error}
        </p>
      )}

      {reminders.length === 0 ? (
        <p className="text-gray-600">No reminders found. Start by creating a new reminder.</p>
      ) : (
        <ul className="bg-light1 rounded-md">
          {reminders.map((reminder) => (
            <li
              key={reminder._id}
              className={`text-sm flex flex-col p-2 rounded-md space-y-2 ${reminder.checkbox ? 'bg-dark3': 'bg-light1'}`}
            >
              <div className="flex items-center justify-between">
                <input
                    type="checkbox"
                    checked={reminder.checkbox}
                    onChange={() => handleToggleCheckbox(reminder._id, !reminder.checkbox)}
                    className="mr-2"
                />
                {editingReminderId === reminder._id ? (
                  <div className="flex items-center space-x-4 flex-grow">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="flex-1 p-px border border-gray-300 rounded-md"
                    />
                    <input
                      type="date"
                      value={editDate}
                      onChange={(e) => setEditDate(e.target.value)}
                      className="w-36 p-px border border-gray-300 rounded-md"
                    />
                    <input
                      type="number"
                      value={editAmount}
                      onChange={(e) => setEditAmount(e.target.value)}
                      className="w-20 p-px border border-gray-300 rounded-md"
                      placeholder="Amount"
                    />
                  </div>
                ) : (
                  <span className="flex-grow flex justify-between items-center">
                    <span className="font-bold">{reminder.name}</span>
                    <span className="ml-2">{new Date(reminder.date).toLocaleDateString()}</span>
                    <span className="ml-2">${reminder.amount.toFixed(2)}</span>
                  </span>
                )}

                {editingReminderId === reminder._id ? (
                  <button
                    onClick={handleSaveEdit}
                    className="bg-green-500 text-white p-px rounded-md ml-4 material-symbols-outlined"
                  >
                    check
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(reminder._id, reminder.name, reminder.date, reminder.amount)}
                    className="bg-blue-500 text-white p-px rounded-md ml-4 material-symbols-outlined"
                  >
                    edit
                  </button>
                )}

                <button
                  onClick={() => handleDelete(reminder._id)}
                  className="bg-red-500 text-white p-px rounded-md ml-2 material-symbols-outlined"
                >
                  delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <hr className="border-t-2 border-dark1 my-2" />

      {/* Create Reminder Form */}
      <form onSubmit={handleSubmit} className="w-full text-sm">
        <h2 className="font-semibold mb-1 text-dark1 text-center">Create A New Reminder</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="p-px border border-gray-300 rounded-md bg-light1"
              placeholder="Name"
              required
            />
          </div>

          <div className="flex flex-col">
            <input
              type="date"
              onChange={(e) => setdate(e.target.value)}
              value={date}
              className="p-px border border-gray-300 rounded-md bg-light1"
              placeholder="Due Date"
              required
            />
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4'>
          <div className="flex flex-col">
            <input
              type="number"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              className="p-px border border-gray-300 rounded-md bg-light1"
              placeholder="Amount"
              required
            />
          </div>

          <div className="flex items-center justify-center">
            <button
                type="submit"
                className="w-full bg-button hover:bg-buttonhover text-white p-px rounded-md material-symbols-outlined"
            >
                check
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PaymentReminders;