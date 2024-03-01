import React, { useState, useEffect, createContext, useContext, useRef } from 'react'
import Btns from './commun_component/btns'
import Link from 'next/link'
import axios from 'axios'
import Friend from './friend'
import Channels from './channels'
import { chatslistContext } from '../../app/(home)/chat/page'
import { Truck } from 'lucide-react'


function PopUpChannel() {

    const UserData : any = useContext(chatslistContext);
    const inputMessageRef = useRef(null);

    console.log("we where here !!!!");
    if (UserData.popUpOn == false) return null;


    const handelSubmitrefrech = (e) =>
    {
        e.preventDefault();
    }
    // UserData.channelsList(creatChannelResponse.data);
    // UserData.setPopUpOn(false);
    
    const handelCreatChannel = async() =>
    {
        if (!UserData.channelType || !inputMessageRef?.current.value)
            return console.log("3mer kolchi asmitk hh");
        try{
            const creatChannelResponse = await axios.post("http://localhost:3000/chat/channel/create" ,
            {
                name: inputMessageRef?.current.value,
                type: UserData.channelType,
            },
            {
                withCredentials: true, // to include cookies in the request   
            }
            );
            console.log(creatChannelResponse.data);
            UserData.setChannelsList(creatChannelResponse.data);
            UserData.setPopUpOn(false);
        }
        catch (error)
        {
            console.error("ERORR AT CREATING CHANNEL: ",error);
        }
        // console.log(UserData.channelType);
        // console.log(inputMessageRef?.current.value);
        
        // axios
        // .post(
        //     "http://localhost:3000/chat/channel/create",
        //     {
        //       name: "Channel Name",
        //       type: "PUBLIC", // or 'PROTECTED'
        //       password: "passwordIfProtected", // Include if type is PROTECTED
        //     },
        //     {
        //       withCredentials: true, // to include cookies in the request
        //     }
        // )
        // .then((response) => {
        //   console.log(response.data);
        // })
        // .catch((error) => {
        //   console.error(error);
        // });
    }

    return (
        <>
            <div className='flex justify-center items-center fixed w-screen h-screen bg-opacity-25 bg-black '>
                <div className='relative flex flex-col '>
                    <button className='felx place-self-end text-[25px]' onClick={() => {UserData.setPopUpOn(false)}}> X </button>
                    
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
                                    <input type="radio" id="private" name="typeOfChannel" value="private" className ="hidden peer" onChange={e=>{UserData.setchannelType(e.target.value)}}/>
                                    <label htmlFor="private" className='flex items-center justify-center w-[150px] p-5 text-[#8194a3] bg-[#FFFFFF] border rounded-lg cursor-pointer  peer-checked:border-[#6f87de] peer-checked:text-[#6f87de] hover:text-gray-600 hover:bg-gray-100'>
                                        <div>
                                            private
                                        </div>
                                    </label>

                                </li>
                                
                                <li>
                                    <input type="radio" id="public" name="typeOfChannel" value="public" className ="hidden peer"  onChange={e=>{UserData.setchannelType(e.target.value)}}/>
                                    <label htmlFor="public" className='flex items-center justify-center w-[150px] p-5 text-[#8194a3] bg-[#FFFFFF] border rounded-lg cursor-pointer  peer-checked:border-[#6f87de] peer-checked:text-[#6f87de] hover:text-gray-600 hover:bg-gray-100'>
                                        <div>
                                            public
                                        </div>
                                    </label>
                                    
                                </li>
                                    
                                <li>

                                    <input type="radio" id="protected" name="typeOfChannel" value="protected" className ="hidden peer" onChange={e=>{UserData.setchannelType(e.target.value)}}/>
                                    <label htmlFor="protected" className='flex items-center justify-center w-[150px] p-5 text-[#8194a3] bg-[#FFFFFF] border rounded-lg cursor-pointer  peer-checked:border-[#6f87de] peer-checked:text-[#6f87de] hover:text-gray-600 hover:bg-gray-100'> 
                                        <div>
                                            protected
                                        </div>
                                    </label>
                                </li>
                                
                                </ul>
                            </div>

                            <button className='flex absolute bottom-0 right-0 m-[30px] p-[15px] w-fit justify-end items-end rounded-lg
                             text-[#8194a3] bg-[#FFFFFF] border cursor-pointer hover:border-[#adf39d]  hover:text-gray-600 hover:bg-[#e5f6e1]' onClick={handelCreatChannel}> submit</button>
                            
                        </div>
                    </form>

                </div>
          </div>
        </>
    )
}

export default PopUpChannel