import ChatInput from '@/components/ChatInput'
import Messages from '@/components/Messages'
import { fetchRedis } from '@/helpers/redis'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { messageArrayValidator } from '@/lib/validations/message'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
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
        console.log("Error => ", error);

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
    const chatPartner = await (db.get(`user:${chatPartnerId}`)) as User
    const initialMesages = (await getMessages(chatId)) as Message[]
    
// mock a delay of 2000 ms
    return <div className='flex flex-col justify-between flex-1 h-full max-h-[calc(100vh-6rem)]'>
        <div className='flex justify-between py-3 border-b-2 border-gray-200 sm:items-center'>
            <div className="relative flex items-center space-x-4">
                <div className="relative">
                    <div className="relative w-8 h-8 sm:w-12 sm:h-12">
                        <Image fill referrerPolicy='no-referrer' src={chatPartner.image} alt={`${chatPartner.name}'s profile picture`} className='rounded-full ' />
                    </div>
                </div>
                <div className='flex flex-col leading-tight'>
                    <div className='flex items-center text-xl'>
                        <span className='mr-3 font-semibold text-gray-700'>{chatPartner.name}</span>
                    </div>
                    <span className='text-sm to-gray-600'>{chatPartner.email}</span>
                </div>
            </div>
        </div>
        <Messages initialmessages={initialMesages} chatId={chatId} sessionId={session.user.id} sessionImg={session.user.image} chatPartner={chatPartner} />
        <ChatInput chatId={chatId} chatPartner={chatPartner} />
    </div>
}

export default page