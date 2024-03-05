
import { channel } from 'diagnostics_channel'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {createContext, useContext } from 'react'
import { chatslistContext } from '../../app/(home)/chat/page'

function InviteFriend ({chat}: any) {
    
    const UserData: any	 = useContext(chatslistContext);
    
    
    
    
    function handelChahtConv (chatClicked: any){
        UserData.setChatClicked(chatClicked);
        UserData.setChannelClicked([]);
    }
    
    return(
        <div    className='flex justify-between items-center border-t-[2px] border-[#cdd7dd] p-3 h-[65px]'>
                <div className='flex flex-row justify-between items-center'>
                    <div className='flex pr-4'>
                        <img    src={UserData.myId.id != chat.members[0].id ? chat.members[0].avatar: chat.members[1].avatar}
                                alt={UserData.myId.id != chat.members[0].id ? chat.members[0].nickName: chat.members[1].nickName}
                                className='flex justify-between items-center rounded-full w-[50px] ' />

                    </div>
                        <h1 className=' font-medium text-[#325876]'>{UserData.myId.id != chat.members[0].id ? chat.members[0].nickName: chat.members[1].nickName}</h1>
                </div>
                    <button className='flex justify-center p-[15px] rounded-lg w-[95px]
                                                    text-[#8194a3] bg-[#FFFFFF] border cursor-pointer hover:border-[#adf39d]  hover:text-gray-600
                                                    hover:bg-[#e5f6e1]'
                                                    onClick={e  => {handelChahtConv("dsd")}}>
                                Invite
                            </button>
            </div>
    )
}


export default InviteFriend