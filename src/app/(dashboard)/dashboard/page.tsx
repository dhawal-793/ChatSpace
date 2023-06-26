import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'


const Dashboard = async ({ }) => {
    const session = await getServerSession(authOptions);

    return (
        <>
            <h1>Dashboard</h1>

        </>
    )
}

export default Dashboard