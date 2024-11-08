const BudgetList = ({ onCreateClick }) => {
    return (
        <div className='h-full'>
            <h1>Monthly Budgets List</h1>
            <button 
                onClick={onCreateClick} 
                className="mt-4 bg-button text-white p-2 rounded-md hover:bg-buttonhover"
            >
                Create Budget
            </button>
        </div>
    )

}

export default BudgetList