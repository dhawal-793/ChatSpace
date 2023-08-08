import { chatHrefConstructor, cn } from '@/lib/utils'
import Image from 'next/image'
import { FC } from 'react'
import { toast, type Toast } from 'react-hot-toast'

interface UnSeenChatToastProps {
    t: Toast
    sessionId: string
    senderId: string
    senderName: string
    senderImg: string
    senderMessage: string
}

const UnSeenChatToast: FC<UnSeenChatToastProps> = ({ t, sessionId, senderId, senderImg, senderName, senderMessage }) => {
    const toastHandler = () => {
        toast.dismiss(t.id)
    }
    return <div className={cn('max-w-md shadow-lg rounded-lg w-full bg-white pointer-events-auto flex ring-1 ring-black ring-opacity-5', {
        'animate-enter': t.visible, 'animate-leave': !t.visible
    }
    )}>
        <a onClick={toastHandler} href={`/dashboard/chat/${chatHrefConstructor(sessionId, senderId)}`}
            className="flex-1 w-0 p-4">
            <div className="flex items-start">
                <div className="flex shrink-0 pt-0.5">
                    <div className="relative w-10 h-10">
                        <Image fill src={senderImg} referrerPolicy="no-referrer" className='rounded-full' alt={`${senderName}'s profile picture`} />
                    </div>
                </div>
                <div className='flex-1 ml-3 '>
                    <p className="text-sm font-medium text-gray-900">{senderName}</p>
                    <p className='mt-1 text-sm text-gray-500'>{senderMessage}</p>
                </div>
            </div>
        </a>
        <div className='flex border border-gray-200'>
            <button onClick={toastHandler} className="flex items-center justify-center w-full p-4 text-sm font-medium text-indigo-600 border border-transparent rounded-none rounded-r-lg hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                Close
            </button>
        </div>
    </div>
}

export default UnSeenChatToast