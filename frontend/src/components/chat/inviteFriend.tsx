
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
import InviteFriendListe from './inviteFriendListe'


function InviteFriend() {

    const UserData :any = useContext(chatslistContext);

    if (UserData.showInvite === true)
    {
        return(
            <>
            <div className='bg-opacity-25 bg-black  flex justify-center items-center fixed w-screen h-screen'>
                <div className='flex flex-col items-center w-[571px] h-[500px] bg-[#F3FAFF] rounded-[29px] border border-black'>
                <button className='felx place-self-end text-[25px] p-2' onClick={() => {UserData.setShowInvite(false)}}> X </button>

                    <div className='felx flex-col gap-[50px] justify-center items-center '>
                    
                        <div className=' flex'> Invite your friend and have fun </div>
                    
                        <div className='felx pt-5 flex-col justify-between items-center w-full h-[65px] px-3'>
                         {UserData.friendsList.map((chat:any) => {								
                             return <InviteFriendListe key={chat.id} chat={chat}/>;
                            })}
                        </div>
                    </div>

                </div>
            </div>
            </>
        )
    }
}

export default InviteFriend