'use client'
import '../globals.css'
import SideNav from '@/components/sidebare/SideBare'
import { useState } from 'react'
import Chat from './chat/page'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [Show, setShow] = useState(true);
  return (
    <div className='flex w-screen h-screen overflow-hidden '>
      <SideNav setShow={setShow}/>
          <Chat />
    </div>
  )
}