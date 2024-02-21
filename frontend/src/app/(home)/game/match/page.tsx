'use client'
import { SocketContext } from '@/app/SocketContext';
import CountDownTimer from '@/components/game/CountDowntimer';
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
  }, []);
  const params = useSearchParams();
  const roomName: any = params.get("room");

  useEffect(() => {
    // socketClient.on('OnePlayerLeaveTheRoom', (data) => {
    //   console.log('____________________OnePlayerLeaveTheRoom___________________', data);
    //   setOtherPlayer(true);
    //   toast.error('Other player left the room');
    //   setTimeout(() => {
    //     route.push('/game');
    //   }, 5000);
    // });
    return () => {
      console.log('clean up the socket333333');
      socketClient.emit('customDisconnectClient', { roomName });
      route.push('/game');
    }
  }, []);

  useEffect(() => {

    socketClient.emit('checkRoom', { roomName });
    socketClient.on('youAreNotinRoom', (data) => {
      route.push('/game');
    });

  }, []);
  const router = useRouter()

  useEffect(() => {
    const enterRoom = (data: any) => {
      
      console.log('the data status is ', data.socketData);
      console.log('the data status is ', data.game.status);
      if (data.status === 'win') setWin(true);
      else if (data.status === 'lose') setLose(true);

      setTimeout(() => {
        router.push('/game');
      }, 3000);
    };
    socketClient.on('endGameClient', enterRoom);

    return () => {
      socketClient.off('endGameClient', enterRoom);
    }
  }, [router, socketClient, roomName]);



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

