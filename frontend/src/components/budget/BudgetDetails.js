import React, { useState } from 'react';

const BudgetDetails = ({ budget }) => {
    const [formData, setFormData] = useState({
        month: budget.month,
        year: budget.year,
        categories: budget.categories,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Handle input changes for month and year
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle category updates
    const handleCategoryChange = (index, field, value) => {
        const updatedCategories = formData.categories.map((category, i) =>
            i === index ? { ...category, [field]: value } : category
        );
        setFormData((prev) => ({
            ...prev,
            categories: updatedCategories,
        }));
    };

    // Add a new category
    const addCategory = () => {
        setFormData((prev) => ({
            ...prev,
            categories: [...prev.categories, { name: '', amount: '' }],
        }));
    };

    // Remove a category
    const removeCategory = (index) => {
        const updatedCategories = formData.categories.filter((_, i) => i !== index);
        setFormData((prev) => ({
            ...prev,
            categories: updatedCategories,
        }));
    };

    // Submit the updated budget to the server
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const user = JSON.parse(localStorage.getItem('user'))
            const token = user ? user.token : null;
            if (!token) throw new Error('Authorization token not found. Please log in.');

            const response = await fetch(`http://localhost:4001/budgets/${budget._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(await response.json().then((res) => res.error));
            }

            const updatedBudget = await response.json();
            console.log('Budget updated successfully:', updatedBudget);
            alert('Budget updated successfully!');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center">
                    <div className="flex justify-center space-x-2 text-2xl font-bold text-dark1">
                        <select
                            name="month"
                            value={formData.month}
                            onChange={handleChange}
                            className="text-xl text-center font-bold bg-transparent border-none focus:outline-none appearance-none"
                        >
                            {[
                                'January', 'February', 'March', 'April', 'May', 'June',
                                'July', 'August', 'September', 'October', 'November', 'December'
                            ].map((month) => (
                                <option key={month} value={month}>
                                    {month}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            className="text-xl font-bold bg-transparent border-none w-20 text-center focus:outline-none"
                        />
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-semibold">Categories:</h3>
                    {formData.categories.map((category, index) => (
                        <div key={index} className="flex flex-col sm:flex-row sm:space-x-4">
                            <div className="w-full sm:w-1/2">
                                <input
                                    type="text"
                                    value={category.name}
                                    onChange={(e) => handleCategoryChange(index, 'name', e.target.value)}
                                    placeholder="Name"
                                    className="mt-1 block w-full p-3 border border-dark1 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-dark1"
                                />
                            </div>

                            <div className="w-full sm:w-1/2">
                                <input
                                    type="number"
                                    value={category.amount}
                                    onChange={(e) => handleCategoryChange(index, 'amount', e.target.value)}
                                    placeholder="Amount"
                                    className="mt-1 block w-full p-3 border border-dark1 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-dark1"
                                />
                            </div>

                            <button
                                type="button"
                                onClick={() => removeCategory(index)}
                                className="mt-2 sm:mt-0 sm:ml-4 text-dark1 hover:text-dark3 sm:self-center material-symbols-outlined"
                            >
                                delete
                            </button>
                        </div>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={addCategory}
                    className="w-full py-3 bg-button text-light1 rounded-lg hover:bg-buttonhover hover:text-dark1"
                >
                    Add Category
                </button>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 mt-4 text-light1 rounded-lg ${loading ? 'bg-gray-500' : 'bg-button hover:bg-buttonhover hover:text-dark1'}`}
                >
                    {loading ? 'Updating...' : 'Update Budget'}
                </button>

                {error && <p className="text-warningcolor text-xl text-center">{error}</p>}
            </form>
        </div>
    );
};

export default BudgetDetails;