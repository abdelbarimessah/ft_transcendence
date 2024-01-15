import type { Metadata } from 'next'
import '../globals.css'
import SideNav from '@/components/SideBare'


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
    <div className='flex bg-color-18  w-screen h-screen'>
      <SideNav />
      <div className=' flex items-center justify-center flex-1 w-10'>
        {children}
      </div>
    </div>
  )
}