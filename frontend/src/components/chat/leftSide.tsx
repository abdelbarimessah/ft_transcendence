"use client";
import Btns from "./commun_component/btns";
import React, { useContext } from "react";
import Link from "next/link";
import { chatslistContext } from "@/app/ChatContext";
import FriendConversation from "./friendConversation";
import ChannelConversation from "./channelConversation";
import Image from "next/image";

function LeftSide() {
  const UserData: any = useContext(chatslistContext);

  return (
    <div className="flex flex-col border-r-[4px] border-[#F3FAFF] w-full h-full ">
      <div className="flex  justify-between items-center h-[130px]  border-b-[3px] border-[#F3FAFF] p-5">
        <Link href="/profile">
          <div className="h-[60px] w-[60px] rounded-full object-cover overflow-hidden relative">
            <Image
              sizes="(min-width: 480px) 445px, calc(90.63vw + 28px)"
              width={400}
              height={400}
              src={UserData.myId?.avatar || "/assets/Profile.svg"}
              alt="alt-img"
              draggable={false}
              priority={true}
            />
          </div>
        </Link>
        <div className="flex justify-between items-center min-w-[146px]">
          <Btns
            icon={"../../assets/chatChannelUser.svg"}
            onClick={() => {
              UserData.setWhatIcon("channel");
              UserData.setShowFriendMenu(false);
              UserData.setChatClicked([]);
            }}
          />
          <div className="h-[35px] w-[2px] bg-color-31 rounded-2 "></div>
          <Btns
            icon={"../../../assets/chatSingleUser.svg"}
            onClick={() => {
              UserData.setWhatIcon("friend");
              UserData.setShowChannelMenu(false);
              UserData.setChannelClicked([]);
            }}
          />
        </div>
      </div>
      <FriendConversation />
      <ChannelConversation />
    </div>
  );
}

export default LeftSide;
