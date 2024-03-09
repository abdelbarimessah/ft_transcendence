import React from "react";
import { useContext } from "react";
import { chatslistContext } from "@/app/ChatContext";
import Image from "next/image";

function Friend({ chat }: any) {
  const UserData: any = useContext(chatslistContext);
  function handelChahtConv(chatClicked: any) {
    UserData.setChatClicked(chatClicked);
    const myBlockedList =
      UserData.myId.id === chatClicked.members[0].id
        ? chatClicked.members[0]?.blockedUsers
        : chatClicked.members[1]?.blockedUsers;
    UserData.setBlockList(myBlockedList);

    UserData.setChannelClicked([]);
  }

  return (
    <div
      className="flex justify-between items-center border-t-[2px] border-[#cdd7dd] p-3 min-h-[68px] cursor-pointer w-full h-[85px] px-3 hover:bg-[#e2eef6]"
      onClick={(e) => {
        handelChahtConv(chat);
      }}
    >
      <Image
        src={
          UserData.myId.id != chat.members[0].id
            ? chat.members[0].avatar
            : chat.members[1].avatar
        }
        alt="alt-img"
        className=" rounded-full w-[60px] "
        height={60}
        width={60}
      />
      <h1 className=" font-medium text-[#325876]">
        {UserData.myId.id != chat.members[0].id
          ? chat.members[0].nickName
          : chat.members[1].nickName}
      </h1>
    </div>
  );
}

export default Friend;
