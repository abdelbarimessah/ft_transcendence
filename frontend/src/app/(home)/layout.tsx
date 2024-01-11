import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { Providers } from '../providers'
import SideNav from '@/components/SideBare'

const inter = Inter({ subsets: ['latin'] })

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
    <div className='flex bg-color-18 overflow-hidden h-screen w-screen'>
        <SideNav/>
        <div className='flex-1'>
          {children}
        </div>
    </div>
  )
}
