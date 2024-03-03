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
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SocketContext, socket } from "@/app/SocketContext";
import { useRouter } from "next/navigation";
import NotificationItem, { NotificationItemProps } from "./NotificationItem";
import axios from "axios";
import { useQuery } from "react-query";

const msgNotification: NotificationItemProps = {
  id: "1",
  type: "MESSAGE",
  gameId: null,
  chatId: "1",
  user: {
    id: "62446",
    nickName: "odakhch",
    avatar:
      "https://cdn.intra.42.fr/users/55f4024603bd18ad1ae965334d9758de/odakhch.jpg",
  },
};

const followNotification: NotificationItemProps = {
  id: "2",
  type: "FRIEND_REQUEST",
  gameId: null,
  chatId: null,
  user: {
    id: "62446",
    nickName: "odakhch",
    avatar:
      "https://cdn.intra.42.fr/users/55f4024603bd18ad1ae965334d9758de/odakhch.jpg",
  },
};

const gameInviteNotification: NotificationItemProps = {
  id: "3",
  type: "GAME_INVITE",
  gameId: "1",
  chatId: null,
  user: {
    id: "62446",
    nickName: "odakhch",
    avatar:
      "https://cdn.intra.42.fr/users/55f4024603bd18ad1ae965334d9758de/odakhch.jpg",
  },
};

const getNotificationList = async () => {
  const res = await axios.get<NotificationItemProps[]>(
    "http://localhost:3000/notification",
    { withCredentials: true }
  );
  return res.data;
};

const NotificationIcon = () => {
  const socketClient = useContext(SocketContext);
  const [inviteGame, setInviteGame] = useState(false);
  const [gameNotif, setGameNotif] = useState<NotificationItemProps>();
  const [gamePair, setGamePair] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    socketClient.on("playRequestFromFriend", (data) => {
      setInviteGame(true);
      setGamePair(data);
      console.log("the game pair data is ========= ", data);

      const newGameInviteNotification: NotificationItemProps = {
        id: JSON.stringify(data.inviteNumber),
        type: "GAME_INVITE",
        gameId: JSON.stringify(data.inviteNumber),
        chatId: data.chatId,
        user: {
          id: data.sender.providerId,
          nickName: data.sender.nickName,
          avatar: data.sender.avatar,
        },
      };
      setGameNotif(newGameInviteNotification);
    });
  }, [socketClient]);

  const {
    data: notificationList,
    isLoading,
    isError,
    error,
  } = useQuery<NotificationItemProps[], Error>({
    queryKey: ["notificationList"],
    queryFn: getNotificationList,
  });

  const handleAcceptInvite = () => {
    socketClient.emit("acceptInviteGame", gamePair);
  };

  const handleDeclineInvite = () => {
    socketClient.emit("acceptInviteGame", gamePair);
    console.log("emit the decline of the invite in the receiver [444444]");
  };
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

            <DropdownMenuContent className="absolute h-fit sm:w-[320px] w-[250px] z-[5500] top-3 -right-4 rounded-[15px] bg-color-3 ">
              <DropdownMenuLabel className="bg-color-10 rounded-[15px] text-center text-md text-color-2">
                NOTIFICATIONS
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-color-1 mb-1" />
              <div className="w-full h-[300px] flex flex-col py-0 p-2 gap-2 overflow-x-scroll no-scrollbar">
                {isLoading && (
                  <div className="flex w-full h-full items-center justify-center text-gray-400">
                    Loading Notifications List...
                  </div>
                )}

                {isError && (
                  <div className="flex w-full h-full items-center justify-center text-red-500">
                    Error: {error.message}
                  </div>
                )}

                {/* {!isLoading &&
                  !isError &&
                  notificationList?.map((notification, index: number) => (
                    <NotificationItem notification={notification} key={index} />
                  ))} */}

                <NotificationItem notification={msgNotification} />
                <NotificationItem notification={followNotification} />

                {inviteGame && (
                  <NotificationItem
                    notification={gameNotif}
                    onAccept={handleAcceptInvite}
                    onReject={handleDeclineInvite}
                  />
                )}
              </div>
            </DropdownMenuContent>
          </div>
        </DropdownMenuTrigger>
      </DropdownMenu>
    </div>
  );
};

export default NotificationIcon;
