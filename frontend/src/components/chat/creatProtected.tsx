import React, { useState, useEffect, createContext, useContext, useRef } from 'react'
import Btns from './commun_component/btns'
import Link from 'next/link'
import axios from 'axios'
import Friend from './friend'
import Channels from './channels'
import { chatslistContext } from '../../app/(home)/chat/page'
import { Truck } from 'lucide-react'
import { log } from 'console'
import { toast } from 'sonner'


function CreatChannel() {

    const userData = useContext(chatslistContext);
    
    
    if (userData.channelType === "PROTECTED")
    {
        return (
            <>
                <div className='felx justify-center items-center'>
                <div className='flex w-full flex-row gap-7 justify-center items-center'>
                                    <div className='flex justify-start items-center '>
                                            Enter password:
                                    </div>
                                    
                                            <input  type="text"
                                                className='flex bg-[#ffff] rounded-lg outline-none text-sm text-[#454135]  h-[40px] m-3 p-3 placeholder:text-sm placeholder:text-[#8194a3] '
                                                placeholder='type a message'
                                                ref={userData.inputPassRef}
                                                
                                                
                                                />
                                </div>
                </div>
            </>
        )
    }
}

export default CreatChannel