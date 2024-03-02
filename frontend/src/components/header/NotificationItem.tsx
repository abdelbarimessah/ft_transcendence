"use client";

import { SocketContext } from "@/app/SocketContext";
import axios from "axios";
import { get } from "http";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export type NotificationItemProps = {
  id: string;
  type: string;
  gameId: string | null;
  chatId: string | null;
};

type userProps = {
  id: string;
  nickName: string;
  avatar: string;
};

type Props = {
  notification: NotificationItemProps;
  onAccept?: () => void;
  onReject?: () => void;
};

export default function NotificationItem({
  notification: { id, type, gameId, chatId },
  onAccept,
  onReject,
}: Props) {
  const router = useRouter();
  const socketClient = useContext(SocketContext);

  const [userTD, setUserDT] = useState<userProps>(null);

  useEffect(() => {
    socketClient.on("playersReadyInvite", (data) => {
      setTimeout(() => {
        console.log("the game pair data is ========= ", data);
        router.push(
          `/game/match?room=InviteRoom-${data.sender.providerId}-${data.receiver.providerId}-${data.inviteNumber}`
        );
      }, 500);
    });
  }, []);

  const goToChat = () => {
    router.push(`/chat/${chatId}`);
  };
  const goToProfile = () => {
    router.push(`/profile/${id}`);
  };

  const getUserData = async (id: string) => {
    const res = await axios.get<userProps>(`http://localhost/user/${id}`);
    setUserDT(res.data);
    return res.data;
  };

  getUserData(id);

  return (
    <div className="w-full flex items-center justify-between gap-2 border-b-2 border-gray-400 pb-2">
      <Image
        alt="alt-user"
        src={userTD.avatar}
        width={40}
        height={40}
        className="rounded-full"
        priority={true}
      />

      {type === "MESSAGE" && (
        <div className="w-full flex cursor-pointer" onClick={goToChat}>
          <div className="w-full flex gap-1">
            <p className="text-color-29 font-nico-moji text-[12px]">
              <span className="font-bold text-color-5">{userTD.nickName}</span>{" "}
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

      {type === "FRIEND_REQUEST" && (
        <div className="w-full flex cursor-pointer" onClick={goToProfile}>
          <div className="w-full flex gap-1">
            <p className="text-color-29 font-nico-moji text-[12px]">
              <span className="font-bold text-color-5">{userTD.nickName}</span>{" "}
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

      {type === "GAME_INVITE" && (
        <div className="w-full flex">
          <div className="w-full flex gap-1">
            <p className="text-color-29 font-nico-moji text-[12px]">
              <span className="font-bold text-color-5">{userTD.nickName}</span>{" "}
              invited you to play
              <div className="w-full text-color-6 text-[14px] flex justify-evenly gap-3 items-center">
                <button
                  className="rounded-[15px] w-full p-2 bg-color-0"
                  onClick={onAccept}
                >
                  Accept
                </button>
                <button
                  className="rounded-[15px] w-full p-2 bg-color-23"
                  onClick={onReject}
                >
                  Decline
                </button>
              </div>
            </p>
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
