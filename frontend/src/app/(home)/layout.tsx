'use client'
import '../globals.css'
import SideNav from '@/components/sidebare/SideBare'
import { useContext, useEffect, useState } from 'react'
import { Providers } from '../providers'
import { SocketContext, SocketProvider } from '../SocketContext'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [Show, setShow] = useState(true);
  const route = useRouter();
  const socketClient = useContext(SocketContext);

  useEffect(() => {
    const enterRoom = (data: any) => {
      console.log('in the case of the game end with the score [2222]');

      const gameData = {
        opponentId: data.oponent.providerId,
        userIds: data.user.providerId,
        userScore: data.game.userScore,
        opponentScore: data.game.opponentScore,
        status: data.game.status,
      }
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/game/gameData`, gameData).then(res => {

      }).catch(err => {
        console.error(err);
      })
      setTimeout(() => {
        route.push('/game');
      }, 3000);
    };
    socketClient.on('endGameClient', enterRoom);

    return () => {
      socketClient.off('endGameClient');
    }
  }, [socketClient]);

  useEffect(() => {
    socketClient.on('OnePlayerLeaveTheRoom', async (data) => {
      
      if (data.socketId !== socketClient.id ) return;
      console.log('in the case of you  leave the room [0000]');

      const gameData = {
        opponentId: data.oponent.providerId,
        userIds: data.user.providerId,
        userScore: 0,
        opponentScore: 5,
        status: 'lose',
      }

      try {
        const url = process.env.NEXT_PUBLIC_API_URL;
        await axios.post(`${url}/game/gameData`, gameData);
      } catch (error) {
        console.error(error);
      }
      setTimeout(() => route.push('/game'), 3000);
    });
    return () => {
      socketClient.off('OnePlayerLeaveTheRoom');
    }
  }, [socketClient]);



  useEffect(() => {
    socketClient.on('OnePlayerLeaveTheRoom', async (data) => {
      
      if (data.socketId === socketClient.id ) return;
      console.log('in the case of the other player leave the room [1111]');
      
      const gameData = {
        userIds: data.oponent.providerId,
        opponentId: data.user.providerId,
        userScore: 5,
        opponentScore: 0,
        status: 'win',
      }

      try {
        const url = process.env.NEXT_PUBLIC_API_URL;
        await axios.post(`${url}/game/gameData`, gameData);
      } catch (error) {
        console.error(error);
      }
      setTimeout(() => route.push('/game'), 3000);
    });
    return () => {
      socketClient.off('OnePlayerLeaveTheRoom');
    }
  }, [socketClient]);

  return (
    <div className='flex  w-screen min-h-screen '>
      <SideNav setShow={setShow} />
      <div className='flex items-center justify-center flex-1 w-10 '>
        <SocketProvider>
          {children}
        </SocketProvider>
      </div>
    </div>
  )
}