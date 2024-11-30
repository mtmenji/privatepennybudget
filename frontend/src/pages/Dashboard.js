import Goals from "../components/dashboard/Goals"
import PaymentReminders from "../components/dashboard/PaymentReminders"
import Selection from "../components/dashboard/Selection"

const Dashboard = () => {
    return (
        <div className='w-full flex justify-between'>
            <div>
                <Selection />
                <hr className="border-t-4 border-dark1 rounded-2xl mx-2 my-4" />
                <PaymentReminders />
            </div>
            <section>Section Two</section>
            <Goals/>
        </div>
    )
}

export default Dashboard