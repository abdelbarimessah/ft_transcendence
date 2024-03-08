
import { channel } from 'diagnostics_channel'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {createContext, useContext } from 'react'

import { chatslistContext } from '../../app/(home)/chat/page'
import InviteFriendListe from './inviteFriendListe';



function ShowListNewFriend ()
{
    const userData :any = useContext(chatslistContext);
    if (userData.showNewFriendsList === true)
    {
        return(
            <>
            <div className='bg-opacity-25 bg-black  flex justify-center items-center fixed w-screen h-screen'>
                <div className='flex flex-col items-center w-[571px] h-[500px] bg-[#F3FAFF] rounded-[29px] border border-black'>
                <button className='felx place-self-end text-[25px] p-2' onClick={() => {userData.setShowNewFriendsList(false)}}> X </button>

                    <div className='felx flex-col gap-[50px] justify-center items-center '>
                    
                        <div className=' flex'> Start new chat </div>
                    
                        <div className='felx pt-5 flex-col justify-between items-center w-full h-[65px] px-3'>
                         {userData.newFriendsList.map((friendLinst :any) => {								
                             return <InviteFriendListe key={friendLinst.id} chat={undefined} friendLinst={friendLinst}/>;
                            })}
                        </div>
                    </div>

                </div>
            </div>
            </>
        )
    }
}

export default ShowListNewFriend