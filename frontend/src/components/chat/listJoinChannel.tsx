import {createContext, useContext } from 'react'

import { chatslistContext } from '../../app/(home)/chat/page'
import { toast } from 'sonner';
import { socket } from '@/app/SocketContext';
import axios from 'axios';




function ChannelsToJoin ({channelToJoin}: any) {
    
    const UserData: any	 = useContext(chatslistContext);
    console.log("chat to join ==>", channelToJoin);
    
    const addNewChannelToList = (channel) => {
        const newMessageArray = [...UserData.channelsList, channel];
        UserData.setChannelsList(newMessageArray);
    }


    socket.on('newMessage', (data) => {
        addNewChannelToList(data);
    })

    const addChannelToList = async() => {
        console.log("UserData.channelToJoin = >", UserData.channelToJoin);
        
        try {
            const joinResponse = await axios.post(
              `http://localhost:3000/chat/channel/${UserData.channelToJoin.id}/join`,
              {
                
              },
              {
                withCredentials: true,
              }
            );
            addNewChannelToList(joinResponse.data)
            console.log(joinResponse.data);
          } catch (error) {
            console.error(error);
          }
          
    }


    function handelChahtConv (channelToJoin: any){

        UserData.setListChannelsToJoin(channelToJoin);
        
        addChannelToList();
        UserData.setPopUpOn(false);
        console.log("channelToJoin =>", channelToJoin);
        // i have a problem here the channel id dosent seted
    }
    
    return(
        <div    className=' flex justify-between items-center border-t-[2px] border-[#cdd7dd] p-3 min-h-[68px]'
        onClick={e  => {handelChahtConv(channelToJoin)}}>

                <img    src="../../assets/friend_icon.png"
                        alt="channel pic"
                        className=' rounded-full w-[60px] ' />
                    {/* <h1> pic here </h1> */}
                    <h1 className=' font-medium text-[#325876] '>{channelToJoin.name}</h1>
        
            </div>
    )
}


export default ChannelsToJoin