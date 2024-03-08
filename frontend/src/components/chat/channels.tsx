import { channel } from 'diagnostics_channel'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {createContext, useContext } from 'react'

import { chatslistContext } from '../../app/(home)/chat/page'
import { toast } from 'sonner';




function Channels ({chat}: any) {
    
    const UserData: any	 = useContext(chatslistContext);

    function handelChahtConv (chatClicked: any){

        UserData.setChannelClicked(chatClicked);
        UserData.setChatClicked([]);
    }

    return(// felx  flex-col justify-between items-center cursor-pointer w-full  px-3 hover:bg-[#e2eef6]
        <div    className=' flex justify-between items-center border-t-[2px] border-[#cdd7dd] p-3 min-h-[68px] cursor-pointer w-full h-[85px] px-3 hover:bg-[#e2eef6]'
        onClick={e  => {handelChahtConv(chat)}}>

                <img    src="../../assets/friend_icon.png"
                        alt="channel pic"
                        className=' rounded-full w-[60px] ' />
                    {/* <h1> pic here </h1> */}
                    <h1 className=' font-medium text-[#325876] '>{chat.name}</h1>
        
            </div>
    )
}


export default Channels



