'use client'

import axios from 'axios'
import { Check, UserPlus, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'

interface FriendRequestsProps {
    incomingFriendRequests: IncomingFriendRequest[],
    sessionId: string,
}

const FriendRequests: FC<FriendRequestsProps> = ({ incomingFriendRequests, sessionId }) => {
    const [friendRequests, setFriendRequests] = useState(incomingFriendRequests)
    const router = useRouter()

    const acceptFriendRequest = async (senderId: string) => {
        await axios.post('/api/friends/accept', { id: senderId })
        setFriendRequests(prev => prev.filter(({ senderId: id }) => id !== senderId))
        router.refresh()
    }
    const denyFriendRequest = async (senderId: string) => {
        await axios.post('/api/friends/deny', { id: senderId })
        setFriendRequests(prev => prev.filter(({ senderId: id }) => id !== senderId))
        router.refresh()
    }


    return (
        <>
            {FriendRequests.length === 0 ?
                <p className='text-sm text-zinc-500 '>Nothing to show here...</p>
                :
                friendRequests.map(({ senderId, senderEmail }) => (
                    <div key={senderId} className="flex items-center gap-4 ">
                        <UserPlus className='text-black' />
                        <p className='text-lg font-medium'>{senderEmail}</p>
                        <button aria-label='accept friend' className='grid w-8 h-8 transition bg-indigo-600 rounded-full hover:bg-indigo-700 place-items-center hover:shadow-sm' onClick={() => acceptFriendRequest(senderId)}><Check className='w-3/4 font-semibold text-white h-3/4' /></button>
                        <button aria-label='accept friend' className='grid w-8 h-8 transition bg-red-600 rounded-full hover:bg-red-700 place-items-center hover:shadow-sm' onClick={() => denyFriendRequest(senderId)}><X className='w-3/4 font-semibold text-white h-3/4' /></button>
                    </div>
                ))
            }
        </>
    )
}

export default FriendRequests