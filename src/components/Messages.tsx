'use client'
import { cn } from '@/lib/utils'
import { Message } from '@/lib/validations/message'
import { FC, useRef, useState } from 'react'

interface MessagesProps {
    senderId: string
    initialmessages: Message[]
}

const Messages: FC<MessagesProps> = ({ initialmessages, senderId }) => {
    const [messages, setMessages] = useState(initialmessages)
    const scrollDownRef = useRef<HTMLDivElement | null>(null)

    return <div id='messages' className='flex flex-col-reverse flex-1 h-full gap-4 overflow-y-auto scrolling-touch scrollbar-thumb-blue scrollbar-w-2 scrollbar-thumb-rounded scrolbar-track-blue-lighter'>
        <div ref={scrollDownRef} />
        {
            messages.map((message, index) => {
                const isCurrentUser = message.senderId === senderId
                const hasNextMessageFromSameUser = messages[index + 1]?.senderId === message.senderId
                return <div key={`${message.id}-${message.timestamp}}`}>
                    <div className={cn('flex items-end', { 'justify-end': isCurrentUser })}>
                        <div className={cn('flex flex-col space-y-2 text-base max-w-xs mx-2', {
                            'order-1 items-end': isCurrentUser,
                            'order-2,itstems-start': !isCurrentUser
                        })}>
                            <span className={cn('px-4 py-2 rounded-lg inline-block', {
                                'bg-indigo-600 texq-white': isCurrentUser,
                                'bg-gray-200 text-gray-900': !isCurrentUser,
                                'rounded-br-none': !hasNextMessageFromSameUser && isCurrentUser,
                                'rounded-bl-none': !hasNextMessageFromSameUser && !isCurrentUser,
                            })}>
                                {message.text}{' '}
                                <span className='ml-2 text-xs text-gray-400'>{message.timestamp}</span>
                            </span>
                        </div>
                    </div>

                </div>
            })}
    </div>
}

export default Messages