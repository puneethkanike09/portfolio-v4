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
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="title" content="Puneeth K Portfolio" />
        <meta name="description" content="Puneeth K portfolio" />
        <meta name="keywords" content="Puneeth K, Portfolio, Software Engineer, Web Developer" />
        <meta name="author" content="Puneeth K" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://puneeth-portfolio.vercel.app/" />
        <meta property="og:title" content="Puneeth K Portfolio" />
        <meta property="og:description" content="Software Engineer" />
        <meta property="og:image" content="https://puneeth-portfolio.vercel.app/images/about/meta.png" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://puneeth-portfolio.vercel.app/" />
        <meta name="twitter:title" content="Puneeth K Portfolio" />
        <meta name="twitter:description" content="Puneeth K portfolio showcasing software engineering skills" />
        <meta name="twitter:image" content="https://puneeth-portfolio.vercel.app/images/about/meta.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}