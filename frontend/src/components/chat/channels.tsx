import { channel } from 'diagnostics_channel'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {createContext, useContext } from 'react'

import { chatslistContext } from '../../app/(home)/chat/page'




function Channels ({chat}: any) {
    
    const UserData: any	 = useContext(chatslistContext);
    
    
    function handelChahtConv (chatClicked: any){
        UserData.setChannelClicked(chatClicked);
        UserData.setChatClicked([]);
    }

    return(
        <div    className='flex justify-between items-center border-t border-[#070401] p-3 min-h-[68px] hover:bg-slate-400'
        onClick={e  => {handelChahtConv(chat)}}>
                
                {/* <img    src="channel pic"
                        alt="channel pic"
                        className=' rounded-full w-[60px] ' /> */}
                    <h1> pic here </h1>
                    <h1 className=' font-medium '>{chat.name}</h1>
        
            </div>
    )
}


export default Channels
