"use client";

import Image from "next/image";
import Link from "next/link";



export type FriendCardProps = {
  id: number;
  nickname: string;
  firstName: string;
  lastName: string;
  avatar: string;
  cover: string;
};

export default function FriendCard({ friend }: { friend: FriendCardProps }) {
  const fullName = `${friend.firstName} ${friend.lastName}`;

  const handlePlayWith = () => {
    console.log(`Play with ${friend.nickname} with ID: ${friend.id}`);
  };

  const handleMessageToFriend = () => {
    console.log(`Message to ${friend.nickname} with ID: ${friend.id}`);
  };

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
      <div className="w-full flex items-center justify-center absolute top-[35px]">
        <div className="w-[70px] h-[70px] rounded-full relative border border-color-0 overflow-hidden cursor-pointer">
          <Link href={`/profile/${friend.id}`}>
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
      </div>
      <div className="w-full flex gap-[10px] flex-col">
        <div className="w-full flex flex-col items-center justify-center">
          <span className="font-nico-moji text-[14px] text-color-6">
            {fullName}
          </span>
          <span className="-mt-1 font-nico-moji text-[13px] text-color-29">
            {friend.nickname}
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
