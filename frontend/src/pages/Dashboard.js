import Goals from "../components/dashboard/Goals"
import PaymentReminders from "../components/dashboard/PaymentReminders"

const Dashboard = () => {
    return (
        <div className='w-full flex justify-between'>
            <PaymentReminders />
            <section>Section Two</section>
            <Goals/>
        </div>
    )
}

export default Dashboard