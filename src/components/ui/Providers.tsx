'use client'



// const Providers = ({ children }) => {
//     return (
//         <>
//             <Toaster position='top-center' reverseOrder={false}>
//                 {children}
//             </Toaster>
//         </>
//     )
// }

// export default Providers

import { FC, ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

interface ProvidersProps {
    children: ReactNode
}

const Providers: FC<ProvidersProps> = ({ children }) => {
    return <>
        <Toaster position='top-center' reverseOrder={false} />
        {children}
    </>
}

export default Providers