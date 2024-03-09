import { channel } from "diagnostics_channel";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { createContext, useContext } from "react";
import { chatslistContext } from "@/app/ChatContext";
import { toast } from "sonner";
import { socket } from "@/app/SocketContext";

function InviteFriendListe({ chat, friendLinst }: any) {
  const UserData: any = useContext(chatslistContext);

  let friend: any;

  UserData.showInvite === true
    ? (friend =
      UserData.myId.id != chat.members[0].id
        ? chat.members[0]
        : chat.members[1])
    : UserData.showNewFriendsList === true && (friend = friendLinst);

  const addUserToChannel = async (chatClicked: any) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/chat/channel/${UserData.channelClicked.id}/add`,
        {
          userId: chatClicked.id,
        },
        {
          withCredentials: true,
        }
      );

    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      }
    }
  };

  const addUserToFriendList = async (chatClicked: any) => {
    try {
      const newFriendresponse = await axios.post(
        "http://localhost:3000/chat/create",
        {
          userId: chatClicked.id,
        },
        {
          withCredentials: true,
        }
      );

    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      }
    }
  };

  function handelInvite(chatClicked: any) {
    if (UserData.showInvite) addUserToChannel(chatClicked);
    else if (UserData.showNewFriendsList) addUserToFriendList(chatClicked);
  }

  return (
    <div className="flex justify-between items-center border-t-[2px] border-[#cdd7dd] p-3 h-[65px] w-[320px] ">
      <div className="flex flex-row justify-between items-center">
        <div className="flex pr-4">
          <img
            src={friend.avatar}
            alt={friend.nickName}
            className="flex justify-between items-center rounded-full w-[50px] "
          />
        </div>
        <span className='font-nico-moji text-color-6 text-sm capitalize'>
          {`${friend.nickName.substring(0, 10)}${friend.nickName.length > 10 ? '..' : ''} `}
        </span>
      </div>
      <button
        className="flex justify-center items-center px-2 rounded-lg   bg-color-6 cursor-pointer border-2 border-color-6 hover:scale-105  hover:text-gray-600 hover:bg-[#d8e6ff] text-white"
        onClick={(e) => {
          handelInvite(friend);
        }}
      >
        +
      </button>
    </div>
  );
}

export default InviteFriendListe;
