'use client'

import { pusherClient } from '@/lib/pusher'
import { toPusherKey } from '@/lib/utils'
import { User } from 'lucide-react'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'

interface FriendRequestSidebarOptionsProps {
    sessionId: string
    initialUnseenRequestCount: number
}

const FriendRequestSidebarOptions: FC<FriendRequestSidebarOptionsProps> = ({ sessionId, initialUnseenRequestCount }) => {
    const [unSeenRequestCount, setUnSeenRequestCount] = useState<number>(initialUnseenRequestCount)

    useEffect(() => {
        pusherClient.subscribe(toPusherKey(`user:${sessionId}:incoming_friend_requests`))
        pusherClient.subscribe(toPusherKey(`user:${sessionId}:friends`))

        const friendRequestHandler = () => {
            setUnSeenRequestCount((prev) => prev + 1)
        }

        const addedFriendHandler = () => {
            setUnSeenRequestCount((prev) => prev - 1)
        }

        pusherClient.bind('incoming_friend_requests', friendRequestHandler)
        pusherClient.bind('new_friend', addedFriendHandler)

        return () => {
            pusherClient.unsubscribe(
                toPusherKey(`user:${sessionId}:incoming_friend_requests`)
            )
            pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:friends`))

            pusherClient.unbind('new_friend', addedFriendHandler)
            pusherClient.unbind('incoming_friend_requests', friendRequestHandler)
        }
    }, [sessionId])

    // useEffect(() => {

    // }, [unSeenRequestCount])


    return (
        <Link href="/dashboard/requests"
            className='flex items-center p-2 pl-0 text-sm font-semibold leading-6 text-gray-700 rounded-md group hover:bg-gray-50 hover:text-indigo-600 gap-x-3'>
            <div className='flex items-center justify-center w-6 h-6 text-gray-400 border border-gray-200 rounded-lg group-hover:border-indigo-600 group-hover:text-indigo-600 shrink-0 text-[0.625rem] font-medium bg-white'>
                <User className='w-4 h-4' />
            </div>
            <p className='truncate'>Friend Requests</p>
            {unSeenRequestCount > 0 && <div className='flex items-center justify-center w-5 h-5 text-xs text-white bg-indigo-600 rounded-full'>
                {unSeenRequestCount}
            </div>}
        </Link>
    )
}

export default FriendRequestSidebarOptions