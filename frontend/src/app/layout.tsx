import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import axios from 'axios';
import { Toaster } from 'sonner';


export const metadata: Metadata = {
  title: 'PONG GAME',
  description: 'PONG GAME by abdelbari messah',
 
}

// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = "http://localhost:3000/";

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
      <body className='no-scrollbar '>
        <Providers>
            {children}
        </Providers>
        <Toaster closeButton />
      </body>
    </html>
  )
}
