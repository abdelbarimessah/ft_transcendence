'use client'
import {NextUIProvider} from '@nextui-org/react'
import  {SocketProvider}  from './SocketContext'

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <SocketProvider>
        {children}
      </SocketProvider>
    </NextUIProvider>
  )
}