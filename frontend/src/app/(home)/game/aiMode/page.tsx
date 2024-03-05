'use client'
import { SocketContext } from '@/app/SocketContext';
import CountDownTimer from '@/components/game/CountDowntimer';
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
const DynamicComponentWithNoSSR = dynamic(
  () => import('./aiMode'),
  { ssr: false }
);


export default function Home() {
  const [showFirstComponent, setShowFirstComponent] = useState(true);
  const socketClient = useContext(SocketContext);
  const router = useRouter()
  useEffect(() => {
    socketClient.on('endGameAiMode', () => {
      console.log('the ai mode game end ???');
      router.push('/game');
    })
    return(() => {
      socketClient.off('endGameAiMode');
    })
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFirstComponent(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);


  return (
    <div className='ml-6 mr-5 h-full flex items-center justify-center w-10 flex-1'>
      {showFirstComponent ? (
        <CountDownTimer />
      ) : (
        <DynamicComponentWithNoSSR />
      )}
    </div>
  );
}

