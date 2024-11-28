import GoalsCreate from "../components/dashboard/GoalsCreate"
import GoalsDetails from "../components/dashboard/GoalsDetails"


const Dashboard = () => {
    return (
        <div className='dashboard'>
            <h2>Dashboard</h2>
            <GoalsCreate />
            <GoalsDetails />
        </div>
    )
}

export default Dashboard