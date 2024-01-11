import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'


export const metadata: Metadata = {
  title: 'PONG GAME',
  description: 'PONG GAME by abdelbari messah',
 
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <link rel="icon" href="../../assets/favicon.ico" sizes="any" />
      <head>
        <title>Pong Game</title>
      </head>
      <body className='scrollbar-hide'>
        <Providers>
            {children}
        </Providers>
      </body>
    </html>
  )
}
