import { fetchRedis } from '@/helpers/redis'
import FriendRequestSidebarOptions from '@/components/FriendRequestSidebarOptions'
import SignOutButton from '@/components/SignOutButton'
import { Icon, Icons } from '@/components/ui/Icons'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'
import { getFriendsByUserId } from '@/helpers/get_Friends_By_UserId'
import SideBarChatList from '@/components/SideBarChatList'

interface LayoutProps {
    children: ReactNode
}

interface SidebarOptions {
    id: number
    name: string
    href: string
    Icon: Icon

}

const sidebaroptions: SidebarOptions[] = [
    {
        id: 1,
        name: 'Add Friend',
        href: '/dashboard/add',
        Icon: 'UserPlus'
    }
]



const Layout = async ({ children }: LayoutProps) => {
    const session = await getServerSession(authOptions)
    if (!session) {
        notFound()
    }
    const friends = await getFriendsByUserId(session.user.id)
    const unseenRequestCount = (await fetchRedis('smembers', `user:${session.user.id}:incoming_friend_requests`) as User[]).length

    return <div className='flex w-full h-screen'>
        <div className='flex flex-col w-full h-full max-w-xs px-6 overflow-y-auto bg-white border-r border-gray-200 grow gap-y-5'>
            <Link href="/dashboard" className='flex items-center h-16 shrink-0'>
                <Icons.Logo className='w-auto h-8 text-indigo-600' />
            </Link>
            <nav className="flex flex-col flex-1">
                <ul role="list" className="flex flex-col flex-1 -mr-2 gap-y-7">
                    {friends.length > 0 && <li>
                        <div className="text-xs font-semibold leading-6 text-gray-400">Your Chats</div>
                        <SideBarChatList sessionId={session.user.id} friends={friends} />
                    </li>}
                    <li>
                        <div className='text-xs font-semibold leading-6 text-gray-600'>
                            Overview
                        </div>
                        <ul role="list" className='mt-2 space-y-1'>
                            {sidebaroptions.map((option) => {
                                const Icon = Icons[option.Icon]
                                return (
                                    <li key={option.id}>
                                        <Link href={option.href} className="flex gap-3 p-2 pl-0 text-sm font-semibold leading-6 text-gray-700 rounded-md hover:text-indigo-600 hover:bg-gray-50 group">
                                            <span className='text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'>{<Icon className='w-4 h-4' />}</span>
                                            <span className='truncate'>{option.name}</span>
                                        </Link>
                                    </li>
                                )
                            })}
                            <li>
                                <FriendRequestSidebarOptions sessionId={session.user.id} initialUnseenRequestCount={unseenRequestCount} />
                            </li>
                        </ul>
                    </li>
                    <li className='flex items-center mt-auto -mx-6'>
                        <div className="flex items-center flex-1 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 gap-x-4 ">
                            <div className='relative w-8 h-8 bg-gray-50'>
                                <Image fill referrerPolicy='no-referrer' className='rounded-full' src={session.user.image || ''} alt="Your Profile Picture" />
                            </div>
                            <span className='sr-only'>
                                Your profile
                            </span>
                            <div className='flex flex-col'>
                                <span aria-hidden="true">{session.user.name}</span>
                                <span aria-hidden="true" className='text-xs text-zinc-400'>{session.user.email}</span>
                            </div>
                        </div>
                        <SignOutButton />
                    </li>
                </ul>
            </nav>
        </div>
        <aside className='container w-full max-h-screen py-16 md:py-12'>
        {children}
        </aside>
    </div>
}

export default Layout