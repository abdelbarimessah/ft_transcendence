
import { channel } from 'diagnostics_channel'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {createContext, useContext } from 'react'
import { chatslistContext } from '../../app/(home)/chat/page'
import { toast } from 'sonner';
import { socket } from '@/app/SocketContext';

function InviteFriendListe ({chat}: any) {
    
  const UserData: any	 = useContext(chatslistContext);
  
  const frinend = UserData.myId.id != chat.members[0].id ? chat.members[0]: chat.members[1];
  
  
  const addNewChannelToList = (channel :any) => {   
    const exists = UserData.channelsList.some(item  => item.id === channel.id);
    
    if (exists === false)
    {
      const newChannelToAdd = [...UserData.channelsList, channel];
      UserData.channelClicked(channel);
      UserData.setChannelsList(newChannelToAdd);
      
    }
  }
  
  useEffect(() => {
    socket.on("userJoined", (data) => {
      addNewChannelToList(data.channel);
      console.log("channel == ", data.channel);
      console.log("channelClicked == ", UserData.channelClicked);
    });
    return (() => {
        socket.off("userJoined")
    })
  }), [];

  const addUserToChannel = async (chatClicked) =>{
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
      
    
    
    function handelInvite (chatClicked: any){
      // console.log("chatClicked at handelInvite", chatClicked);
      
      addUserToChannel(chatClicked);
      // console.log("channelClicked =><=", UserData.channelClicked);
    }

    return(
      
      <div    className='flex justify-between items-center border-t-[2px] border-[#cdd7dd] p-3 h-[65px]'>
                <div className='flex flex-row justify-between items-center'>
                    <div className='flex pr-4'>
                        <img    src={frinend.avatar}
                                alt={frinend.nickName}
                                className='flex justify-between items-center rounded-full w-[50px] ' />

                    </div>
                        <h1 className=' font-medium text-[#325876]'>{frinend.nickName}</h1>
                </div>
                    <button className='flex justify-center p-[15px] rounded-lg w-[95px]
                                                    text-[#8194a3] bg-[#FFFFFF] border cursor-pointer hover:border-[#adf39d]  hover:text-gray-600
                                                    hover:bg-[#e5f6e1]'
                                                    onClick={e  => {handelInvite(frinend)}}>
                                Invite
                            </button>
            </div>
    )
}


export default InviteFriendListe