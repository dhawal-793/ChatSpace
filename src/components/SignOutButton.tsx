'use client'

import { Loader2Icon, LogOutIcon } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { ButtonHTMLAttributes, FC, useState } from 'react'
import { toast } from 'react-hot-toast'
import Button from './ui/Button'

interface SignOutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {

}

const SignOutButton: FC<SignOutButtonProps> = ({ ...props }) => {
    const [isSigningOut, setIsSigningOut] = useState<boolean>(false)
    return <Button {...props} variant='ghost' onClick={async () => {
        setIsSigningOut(true)
        try {
            await signOut()
        } catch (error) {
            toast.error('There was some error signing out')
        }
        finally {
            setIsSigningOut(false)
        }
    }}>
        {isSigningOut ? <Loader2Icon className='animate-spin h-4 w-4' /> : <LogOutIcon className='w-4 h-4' />}
    </Button>
}

export default SignOutButton