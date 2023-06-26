'use client'
import axios from 'axios';
import { FC, useRef, useState } from 'react'
import { toast } from 'react-hot-toast';
import TextareaAutosize from 'react-textarea-autosize';
import Button from './ui/Button';

interface ChatInputProps {
    chatId: string
    chatPartner: User
}

const ChatInput: FC<ChatInputProps> = ({ chatId, chatPartner }) => {
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
    const [input, setInput] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const sendMessage = async () => {
        setIsLoading(true)
        try {
            await axios.post('/api/message/send', { text: input, chatId })
            setInput('')
            textAreaRef.current?.focus()
        } catch {
            toast.error('Something went wrong, please try again later.')
        }
        finally {
            setIsLoading(false)
        }
    }

    return <div className='px-4 pt-4 mb-2 border-t border-gray-200 sm:mb-0'>
        <div className="relative flex-1 overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
            <TextareaAutosize ref={textAreaRef} onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    console.log('send message');
                    sendMessage()
                }
            }}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Message ${chatPartner.name}`}
                className='block w-full text-gray-900 bg-transparent border-0 resize-none placeholder:text-gray-400 focus:ring-0 sm:py-1.5 sm:text-sm sm:leading-6'
            />
            <div onClick={() => textAreaRef.current?.focus()} className='py-2'
                aria-hidden="true"
            >
                <div className='py-px'>
                    <div className="h-6" />
                </div>
            </div>
            <div className="absolute bottom-0 right-0 flex justify-between py-2 pl-3 pr-2">
                <div className="flex-shrink-0">
                    <Button isLoading={isLoading} onClick={sendMessage} type="submit" className='w-[83.175px]'>Post</Button>
                </div>
            </div>
        </div>
    </div>
}

export default ChatInput