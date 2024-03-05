
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
import CreatProtected from './creatProtected'
import { channel } from 'diagnostics_channel'
import InviteFriend from './inviteFriend'


function CreatPrivate() {

    const UserData = useContext(chatslistContext);

    if (UserData.channelType === "PRIVATE")
    {
        return(
            <>
                <div className='felx flex-col gap-3 justify-center items-center '>
                    <div className='pb-2 '> Invite your friend and have fun </div>
                    <div className='felx  flex-col justify-between items-center w-full h-[65px] px-3'>
                         {UserData.friendsList.map((chat) => {								
                            return <InviteFriend key={chat.id} chat={chat}/>;
                        })}
                    </div>

                </div>
            </>
        )
    }
}

export default CreatPrivate