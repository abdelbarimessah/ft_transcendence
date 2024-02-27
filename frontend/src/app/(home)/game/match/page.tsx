'use client'
import { SocketContext, socket } from '@/app/SocketContext';
import CountDownTimer from '@/components/game/CountDowntimer';
import axios from 'axios';
import { use } from 'matter';
import dynamic from 'next/dynamic'
import { useRouter, useSearchParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
const DynamicComponentWithNoSSR = dynamic(
  () => import('./game'),
  { ssr: false }
);

// import DynamicComponentWithNoSSR from './game';

// const DynamicComponentWithNoSSR = dynamic(
//   () => import('@/components/Game'),
//   { ssr: false }
// );
axios.defaults.withCredentials = true;

export default function Home() {
  const [showFirstComponent, setShowFirstComponent] = useState(true);
  const socketClient = useContext(SocketContext);
  const [win, setWin] = useState(false);
  const [lose, setLose] = useState(false);
  const route = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFirstComponent(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showFirstComponent]);

  const params = useSearchParams();
  const roomName: any = params.get("room");


  useEffect(() => {

    socketClient.emit('checkRoom', { roomName });
    socketClient.on('youAreNotinRoom', (data) => {
      route.push('/game');
    });

  }, []);

  useEffect(() => {
    const enterRoom = (data: any) => {

    };
    socketClient.on('endGameClient', enterRoom);

    const handleUnload = () => {
      socketClient.emit('customDisconnectClient', { roomName });
    };
    return () => {
      handleUnload();
    };
  }, []);

  return (
    <div className='ml-6 mr-5 h-full flex items-center justify-center w-10 flex-1 relative'>
      <div className='w-full '>
        {showFirstComponent ? (
          <CountDownTimer />
        ) : (
          <DynamicComponentWithNoSSR />
        )}
      </div>
      {win && (
        <div className=' w-[282px] h-[195px] bg-color-30 rounded-[22px] flex flex-col items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1000]'>
          <span className='font-nico-moji text-[64px] text-color-6'>you</span>
          <span className='font-nico-moji text-[64px] text-color-6 -mt-7'> win</span>
        </div>
      )}
      {lose && (
        <div className=' w-[282px] h-[195px] bg-color-30 rounded-[22px] flex flex-col items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1000]'>
          <span className='font-nico-moji text-[64px] text-color-6'>you</span>
          <span className='font-nico-moji text-[64px] text-color-6 -mt-7'>lose</span>
        </div>
      )}
    </div>
  );
}

