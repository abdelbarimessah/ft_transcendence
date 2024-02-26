"use client";

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SocketContext, socket } from "@/app/SocketContext";
import { useRouter } from "next/navigation";


const NotificationIcon = () => {
  const socketClient = useContext(SocketContext);
  const [inviteGame, setInviteGame] = useState(false);
  const [gamePair, setGamePair] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    socketClient.on('playRequestFromFriend', (data) => {
      setInviteGame(true);
      setGamePair(data);
      console.log('the data in the client who receive the invite [222222]', data);
    })
  })
  useEffect(() => {
    socketClient.on('playersReadyInvite', (data) => {
      console.log('[111111]  both the player should go to the game [11111]', data);

      setTimeout(() => {
          router.push(`/game/match?room=InviteRoom-${data.sender.providerId}-${data.receiver.providerId}-${data.inviteNumber}`);
      }, 500)            
    })
  }, [])

  return (
    <div className="w-[66px] h-[66px] bg-color-0 rounded-[22px] flex items-center justify-center  cursor-pointer relative">
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <div className="relative h-full w-full flex items-center justify-center ">
            <Image
              alt="logo"
              height="35"
              width="35"
              priority={true}
              src="/../../assets/Notification.svg"
            />
            <div className="h-[10px] w-[10px] rounded-full absolute bg-color-22 border-1 border-color-0 animate-ping  top-[15px] right-[20px] flex items-center justify-center"></div>

            <DropdownMenuContent
              align="end"
              className="absolute h-fit z-[1000] top-0 right-0 rounded-[15px] "
            >
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {inviteGame &&
                <GameNotification gamePair={gamePair} />
              }
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </div>
        </DropdownMenuTrigger>
      </DropdownMenu>
    </div>
  );
};

export default NotificationIcon;


function GameNotification(gamePair: any) {
  const socketClient = useContext(SocketContext);
  const handleAcceptInvite = () => {
    socketClient.emit('acceptInviteGame', gamePair);
    console.log('emit the accept of the invite in the receiver [444444]');
  }

  return (
    <div className="w-[200px] h-[50px] bg-color-6 rounded-[10px] flex items-center justify-center gap-[22px]">
      <div onClick={handleAcceptInvite} className="w-[70px] h-[40px] bg-color-0 cursor-pointer rounded-[10px] flex items-center justify-center">
        <span className="text-color-6 text-[14px]">accept</span>
      </div>
      <div className="w-[70px] h-[40px] bg-color-23 rounded-[10px] cursor-pointer flex items-center justify-center">
        <span className="text-color-30 text-[14px]">decline</span>
      </div>
    </div>
  )
}

export { GameNotification };