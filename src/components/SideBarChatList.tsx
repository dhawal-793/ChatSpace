import { FC } from 'react'

interface SideBarChatListProps {
    friends: User[]
}

const SideBarChatList: FC<SideBarChatListProps> = ({ friends }) => {
    return <ul role="list" className='max-h-[25rem] overflow-y-auto space-y-3'>
        <li className="flex gap-3 p-2 pl-0 text-sm font-semibold leading-6 text-gray-700 rounded-md hover:text-indigo-600 hover:bg-gray-50 group">
            chat
        </li>
    </ul>
}

export default SideBarChatList