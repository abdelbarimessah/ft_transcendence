
import { channel } from 'diagnostics_channel'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {createContext, useContext } from 'react'
import { chatslistContext } from "@/app/ChatContext";




function Friend ({chat}: any) {
    
    const UserData: any	 = useContext(chatslistContext);
    function handelChahtConv (chatClicked: any){
        UserData.setChatClicked(chatClicked);
        const myBlockedList = UserData.myId.id === chatClicked.members[0].id ? chatClicked.members[0]?.blockedUsers : chatClicked.members[1]?.blockedUsers;
        UserData.setBlockList(myBlockedList)

        UserData.setChannelClicked([]);
    }


    return(
        <div    className='flex justify-between items-center border-t-[2px] border-[#cdd7dd] p-3 min-h-[68px] cursor-pointer w-full h-[85px] px-3 hover:bg-[#e2eef6]'
        onClick={e  => {handelChahtConv(chat)}}>

                <img    src={UserData.myId.id != chat.members[0].id ? chat.members[0].avatar: chat.members[1].avatar}
                        alt={UserData.myId.id != chat.members[0].id ? chat.members[0].nickName: chat.members[1].nickName}
                        className=' rounded-full w-[60px] ' />
                    <h1 className=' font-medium text-[#325876]'>{UserData.myId.id != chat.members[0].id ? chat.members[0].nickName: chat.members[1].nickName}</h1>
            </div>
    )
}

export default Friend