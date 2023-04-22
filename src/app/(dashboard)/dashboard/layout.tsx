import { Icons } from '@/components/ui/Icons'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FC, ReactNode } from 'react'

interface LayoutProps {
    children: ReactNode
}

const Layout = async ({ children }: LayoutProps) => {
    const session = await getServerSession(authOptions)
    if (!session) {
        notFound()
    }
    return <div className='w-full flex h-screen'>
        <div className='flex h-full w-full max-w-xs grow flex-col gapy-5
         overflow-y-auto border-r border-gray-200 bg-white px-6'>
            <Link href="/dashboard" className='flex h-16 shrink-0 items-center'>
                <Icons.Logo className='h-8 w-auto text-indigo-600' />
            </Link>
            <div className="text-xs font-semibold leading-6 text-gray-400">Your Chats</div>
            <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>chat 1</li>
                    <li>
                        <div className='text-xs font-semibold leading-6 text-gray-600'>
                            Overview
                        </div>
                    </li>
                    <ul role="list" className='-mx-2 mt-2 space-y-1'>
                        
                    </ul>
                </ul>
            </nav>
        </div>
        {children}
    </div>
}

export default Layout