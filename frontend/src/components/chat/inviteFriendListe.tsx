
import { channel } from 'diagnostics_channel'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {createContext, useContext } from 'react'
import { chatslistContext } from '../../app/(home)/chat/page'
import { toast } from 'sonner';
import { socket } from '@/app/SocketContext';

function InviteFriendListe ({chat, friendLinst}: any) {
    
  const UserData: any	 = useContext(chatslistContext);
  
  let friend :any;

  UserData.showInvite === true ?  (friend = UserData.myId.id != chat.members[0].id ? chat.members[0]: chat.members[1]) :
  UserData.showNewFriendsList === true && (friend = friendLinst)
  
  

    const addUserToChannel = async (chatClicked :any) =>{
        console.log("chatClicked", chatClicked);
        console.log("UserData.channelClicked", UserData.channelClicked);
          try {
          const response = await axios.post(`http://localhost:3000/chat/channel/${UserData.channelClicked.id}/add`,
          {
            userId: chatClicked.id,
          },
          {
            withCredentials: true,
          });

          console.log(response.data.message);
        } 
        catch (error: any) {
          if (error.response && error.response.status === 400) {
              toast.error(error.response.data.message);
          }
      }
    }

    const addUserToFriendList = async (chatClicked :any) =>{
      try {
        const newFriendresponse = await axios.post("http://localhost:3000/chat/create",
        {
          userId: chatClicked.id,
        },
        {
          withCredentials: true,
        });
      } 
        catch (error: any) {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.message);
            }
        }
    }

    function handelInvite (chatClicked: any){
      if (UserData.showInvite)
        addUserToChannel(chatClicked);
      else if (UserData.showNewFriendsList)
        addUserToFriendList(chatClicked);
    }

    return(
      
      <div    className='flex justify-between items-center border-t-[2px] border-[#cdd7dd] p-3 h-[65px]'>
                <div className='flex flex-row justify-between items-center'>
                    <div className='flex pr-4'>
                        <img    src={friend.avatar}
                                alt={friend.nickName}
                                className='flex justify-between items-center rounded-full w-[50px] ' />

                    </div>
                        <h1 className=' font-medium text-[#325876]'>{friend.nickName}</h1>
                </div>
                    <button className='flex justify-center p-[15px] rounded-lg w-[95px]
                                                    text-[#8194a3] bg-[#FFFFFF] border cursor-pointer hover:border-[#adf39d]  hover:text-gray-600
                                                    hover:bg-[#e5f6e1]'
                                                    onClick={e  => {handelInvite(friend)}}>
                                Invite
                            </button>
            </div>
    )
}


export default InviteFriendListe