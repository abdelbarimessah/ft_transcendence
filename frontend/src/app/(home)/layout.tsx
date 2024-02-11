'use client'
import '../globals.css'
import SideNav from '@/components/sidebare/SideBare'
import { useState } from 'react'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [Show, setShow] = useState(true);
  return (
    <div className='flex bg-color-11  w-screen min-h-screen '>
      <SideNav setShow={setShow}/>
        <div className='flex items-center justify-center flex-1 w-10 '>
          {children}
        </div>
    </div>
  )
}