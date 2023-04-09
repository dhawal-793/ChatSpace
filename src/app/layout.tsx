import './globals.css'

export const metadata = {
  title: 'ChatSpace',
  description: 'ChatSpace is a simple chat application built using nextJs with complete authentication with next-auth and it is completely responsive.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
