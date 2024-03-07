"use client";

import { SocketContext } from "@/app/SocketContext";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";


export type NotificationProps = {
  id: string;
  type: string;
  gameId: string | null;
  chatId: string | null;
  user: {
    id: string;
    providerId: string;
    avatar: string;
    nickName: string;
  };
};

export default function NotificationItem(
  {
    notification,
  }: {
    notification: NotificationProps;
  },
) {

  const [me, setMe] = useState<any>();

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

  const handleAcceptInvite = () => {
    
    const gamePair = {
      sender : {
        providerId: notification.user.providerId,

      },
      receiver : {
        providerId: me.providerId,
      },
      inviteNumber:  notification.gameId,
    }
    
    socketClient.emit("acceptInviteGame", gamePair);
    router.push(
      `/game/match?room=InviteRoom-${notification.user.providerId}-${me.providerId}-${notification.gameId}`
    );

  }

  const handleDeclineInvite = () => {
    const gamePair = {
      sender : {
        providerId: notification.user.providerId,

      },
      receiver : {
        providerId: me.providerId,
      },
      inviteNumber:  notification.gameId,
    }
    socketClient.emit("declineInviteGame", gamePair);
  }
  const router = useRouter();
  const socketClient = useContext(SocketContext);
  console.log("Notification received in NotificationItem -> ", notification);

  useEffect(() => {
    socketClient.on("playersReadyInvite", (data) => {
      
      setTimeout(() => {
        router.push(
          `/game/match?room=InviteRoom-${data.sender.providerId}-${data.receiver.providerId}-${data.inviteNumber}`
        );
      }, 500);
    });
  });

  const goToChat = () => {
    router.push(`/chat/${notification.chatId}`);
  };
  const goToProfile = () => {
    router.push(`/profile/${notification.user.providerId}`);
  };

  return (
    <div className="w-full flex items-center justify-between gap-2 border-b-2 border-gray-400 pb-2">
      <Image
        alt="alt-user"
        src={
          notification.user ? notification.user.avatar : "/assets/Add-User.png"
        }
        width={40}
        height={40}
        className="rounded-full"
        priority={true}
      />

      {notification.type === "MESSAGE" && (
        <div className="w-full flex cursor-pointer" onClick={goToChat}>
          <div className="w-full flex gap-1">
            <p className="text-color-29 font-nico-moji text-[12px]">
              <span className="font-bold text-color-5">
                {notification.user.nickName}
              </span>{" "}
              sent you a message
            </p>
            <div className="flex justify-center items-center">
              <Image
                alt="alt-user"
                src="/assets/NewMessage.png"
                width={38}
                height={15}
                priority={true}
              />
            </div>
          </div>
        </div>
      )}

      {notification.type === "FRIEND_REQUEST" && (
        <div className="w-full flex cursor-pointer" onClick={goToProfile}>
          <div className="w-full flex gap-1">
            <p className="text-color-29 font-nico-moji text-[12px]">
              <span className="font-bold text-color-5">
                {notification.user.nickName}
              </span>{" "}
              started following you
            </p>
            <div className="flex justify-center items-center">
              <Image
                alt="alt-user"
                src="/assets/NewFollower.png"
                width={38}
                height={38}
                priority={true}
              />
            </div>
          </div>
        </div>
      )}

      {notification.type === "GAME_INVITE" && (
        <div className="w-full flex">
          <div className="w-full flex gap-1">
            <div className="text-color-29 font-nico-moji text-[12px]">
              <span className="font-bold text-color-5">
                {notification.user.nickName}
              </span>{" "}
              invited you to play
              <div className="w-full text-color-6 text-[14px] flex justify-evenly gap-3 items-center">
                <button
                  className="rounded-[15px] w-full p-2 bg-color-0"
                  onClick={handleAcceptInvite}
                >
                  Accept
                </button>
                <button
                  className="rounded-[15px] w-full p-2 bg-color-23"
                  onClick={handleDeclineInvite}
                >
                  Decline
                </button>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <Image
                alt="alt-user"
                src="/assets/GameInvite.png"
                width={38}
                height={38}
                priority={true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
