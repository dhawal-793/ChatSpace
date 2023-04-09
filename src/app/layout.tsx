import './globals.css'

export const metadata = {
  title: 'MeChat',
  description: 'MeChat is a simle chat application.',
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
