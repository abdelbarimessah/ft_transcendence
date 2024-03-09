import { channel } from "diagnostics_channel";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { createContext, useContext } from "react";
import { chatslistContext } from "../../app/(home)/chat/page";
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
    console.log("chatClicked", chatClicked);
    console.log("UserData.channelClicked", UserData.channelClicked);
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

      console.log(response.data.message);
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      }
    }
  };

  // const addUserToFriendListToList = () => {
  //   const UserData = useContext(chatslistContext);
  //   //check exist
  //   UserData.friendsList = [];
  //   const new
  // }

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
      // console.log('current friend list', UserData.friendsList)
      // console.log('res after chat created: ', newFriendresponse.data)
      // console.log('friend exists: ', friendExists)
      
      // const friendExists = UserData.friendsList.some(user => user.id === newFriendresponse.data.id)
      // if(!friendExists){
      //   const newList = [...UserData.friendsList, newFriendresponse.data]
      //   console.log('new list: ', newList);
      //   UserData.setFriendsList(newList);
      // }
      // UserData.setShowNewFriendsList(false);
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
        <h1 className=" font-medium text-[#325876]">{friend.nickName}</h1>
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
