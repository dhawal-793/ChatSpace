import { fetchRedis } from '@/helpers/redis'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { messageArrayValidator } from '@/lib/validations/message'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'

interface pageProps {
    params: {
        chatId: string
    }
}

async function getMessages(chatId: string) {
    try {
        const results: string[] = await fetchRedis('zrange', `chat:${chatId}:messages`, 0, -1)
        const dbMessages = results.map((message) => JSON.parse(message) as Message)
        const revesedDbMessages = dbMessages.reverse()
        const messages = messageArrayValidator.parse(revesedDbMessages)
        return messages

    } catch (error) {

    }
}

const page = async ({ params }: pageProps) => {

    const { chatId } = params

    const session = await getServerSession(authOptions)
    if (!session) { notFound() }


    const { user } = session
    const [userId1, userid2] = chatId.split('--')

    if (user.id !== userId1 && user.id !== userid2) { notFound() }

    const chatPartnerId = user.id === userId1 ? userid2 : userId1
    const chatPartner = await (db.get(`user: + ${chatPartnerId}`)) as User

    const initialMesages = await getMessages(chatId)

    return <div>page</div>
}

export default page