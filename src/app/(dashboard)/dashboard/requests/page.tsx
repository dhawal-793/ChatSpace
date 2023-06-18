import { fetchRedis } from '@/app/api/friends/add/helpers/redis'
import FriendRequests from '@/components/FriendRequests'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'



const page = async () => {
    const session = await getServerSession(authOptions)
    if (!session) {
        notFound()
    }
    const incomingSenderIds = await fetchRedis('smembers', `user:${session.user.id}:incoming_friend_requests`) as string[]

    const incomingFriendRequests = await Promise.all(
        incomingSenderIds.map(async (senderId) => {
            const senderData = await fetchRedis('get', `user:${senderId}`) as string
            const sender = JSON.parse(senderData)
            return {
                senderId, senderEmail: sender.email
            }
        })
    )

    return (
        <main className="pt-8">
            <h1 className="mb-8 text-5xl font-bold ">Add a Friend</h1>
            <div className="flex flex-col gap-4">
                <FriendRequests sessionId={session.user.id} incomingFriendRequests={incomingFriendRequests} />
            </div>
        </main>
    )
}

export default page