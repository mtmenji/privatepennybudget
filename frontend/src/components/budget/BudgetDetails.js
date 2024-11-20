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
        <div className="budget-details">
            <form onSubmit={handleSubmit}>
                <label>
                    Month:
                    <input
                        type="text"
                        name="month"
                        value={formData.month}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Year:
                    <input
                        type="number"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                    />
                </label>

                <h3>Categories:</h3>
                {formData.categories.map((category, index) => (
                    <div key={index} className="category-item">
                        <label>
                            Name:
                            <input
                                type="text"
                                value={category.name}
                                onChange={(e) => handleCategoryChange(index, 'name', e.target.value)}
                            />
                        </label>
                        <label>
                            Amount:
                            <input
                                type="number"
                                value={category.amount}
                                onChange={(e) => handleCategoryChange(index, 'amount', e.target.value)}
                            />
                        </label>
                        <button type="button" onClick={() => removeCategory(index)}>
                            Remove
                        </button>
                    </div>
                ))}
                <button type="button" onClick={addCategory}>
                    Add Category
                </button>

                <button type="submit" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Budget'}
                </button>

                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default BudgetDetails;