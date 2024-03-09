'use client'
import { NextUIProvider } from '@nextui-org/react'
import { SocketProvider } from './SocketContext'
import AuthWrapper from './authToken'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      {/* <AuthWrapper> */}
        {/* <SocketProvider> */}
        {children}
      {/* </AuthWrapper> */}
      {/* </SocketProvider> */}
    </NextUIProvider>
  )
}