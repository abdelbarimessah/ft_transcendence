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
    <div className='flex w-screen min-h-screen '>
        <SideNav setShow={setShow}/>
        <div className='flex  justify-center items-center bg-[#FFF0D2] w-screen h-screen overflow-hidden '>
          {children}
        </div>
    </div>
  )
}