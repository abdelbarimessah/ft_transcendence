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
import CreatPrivate from './creatPrivate'


function CreatChannel() {

    const UserData  = useContext(chatslistContext);
    const inputMessageRef = useRef(null);
    const handelSubmitrefrech = (e) =>{
        e.preventDefault();
    }

    const addChannelToLits = (channel) => {
        const newChannelList = [...UserData.channelsList, channel];
        UserData.setChannelsList(newChannelList);
    }

    const handelCreatChannel = async() =>{      
        
        if (!inputMessageRef?.current.value || !UserData.channelType)
            return toast("choose the type of your channel");
        if ((UserData.channelType == "PROTECTED" && !UserData.inputPassRef?.current.value))
            return toast("Please enter a pasword");

    try{
        console.log("UserData.channelType = ", UserData.channelType);
        console.log("pass value = ", inputMessageRef?.current.value);
        console.log("inputPass value", UserData.inputPassRef?.current?.value);
        const creatChannelResponse = await axios.post("http://localhost:3000/chat/channel/create",
        {
            name: inputMessageRef?.current.value,
            type: UserData.channelType,
            password: UserData.inputPassRef?.current?.value,
        },
        {
            withCredentials: true,
        });
        
            UserData.setPopUpOn(false);
            UserData.setChannelClicked(creatChannelResponse.data);
            UserData.setchannelType("");
            UserData.inputPassRef = "";
            addChannelToLits(creatChannelResponse.data);
            UserData.setShowInvite(true);
        }
        catch (error: any) {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.message);
            }
        }
    }

    return (
        
        <>
            <div className='flex justify-center items-center'>
                <div className='relative flex flex-col '>
                    <button className='felx place-self-end text-[25px]' onClick={() => {UserData.setchannelType(""); UserData.setPopUpOn(false)}}> X </button>
                    
                    <form onSubmit={handelSubmitrefrech}>
                        
                        <div className='flex flex-col  items-center w-[571px] h-[897px] bg-[#F3FAFF] rounded-[29px] border border-black'>
                            <div className=' flex mb-[36px] items-center justify-center text-[20px] h-[120px] w-full bg-[#FFFFFF] rounded-[29px_29px_0px_0px]'>
                                Creat your channel
                            </div>
                            <div className='flex flex-col  gap-9 items-center'> 
                                {/* to-do chose picture */}
                                <div className=''>
                                    Choose channel picture
                                </div>
                                
                                
                                {/* chose name for channel */}
                                <div className='flex w-full flex-row gap-7 justify-center items-center'>
                                    <div className='flex justify-start items-center '>
                                        chose name:
                                    </div>
                                            <input  type="text"
                                                className='flex bg-[#ffff] rounded-lg outline-none text-sm text-[#454135]  h-[40px] m-3 p-3 placeholder:text-sm placeholder:text-[#8194a3] '
                                                placeholder='type a message'
                                                ref={inputMessageRef}
                                            />
                                </div>

                                {/* choose type of channel */}
                                <div className=''> 
                                Choose type of your channel
                                </div>
                                <ul className="flex items-center justify-center  w-full gap-6 md:grid-cols-2">
                                
                                <li>
                                    <input type="radio" id="private" name="typeOfChannel" value="PRIVATE" className ="hidden peer" onClick={e=>{UserData.setchannelType(e.target.value)}}/>
                                    <label htmlFor="private" className='flex items-center justify-center w-[150px] p-5 text-[#8194a3] bg-[#FFFFFF] border rounded-lg cursor-pointer  peer-checked:border-[#6f87de] peer-checked:text-[#6f87de] hover:text-gray-600 hover:bg-gray-100'>
                                        <div>
                                            private
                                        </div>
                                    </label>

                                </li>

                                <li>
                                    <input type="radio" id="public" name="typeOfChannel" value="PUBLIC" className ="hidden peer"  onClick={e=>{UserData.setchannelType(e.target.value)}}/>
                                    <label htmlFor="public" className='flex items-center justify-center w-[150px] p-5 text-[#8194a3] bg-[#FFFFFF] border rounded-lg cursor-pointer  peer-checked:border-[#6f87de] peer-checked:text-[#6f87de] hover:text-gray-600 hover:bg-gray-100'>
                                        <div>
                                            public
                                        </div>
                                    </label>
                                    
                                </li>

                                <li>

                                    <input type="radio" id="protected" name="typeOfChannel" value="PROTECTED" className ="hidden peer" onClick={e=>{UserData.setchannelType(e.target.value)}}/>
                                    <label htmlFor="protected" className='flex items-center justify-center w-[150px] p-5 text-[#8194a3] bg-[#FFFFFF] border rounded-lg cursor-pointer  peer-checked:border-[#6f87de] peer-checked:text-[#6f87de] hover:text-gray-600 hover:bg-gray-100'> 
                                        <div>
                                            protected
                                        </div>
                                    </label>
                                </li>
                                
                                </ul>
                            </div>
                            <div className='felx flex-col justify-center items-center py-[30px]'>
                                <CreatProtected />
                            </div>

                            <button className='flex absolute bottom-0 right-0 m-[30px] p-[15px] w-fit justify-end items-end rounded-lg
                                            text-[#8194a3] bg-[#FFFFFF] border cursor-pointer hover:border-[#adf39d]  hover:text-gray-600
                                            hover:bg-[#e5f6e1]'
                                    onClick={handelCreatChannel}> submit</button>
                        </div>
                    </form>

                </div>
          </div>
        </>
        
    )
}

export default CreatChannel