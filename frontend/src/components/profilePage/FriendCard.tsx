"use client";

import { SocketContext, socket } from "@/app/SocketContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export type FriendCardProps = {
  id: number;
  providerId: string;
  nickName: string;
  firstName: string;
  lastName: string;
  avatar: string;
  cover: string;
};

export default function FriendCard({
  friend,
  user,
}: {
  friend: FriendCardProps;
  user: FriendCardProps;
}) {
  const socketClient = useContext(SocketContext);
  const fullName = `${friend.firstName} ${friend.lastName}`;
  const [status, setStatus] = useState("offline");
  const router = useRouter();

  const handlePlayWith = () => {
    socketClient.emit("playInvite", { sender: user, receiver: friend });

    setTimeout(() => {
      router.push(
        `/game/waiting?room=InviteRoom-${user.providerId}-${friend.providerId}`
      );
    }, 500);
  };

  const handleMessageToFriend = () => {
  };

  useEffect(() => {
    socketClient.on("User-status", (data) => {
      if (data.providerId === friend.providerId) {
        setStatus(data.status);
      }
    });
    if(user)  socketClient.emit('User-status', { status: 'online',  providerId : user.providerId});

    // return () => {
    //   socketClient.off("User-status");
    // };
  });

  return (
    <div className=" w-[200px] h-[200px] bg-color-30 rounded-[22px] relative overflow-hidden flex  flex-col gap-[40px] hover:opacity-90 hover:scale-[1.01]">
      <div className="w-full h-[69px] relative overflow-hidden ">
        <Image
          src={friend.cover}
          alt="Cover"
          height={69}
          width={200}
          priority={true}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="w-full flex items-center justify-center absolute top-[35px] ">
        <div className="w-[70px] h-[70px] rounded-full relative border border-color-0 overflow-hidden cursor-pointer">
          <Link href={`/profile/${friend.providerId}`}>
            <Image
              src={friend.avatar}
              alt="Avatar"
              height={70}
              width={70}
              priority={true}
              className="object-cover w-full h-full"
            />
          </Link>
        </div>
        <div
          className=" statusDiv w-[10px] h-[10px] rounded-full bg-color-21 absolute bottom-2 left-[61%] z-50´"
          style={{
            backgroundColor:
              status === "online"
                ? "green"
                : status === "inGame"
                ? "gray"
                : "red",
          }}
        ></div>
      </div>
      <div className="w-full flex gap-[10px] flex-col ">
        <div className="w-full flex flex-col items-center justify-center">
          <span className="font-nico-moji text-[14px] text-color-6">
            {fullName}
          </span>
          <span className="-mt-1 font-nico-moji text-[13px] text-color-29">
            @{friend.nickName}
          </span>
        </div>
        <div className="w-full flex items-center justify-center gap-[18px]">
          <button
            className="w-[80px] h-[28px] bg-color-6 rounded-[10px] cursor-pointer flex items-center justify-center gap-[5px]"
            onClick={handlePlayWith}
          >
            <div className="w-[12px] h-[12px] relative overflow-hidden">
              <Image
                src="/../../assets/playWithIcon.svg"
                alt="Leader Board Icon"
                fill={true}
                priority={true}
                className="object-cover w-full h-full"
              />
            </div>
            <span className="font-nico-moji text-[8px] text-color-0">
              Play With
            </span>
          </button>
          <button
            className="w-[80px] h-[28px] bg-color-6 rounded-[10px] cursor-pointer flex items-center justify-center gap-[5px]"
            onClick={handleMessageToFriend}
          >
            <div className="w-[12px] h-[12px] relative overflow-hidden ">
              <Image
                src="/../../assets/sendMessageIcon.svg"
                alt="Leader Board Icon"
                fill={true}
                priority={true}
                className="object-cover w-full h-full"
              />
            </div>
            <span className="font-nico-moji text-[8px] text-color-0">
              Message
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
