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
import NotificationItem, { NotificationProps } from "./NotificationItem";
import axios from "axios";
import animationData from "../../../public/assets/EmptyFriends.json";
import dynamic from "next/dynamic";
import { QueryClient, useQuery, useQueryClient } from "react-query";

axios.defaults.withCredentials = true;

const getNotificationList = async () => {
  const res = await axios.get<NotificationProps[]>(
    "http://localhost:3000/notification"
  );
  return res.data;
};

export default function NotificationIcon() {
  const socketClient = useContext(SocketContext);
  const queryClient = useQueryClient();
  const router = useRouter();

  const [me, setMe] = useState<any>();

  const [gameNotif, setGameNotif] = useState<NotificationProps>();
  const [inviteGame, setInviteGame] = useState(false);
  const [gamePair, setGamePair] = useState<any>();

  const [newNotif, setNewNotif] = useState<any>();
  // Fetching the user data
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/user/me`)
      .then((res) => {
        setMe(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  //  Handling New Follow
  useEffect(() => {
    socketClient.on("notification", (data) => {
      console.log("data in New Notification ===> ", data);
      const existingNotifications =
        queryClient.getQueryData<NotificationProps[]>("notificationList") || [];

      // const newNotification: NotificationProps = {
      //   id: data.id,
      //   type: data.type,
      //   gameId: data.gameId,
      //   chatId: data.chatId,
      //   userId: data.userId,
      // };
      const newNotification: NotificationProps = {
        id: data.id,
        type: data.type,
        gameId: data.gameId,
        chatId: data.chatId,
        user: {
          providerId: data.user.providerId,
          avatar: data.user.avatar,
          nickName: data.user.nickName,
        },
      };
      setNewNotif(newNotification);

      console.log("data in New Notification ===> ", newNotification);
      console.log("data in newNotif ===> ", newNotif);

      console.log("Data in existing notifications : ", existingNotifications);

      const updatedNotifications = [...existingNotifications, newNotif];
      console.log("Data in updated notifications : ", updatedNotifications);

      queryClient.setQueryData("notificationList", updatedNotifications);
    });
  }, [socketClient, queryClient, newNotif]);

  // Handling the game invite
  // useEffect(() => {
  //   socketClient.on("playRequestFromFriend", (data) => {
  //     setInviteGame(true);
  //     setGamePair(data);
  //     const newGameInviteNotification: NotificationProps = {
  //       id: data.id,
  //       type: "GAME_INVITE",
  //       gameId: data.gameId,
  //       chatId: data.chatId,
  //       userId: data.sender.providerId,
  //     };
  //     setGameNotif(newGameInviteNotification);
  //   });
  // }, [socketClient]);

  // Fetching the notification list
  const {
    data: notificationsList,
    isLoading,
    isError,
    error,
  } = useQuery<NotificationProps[], Error>({
    queryKey: ["notificationList"],
    queryFn: getNotificationList,
  });

  const handleAcceptInvite = () => {
    socketClient.emit("acceptInviteGame", gamePair);
    router.push(
      `/game/match?room=InviteRoom-${gamePair.sender.providerId}-${gamePair.receiver.providerId}-${gamePair.inviteNumber}`
    );
    setInviteGame(false);
  };

  const handleDeclineInvite = () => {
    socketClient.emit("declineInviteGame", gamePair);
    console.log("emit the decline of the invite in the receiver [444444]");
    setInviteGame(false);
  };

  // Handling READ_NOTIFICATIONS
  const handleUnreadNotifications = () => {
    socket.emit("notification");
  };

  return (
    <div
      className="w-[66px] h-[66px] bg-color-0 rounded-[22px] flex items-center justify-center  cursor-pointer relative"
      onClick={handleUnreadNotifications}
    >
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

            <DropdownMenuContent className="absolute h-fit sm:w-[320px] w-[250px] z-[5500] top-3 -right-8 rounded-[15px] bg-color-0 border-4 border-color-5">
              <DropdownMenuLabel className="bg-color-5 rounded-[15px] text-center text-md text-color-0">
                NOTIFICATIONS
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-color-5 mb-1" />
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

                {!isLoading &&
                  !isError &&
                  notificationsList?.map((notification, index: number) => (
                    <NotificationItem key={index} notification={notification} />
                  ))}
                {/*
                {inviteGame && (
                  <NotificationItem
                    notification={gameNotif}
                    onAccept={handleAcceptInvite}
                    onReject={handleDeclineInvite}
                  />
                )} */}
              </div>
            </DropdownMenuContent>
          </div>
        </DropdownMenuTrigger>
      </DropdownMenu>
    </div>
  );
}
