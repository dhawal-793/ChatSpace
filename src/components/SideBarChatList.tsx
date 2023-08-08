'use client'
import { pusherClient } from '@/lib/pusher'
import { chatHrefConstructor, toPusherKey } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import path from 'path'
import { FC, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import UnSeenChatToast from './UnSeenChatToast'

interface SideBarChatListProps {
    friends: User[],
    sessionId: string
}

interface ExtendedMessage extends Message {
    senderImg: string
    senderName: string
}

const SideBarChatList: FC<SideBarChatListProps> = ({ sessionId, friends }) => {
    const router = useRouter()
    const pathName = usePathname()
    const [unSeenMessages, setUnSeenMessages] = useState<Message[]>([])
    const [activeChats, setActiveChats] = useState<User[]>(friends)

    useEffect(() => {
        if (pathName?.includes('chat')) {
            setUnSeenMessages(prev => prev.filter(message => !pathName.includes(message.senderId)))
        }
    }, [pathName])

    useEffect(() => {
        pusherClient.subscribe(toPusherKey(`user:${sessionId}:chats`))
        pusherClient.subscribe(toPusherKey(`user:${sessionId}:friends`))

        const chatHandler = (message: ExtendedMessage) => {
            const shouldNotify = pathName !== `/dashboard/chat/${chatHrefConstructor(sessionId, message.senderId)}`
            if (!shouldNotify) return
            toast.custom((t) => (
                <UnSeenChatToast t={t} sessionId={sessionId}
                    senderId={message.senderId}
                    senderImg={message.senderImg}
                    senderName={message.senderName}
                    senderMessage={message.text}
                />
            ))
            setUnSeenMessages(prev => [...prev, message])
            // console.log("New chat message received =>\n", message);
        }
        const newFriendHandler = (newFriend: User) => {
            setActiveChats((prev) => [...prev, newFriend])
            // router.refresh()
        }

        pusherClient.bind('new_message', chatHandler)
        pusherClient.bind('new_friend', newFriendHandler)

        return () => {
            pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:chats`))

            pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:friends`))

            pusherClient.unbind('new_message', chatHandler)
            pusherClient.unbind('new_friend', newFriendHandler)
        }
    }, [sessionId, pathName, router])



    return <ul role="list" className='max-h-[25rem] overflow-y-auto space-y-3 mt-2'>
        {
            activeChats.sort().map(friend => {
                const unSeenMessageCount = unSeenMessages.filter((unSeenMessage) => {
                    return unSeenMessage.senderId === friend.id
                }).length

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