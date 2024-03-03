import React, {useContext, useRef, useEffect} from 'react'
import Btns from './commun_component/btns'
import Link from 'next/link'
import { chatslistContext } from '../../app/(home)/chat/page'
import Image from 'next/image';
import Messages from './messages';
import Moment from 'react-moment';
import 'moment-timezone';
import axios from 'axios';
import { SocketContext } from '@/app/SocketContext';
import FriendRightSide from './friendRightSide';
import ChannelRightSide from './channelRightSide';
import Channels from './channels';
import ChannelsToJoin from './listJoinChannel';


function JoinChannel () {

    const UserData :any = useContext(chatslistContext);
    const inputMessageRef = useRef(null);

    console.log("channel list = ", UserData.ChannelsList);
    return (
        <>
            <div className='flex justify-center items-center '>
                <div className=' relative flex flex-col'>
                    <button className='felx place-self-end text-[25px]' onClick={() => {UserData.setPopUpOn(false)}}> X </button>
                        
                        <div className='flex flex-col items-center w-[571px] h-[897px] bg-[#F3FAFF] rounded-[29px] border border-black'>
                            <div className='flex mb-[36px] items-center justify-center text-[20px] h-[120px] w-full bg-[#FFFFFF] rounded-[29px_29px_0px_0px] '>
                                Join Channel
                            </div>
                                <div className='border-b-[1px] '> Join for Endless Fun and Excitement </div>
                            <div className='flex w-full overflow-hidden flex-col gap-9 mt-4'> 
                                {/* to-do chose picture */}
                                <div className='flex flex-col no-scrollbar overflow-y-scroll  cursor-pointer h-full w-full  px-3'>
                                    {UserData.listChannelsToJoin.map((chat) => {							
                                    return <ChannelsToJoin key={chat.id} channelToJoin={chat}/>;
                                    })}
                                    {/* {UserData.listChannelsToJoin.map((chat) => {
                                        console.log("chat to join ==>", chat);
                                        
                                    })} */}
                                </div>

                            </div>
                        </div>
                </div>
            </div>

        </>
    )
    
}

export default JoinChannel



