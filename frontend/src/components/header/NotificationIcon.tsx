// "use client";

// import React, { useContext, useEffect, useState } from "react";
// import Image from "next/image";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { SocketContext, socket } from "@/app/SocketContext";
// import { useRouter } from "next/navigation";

// const NotificationIcon = () => {
//   const socketClient = useContext(SocketContext);
//   const [inviteGame, setInviteGame] = useState(false);
//   const [gamePair, setGamePair] = useState<any>();
//   const router = useRouter();

//   useEffect(() => {
//     socketClient.on('playRequestFromFriend', (data) => {
//       setInviteGame(true);
//       setGamePair(data);
//     })
//   })
//   useEffect(() => {
//     socketClient.on('playersReadyInvite', (data) => {

//       setTimeout(() => {
//           router.push(`/game/match?room=InviteRoom-${data.sender.providerId}-${data.receiver.providerId}-${data.inviteNumber}`);
//       }, 500)
//     })
//   }, [])

//   return (
//     <div className="w-[66px] h-[66px] bg-color-0 rounded-[22px] flex items-center justify-center  cursor-pointer relative">
//       <DropdownMenu>
//         <DropdownMenuTrigger className="focus:outline-none">
//           <div className="relative h-full w-full flex items-center justify-center ">
//             <Image
//               alt="logo"
//               height="35"
//               width="35"
//               priority={true}
//               src="/../../assets/Notification.svg"
//               draggable={false}
//             />
//             <div className="h-[10px] w-[10px] rounded-full absolute bg-color-22 border-1 border-color-0 animate-ping  top-[15px] right-[20px] flex items-center justify-center"></div>

//             <DropdownMenuContent
//               align="end"
//               className="absolute h-fit z-[1000] top-0 right-0 rounded-[15px] "
//             >
//               <DropdownMenuLabel>My Account</DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               {inviteGame &&
//                 <GameNotification gamePair={gamePair} />
//               }
//               <DropdownMenuItem>Profile</DropdownMenuItem>
//               <DropdownMenuItem>Billing</DropdownMenuItem>
//               <DropdownMenuItem>Team</DropdownMenuItem>
//               <DropdownMenuItem>Subscription</DropdownMenuItem>
//             </DropdownMenuContent>
//           </div>
//         </DropdownMenuTrigger>
//       </DropdownMenu>
//     </div>
//   );
// };

// export default NotificationIcon;

// function GameNotification(gamePair: any) {
//   const socketClient = useContext(SocketContext);
//   const handleAcceptInvite = () => {
//     socketClient.emit('acceptInviteGame', gamePair);
//     console.log('emit the accept of the invite in the receiver [444444]');
//   }

//   const handleDeclineInvite = () => {
//     console.log({message :'decline the game invite'});
//     socketClient.emit('declineInviteGame', gamePair);
//   }

//   return (
//     <div className="w-[200px] h-[50px] bg-color-6 rounded-[10px] flex items-center justify-center gap-[22px]">
//       <div onClick={handleAcceptInvite} className="w-[70px] h-[40px] bg-color-0 cursor-pointer rounded-[10px] flex items-center justify-center">
//         <span className="text-color-6 text-[14px]">accept</span>
//       </div>
//       <div onClick={handleDeclineInvite} className="w-[70px] h-[40px] bg-color-23 rounded-[10px] cursor-pointer flex items-center justify-center">
//         <span className="text-color-30 text-[14px]">decline</span>
//       </div>
//     </div>
//   )
// }

// export { GameNotification };

"use client";

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SocketContext, socket } from "@/app/SocketContext";
import NotificationItem, { NotificationProps } from "./NotificationItem";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function NotificationIcon() {
  const socketClient = useContext(SocketContext);


  const [gamePair, setGamePair] = useState<any>();
  const [notificationLists, setNotificationLists] = useState<any[]>([]);



  useEffect(() => {
    socketClient.on("notification", (data) => {
      const newNotification: NotificationProps = {
        id: data.id,
        type: data.type,
        gameId: data.inviteNumber,
        chatId: data.chatId,
        user: {
          id: data.user.id,
          providerId: data.user.providerId,
          avatar: data.user.avatar,
          nickName: data.user.nickName,
        },
      };

      setNotificationLists(prev => [...prev, newNotification]);

    });
  }, []);

  useEffect(() => {
    const getData = async () => {

      const res = await axios.get<NotificationProps[]>(
        "http://localhost:3000/notification"
      );
      console.log('notif daata', res.data);
      setNotificationLists(res.data);
    }
    getData();

  }, [])

  useEffect(() => {
    socketClient.on("playRequestFromFriend", (data) => {
      setGamePair(data);

      const newGameInviteNotification: NotificationProps = {
        id: data.sender.providerId,
        type: 'GAME_INVITE',
        gameId: data.inviteNumber,
        chatId: '',
        user: {
          id: data.sender.id,
          providerId: data.sender.providerId,
          avatar: data.sender.avatar,
          nickName: data.sender.nickName,
        },
      };

      setNotificationLists(prev => [...prev, newGameInviteNotification]);
    });
  }, []);


  // Handling READ_NOTIFICATIONS
  const handleUnreadNotifications = () => {
    socket.emit("notification");
    setNotificationLists([])
  };

  return (
    <div
      className="w-[66px] h-[66px] bg-color-0 rounded-[22px] flex items-center justify-center  cursor-pointer relative"
      onClick={handleUnreadNotifications}
    >
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <div className="relative h-full w-full flex items-center justify-center b ">
            <Image
              alt="logo"
              height="35"
              width="35"
              priority={true}
              src="/../../assets/Notification.svg"
            />
            <div className="h-[10px] w-[10px] rounded-full absolute bg-color-22 border-1 border-color-0 animate-ping  top-[15px] right-[20px] flex items-center justify-center"></div>

            <DropdownMenuContent className="absolute h-fit sm:w-[320px] w-[250px] z-[5500] top-3 -right-8 rounded-[15px] bg-color-0 border-4 border-color-5">
              <DropdownMenuLabel className="bg-color-5 rounded-[15px] text-center text-md text-color-0">
                NOTIFICATIONS
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-color-5 mb-1" />
              <div className="w-full h-[300px] flex flex-col py-0 p-2 gap-2 overflow-x-scroll no-scrollbar">
                {notificationLists?.map((notification: any, index: number) => (
                  <NotificationItem key={index} notification={notification} />
                ))}
              </div>
            </DropdownMenuContent>
          </div>
        </DropdownMenuTrigger>
      </DropdownMenu>
    </div>
  );
}
