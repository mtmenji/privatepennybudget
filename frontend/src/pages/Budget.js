import { useState } from "react"
import BudgetCreate from "../components/budget/BudgetCreate"
import BudgetList from "../components/budget/BudgetList"

const Budget = () => {

    const [showCreateForm, setShowCreateForm] = useState(false)

    return (
        <section class='flex flex-grow w-full h-full'>
            <div class='w-1/4 bg-dark3 text-light1 flex'>
                <BudgetList onCreateClick={() => setShowCreateForm(true)}/>
            </div>
            <div class='w-3/4 flex justify-center items-center'>
                {showCreateForm && (
                    <BudgetCreate onCancel={() => setShowCreateForm(false)}/>
                )}
            </div>
        </section>
    )
}

export default Budget