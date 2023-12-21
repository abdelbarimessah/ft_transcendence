'use client'
import {NextUIProvider} from "@nextui-org/react";
import { ChakraProvider } from '@chakra-ui/react'
import * as React from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <ChakraProvider >{children}</ChakraProvider>
    </NextUIProvider>
  )
}



// function App() {
//   // 2. Wrap ChakraProvider at the root of your app
//   return (
//     <ChakraProvider>
//       <TheRestOfYourApplication />
//     </ChakraProvider>
//   )
// }


// 'use client'
// import * as React from 'react'

// import {NextUIProvider} from "@nextui-org/react";

// export function Providers({ children }: { children: React.ReactNode }) {
//   return <NextUIProvider>{children}</NextUIProvider>
// }
