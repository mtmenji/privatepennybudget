import { useState, useEffect } from "react"
import { useBudgetContext } from '../hooks/useBudgetContext'
import { useAuthContext } from '../hooks/useAuthContext'
import BudgetCreate from "../components/budget/BudgetCreate"
import BudgetList from "../components/budget/BudgetList"
import BudgetDetails from "../components/budget/BudgetDetails"

const Budget = () => {

    const [showCreateForm, setShowCreateForm] = useState(false)
    const [isListVisible, setIsListVisible] = useState(true)
    const [selectedBudget, setSelectedBudget] = useState(null)
    
    const [isSmallScreen, setIsSmallScreen] = useState(false)
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 1024);
        };

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    let shouldShowCreateForm
    if (isSmallScreen) {
        shouldShowCreateForm = !isListVisible && showCreateForm
    } else {
        shouldShowCreateForm = showCreateForm
    }

    const { dispatch } = useBudgetContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchBudgets = async () => {
            const response = await fetch('/budgets', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_BUDGETS', payload: json})
            }
        }

        if (user) {
            fetchBudgets()
        }
    }, [dispatch, user])

    const handleSelectBudget = (budget) => {
        setSelectedBudget(budget);
    };

    return (
        <section class='flex flex-grow w-full h-full relative'>
            <div
                className={`${
                isListVisible ? "w-screen lg:w-1/4" : "w-0"
                } bg-dark3 text-light1 flex transition-all duration-300 ease-in-out relative`}
            >
                {isListVisible && (
                <BudgetList onCreateClick={() => setShowCreateForm(true)} onSelectBudget={handleSelectBudget}/>
                )}
                
                <button
                onClick={() => setIsListVisible(!isListVisible)}
                className="absolute right-0 top-0 bottom-0 transform translate-x-full bg-dark1 text-white hover:bg-buttonhover"
                >
                {isListVisible ? "<" : ">"}
                </button>
            </div>

            <div className={`${
                isListVisible ? "w-2 lg:w-full" : "w-full"
                } flex justify-center items-center transition-all duration-300 ease-in-out`}
            >
                {shouldShowCreateForm && (
                    <BudgetCreate onCancel={() => setShowCreateForm(false)}/>
                )}
                {!shouldShowCreateForm && (
                    <div className="flex w-full justify-center">
                        {selectedBudget ? (
                            <BudgetDetails key={selectedBudget._id} budget={selectedBudget} />
                        ) : (
                            <p className='text-dark1 text-2xl font-bold'>
                                No budget selected. Choose one from the Monthly Budget List!
                            </p>
                        )}
                    </div>
                )}
            </div>
        </section>
    )
}

export default Budget