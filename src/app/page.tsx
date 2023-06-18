import Button from '@/components/ui/Button'
import Link from 'next/link'

type Props = {}

export default async function Home(props: Props) {

  return (
    <div className="text-center">
      <p>Home Page</p>
      <Link href="/login" >Login</Link>
    </div>
  )
}
