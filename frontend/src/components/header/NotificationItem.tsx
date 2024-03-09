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

export default function NotificationItem({
  notification,
}: {
  notification: NotificationProps;
}) {
  const [me, setMe] = useState<any>();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/user/me`)
      .then((res) => {
        setMe(res.data);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
  }, []);

  const handleAcceptInvite = () => {
    const gamePair = {
      sender: {
        providerId: notification.user.providerId,
      },
      receiver: {
        providerId: me.providerId,
      },
      inviteNumber: notification.gameId,
    };

    socketClient.emit("acceptInviteGame", gamePair);
    router.push(
      `/game/match?room=InviteRoom-${notification.user.providerId}-${me.providerId}-${notification.gameId}`
    );
  };

  const handleDeclineInvite = () => {
    const gamePair = {
      sender: {
        providerId: notification.user.providerId,
      },
      receiver: {
        providerId: me.providerId,
      },
      inviteNumber: notification.gameId,
    };
    socketClient.emit("declineInviteGame", gamePair);
  };
  const router = useRouter();
  const socketClient = useContext(SocketContext);

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
    router.push(`/chat/`);
  };
  const goToProfile = () => {
    router.push(`/profile/${notification.user.providerId}`);
  };

  return (
    <div className="w-full flex items-center justify-between gap-2 border-b-2 border-gray-400 pb-2">
      <Image
        alt="alt-user"
        src={notification.user.avatar}
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
                src="/assets/Message.svg"
                width={35}
                height={13}
                priority={true}
                draggable={false}
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
                src="/assets/AddUser.svg"
                width={18}
                height={30}
                priority={true}
                draggable={false}
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
              <div className="w-full text-color-6 text-[11px] flex justify-center gap-3 py-2 items-center">
                <button
                  className="rounded-[15px] px-4 py-1 bg-color-6 text-color-0 hover:scale-105"
                  onClick={handleAcceptInvite}
                >
                  Accept
                </button>
                <button
                  className="rounded-[15px] py-1 px-4 border-[1px] hover:border-2 hover:scale-105 border-color-5 text-color-5"
                  onClick={handleDeclineInvite}
                >
                  Decline
                </button>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <Image
                alt="alt-user"
                src="/assets/Game.svg"
                width={25}
                height={12}
                priority={true}
                draggable={false}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
