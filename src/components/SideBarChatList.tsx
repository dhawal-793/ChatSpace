'use client'
import { chatHrefConstructor } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'

interface SideBarChatListProps {
    friends: User[],
    sessionId: string
}

const SideBarChatList: FC<SideBarChatListProps> = ({ sessionId, friends }) => {
    const router = useRouter()
    const pathName = usePathname()
    const [unSeenMessages, setUnSeenMessages] = useState<Message[]>([])


    useEffect(() => {
        if (pathName?.includes('chat')) {
            setUnSeenMessages(prev => prev.filter(message => !pathName.includes(message.senderId)))
        }

    }, [pathName])


    return <ul role="list" className='max-h-[25rem] overflow-y-auto space-y-3 mt-2'>
        {
            friends.sort().map(friend => {
                const unSeenMessageCount = unSeenMessages.filter((unSeenMessage) => { unSeenMessage.senderId === friend.id }).length

                return (
                    <li key={friend.id} >
                        <a href={`/dashboard/chat/${chatHrefConstructor(sessionId, friend.id)}`} className="flex items-center p-2 pl-0 text-sm font-semibold leading-6 text-gray-700 rounded-md gap-x-3 hover:text-indigo-600 hover:bg-gray-50 group">
                            {friend.name}
                            {unSeenMessageCount > 0 && <div className='flex items-center justify-center w-5 h-5 text-xs text-white bg-indigo-600 rounded-full'>
                                {unSeenMessageCount}
                            </div>}
                        </a>
                    </li>
                )
            })
        }
    </ul>
}

export default SideBarChatList