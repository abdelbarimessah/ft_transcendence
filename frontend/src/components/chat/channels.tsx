"use client";
import React from "react";
import { useContext } from "react";

import { chatslistContext } from "@/app/ChatContext";
import Image from "next/image";

function Channels({ chat }: any) {
  const UserData: any = useContext(chatslistContext);

  function handelChahtConv(chatClicked: any) {
    UserData.setChannelClicked(chatClicked);
    UserData.setChatClicked([]);
  }

  return (
    // flex  flex-col justify-between items-center cursor-pointer w-full  px-3 hover:bg-[#e2eef6]
    <div
      className=" flex justify-between items-center border-t-[2px] border-[#cdd7dd] p-3 min-h-[68px] cursor-pointer w-full h-[85px] px-3 hover:bg-[#e2eef6]"
      onClick={(e) => {
        handelChahtConv(chat);
      }}
    >
      <div className="w-[60px] h-[60px] rounded-full flex justify-center items-center relative object-cover overflow-hidden">
        <Image
          src={chat.avatar || '../../../assets/DefaultChannelImage.svg'}
          alt="DefaultChannelImage"
          fill={true}
          draggable={false}
          priority={true}
          sizes="(min-width: 480px) 445px, calc(90.63vw + 28px)"
        />
      </div>
      <h1 className=" font-medium text-[#325876] ">{chat.name}</h1>
    </div>
  );
}

export default Channels;
