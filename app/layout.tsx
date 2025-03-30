import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Puneeth K Portfolio',
  description: 'Puneeth K portfolio',
  generator: 'puneeth-software-engineer',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
