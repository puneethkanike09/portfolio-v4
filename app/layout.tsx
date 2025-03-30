import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Shaikh unaiz portfolio',
  description: 'Shaikh unaiz portfolio',
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
