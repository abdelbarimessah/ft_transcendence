import {createContext, useContext, useRef } from 'react'

import { chatslistContext } from "@/app/ChatContext";
import { toast } from 'sonner';
import { socket } from '@/app/SocketContext';
import axios from 'axios';
import EnterPassword from './enterPassword';




function ChannelsToJoin ({channelToJoin}: any) {
const backendUrl = process.env.BACKEND_URL || "http://localhost:3000";

    
    const UserData: any	 = useContext(chatslistContext);
    

    const addNewChannelToList = (channel :string) => {        
        const newChannelToAdd = [...UserData.channelsList, channel];
        UserData.setChannelsList(newChannelToAdd);
    }

    const addChannelToList = async(channelToJoin:any) => {

        try {
            const joinResponse = await axios.post(
              `${backendUrl}/chat/channel/${channelToJoin.id}/join`,
              {
                password: UserData.inputEnterPassRef?.current?.value,
              },
              {
                withCredentials: true,
              }
            );
            UserData.setChannelClicked(joinResponse.data);
            addNewChannelToList(joinResponse.data)
        } 
        catch (error: any) {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.message);
            }
        }
          
    }


    const handelChanneltoJoin =  (channelToJoin: any)=>{
        if (channelToJoin.type === "PROTECTED")
        {
            UserData.setChannelToJoin(channelToJoin)
            UserData.setNeedPassword(true);
        }
        else
        {
            addChannelToList(channelToJoin);
            UserData.setPopUpOn(false);
        }
    }

    return(
        <div    className=' flex justify-between items-center border-t-[2px] border-[#cdd7dd] p-3 min-h-[68px]'>
                <div className='flex justify-between items-center p-[10px]'>

                    <img    src="../../../assets/friend_icon.png"
                            alt="channel pic"
                            className=' rounded-full w-[60px] ' />

                        <h1 className='flex pl-3 font-medium text-[#325876] '>{channelToJoin.name}</h1>
                </div>
                <button className='flex items-center justify-center w-[100px] h-[55px] p-5 text-[#8194a3] bg-[#FFFFFF] border rounded-lg cursor-pointer hover:text-gray-600 hover:bg-[#f7faf1]'
                        onClick={e  => {handelChanneltoJoin(channelToJoin)}}>
                    Join 
                </button>
        </div>
    )
}


export default ChannelsToJoin