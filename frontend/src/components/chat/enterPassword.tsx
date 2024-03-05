import React from "react";
import { useState, useContext } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { chatslistContext } from '../../app/(home)/chat/page'
import CreatChannel from "./creatChannel";
import JoinChannel from "./joinChannel";
import axios from "axios";
import { toast } from "sonner";


function EnterPassword() {

    const UserData :any = useContext(chatslistContext);
    console.log("UserData.channelToJoin im at enter pass = ", UserData.channelToJoin);

    if(UserData.needPassword === true)
    {
        const addNewChannelToList = (channel: string) => {        
            const newChannelToAdd = [...UserData.channelsList, channel];
            UserData.setChannelsList(newChannelToAdd);
        }
    
        const addChannelToList = async() => {
            
            try {
                const joinResponse = await axios.post(
                    `http://localhost:3000/chat/channel/${UserData.channelToJoin.id}/join`,
                    {
                        password: UserData.inputEnterPassRef?.current?.value,
                    },
                    {
                        withCredentials: true,
                    }
                    );
                    console.log("joinResponse.data here here:", joinResponse.data);
                    addNewChannelToList(joinResponse.data)
                    UserData.setPopUpOn(false);
                    UserData.setNeedPassword(false);
                } 
                catch (error: any) {
                    if (error.response) {
                        toast.error(error.response.data.message);                    
                }
            }
            
        }
        
        
        const handelChanneltoJoin =  () =>{
            
            console.log("UserData.inputEnterPassRef?.current?.value = >", UserData.inputEnterPassRef?.current?.value);
            UserData.setChannelToJoin(UserData.channelToJoin)
            addChannelToList();
            console.log("channelToJoin im at handelChanneltoJoin <= =>", UserData.channelToJoin.id);
        }

        return   (
            <>
                <div className=" bg-opacity-55 bg-black  flex justify-center items-center fixed w-screen h-screen">
                    <div className="felx justify-center items-center flex-col px-3 bg-[#e4f1fa] rounded-2xl"> 
                        <button className="felx place-self-end text-[25px]" onClick={() => {UserData.setchannelType(""); UserData.setNeedPassword(false)}}>X</button>
                        <div className= "w-fit px-2 flex flex-row gap-3 justify-center items-center rounded-lg">
                            Enter password:
                            <input  type="text"
                                className='flex bg-[#FFFFFF] rounded-lg outline-none text-sm text-[#454135]  h-[40px] m-3 p-3 placeholder:text-sm placeholder:text-[#8194a3] '
                                placeholder='Enter password ...'
                                ref={UserData.inputEnterPassRef}
                            />
                        </div>
                     
                        <div className="felx justify-items-end pl-[335px] pb-3 items-end ">
                            <button className='flex justify-center p-[15px]   rounded-lg w-[130px]
                                                    text-[#8194a3] bg-[#FFFFFF] border cursor-pointer hover:border-[#adf39d]  hover:text-gray-600
                                                    hover:bg-[#e5f6e1]'
                                                    onClick={e  => {handelChanneltoJoin()}}>
                                Join
                            </button>
                        </div>
                    </div> 
                </div>
            </>
        )
    }
}

export default EnterPassword
