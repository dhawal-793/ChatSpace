'use client'
import { cn } from '@/lib/utils'
import { Message } from '@/lib/validations/message'
import { format } from 'date-fns'
import Image from 'next/image'
import { FC, useRef, useState } from 'react'

interface MessagesProps {
    sessionId: string
    sessionImg: string | null | undefined
    initialmessages: Message[]
    chatPartner: User
}

const Messages: FC<MessagesProps> = ({ initialmessages, sessionId, chatPartner, sessionImg }) => {

    const [messages, setMessages] = useState(initialmessages)
    const scrollDownRef = useRef<HTMLDivElement | null>(null)

    const formatTimestamp = (timestamp: number) => {
        return format(timestamp, 'HH:m')
    }

    return <div id='messages' className='flex flex-col-reverse flex-1 h-full gap-4 overflow-y-auto scrolling-touch scrollbar-thumb-blue scrollbar-w-2 scrollbar-thumb-rounded scrollbar-track-blue-lighter'>
        <div ref={scrollDownRef} />
        {
            messages.map((message, index) => {
                const isCurrentUser = message.senderId === sessionId
                const hasNextMessageFromSameUser = messages[index - 1]?.senderId === messages[index].senderId

                return <div key={`${message.id}-${message.timestamp}}`}>
                    <div className={cn('flex items-end', { 'justify-end': isCurrentUser })}>
                        <div className={cn('relative w-6 h-6', {
                            'order-2': isCurrentUser,
                            invisible: hasNextMessageFromSameUser
                        })}>
                            <Image fill src={isCurrentUser ? (sessionImg as string) : chatPartner.image}
                                alt='Profile picture'
                                referrerPolicy='no-referrer'
                                className='rounded-full' />
                        </div>
                        <div className={cn('flex flex-col space-y-2 text-base max-w-xs mx-2', {
                            'order-1 items-end': isCurrentUser,
                            'order-2,items-start': !isCurrentUser
                        })}>
                            <span className={cn('px-4 py-2 rounded-lg inline-block', {
                                'bg-indigo-600 text-white': isCurrentUser,
                                'bg-gray-200 text-gray-900': !isCurrentUser,
                                'rounded-br-none': !hasNextMessageFromSameUser && isCurrentUser,
                                'rounded-bl-none': !hasNextMessageFromSameUser && !isCurrentUser,
                            })}>
                                {message.text}{' '}
                                <span className='ml-2 text-xs text-gray-400'>{formatTimestamp(message.timestamp)}</span>
                            </span>
                        </div>

                    </div>

                </div>
            })}
    </div>
}

export default Messages