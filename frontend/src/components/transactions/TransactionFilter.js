import { useState, useEffect } from "react";

const TransactionFilter = ({setFilters}) => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [categories, setCategories] = useState([]);
    const [minAmount, setMinAmount] = useState("");
    const [maxAmount, setMaxAmount] = useState("");

    const allCategories = ["Category 1", "Category 2", "Category 3", "Category 4"];

    const handleCategoryChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map(
            (option) => option.value
        );
        setCategories(selectedOptions);
    };

    useEffect(() => {
        setFilters({ startDate, endDate, categories, minAmount, maxAmount });
    }, [startDate, endDate, categories, minAmount, maxAmount, setFilters]);

    return (
        <div className="bg-dark2 border-b-2 border-dark1">
            <form className="flex flex-wrap items-center justify-around gap-4 mb-2">
                {/* Start Date */}
                <div>
                    <p className="text-light1 mb-1">Start Date</p>
                    <input
                        type="date"
                        onChange={(e) => setStartDate(e.target.value)}
                        value={startDate}
                        className="bg-light1 p-px border text-center rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-dark1"
                    />
                </div>

                {/* End Date */}
                <div>
                <p className="text-light1 mb-1">End Date</p>
                    <input
                        type="date"
                        onChange={(e) => setEndDate(e.target.value)}
                        value={endDate}
                        className="bg-light1 p-px border text-center rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-dark1"
                    />
                </div>

                {/* Category Selection */}
                <div>
                    <p className="text-light1 mb-1">Category</p>
                    <select
                        value={categories}
                        onChange={handleCategoryChange}
                        className="bg-light1 p-px border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-dark1"
                    >
                        {allCategories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Minimum Amount */}
                <div>
                    <p className="text-light1 mb-1">Minimum Amount</p>
                    <input
                        type="number"
                        placeholder="$0"
                        onChange={(e) => setMinAmount(e.target.value)}
                        value={minAmount}
                        className="bg-light1 p-px border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-dark1"
                    />
                </div>



                {/* Maximum Amount */}
                <div>
                    <p className="text-light1 mb-1">Maximum Amount</p>
                    <input
                        type="number"
                        placeholder="$0"
                        onChange={(e) => setMaxAmount(e.target.value)}
                        value={maxAmount}
                        className="bg-light1 p-px border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-dark1"
                    />
                </div>
            </form>
        </div>
    );
};

export default TransactionFilter;