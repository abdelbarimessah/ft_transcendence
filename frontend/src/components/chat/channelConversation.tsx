import React, {useContext, useEffect} from "react";
import Channels from "./channels";
import { chatslistContext } from '../../app/(home)/chat/page'
import Btns from "./commun_component/btns";
import { toast } from "sonner";
import axios from "axios";


function ChannelConversation(){
    const UserData: any = useContext(chatslistContext);
    
    const fetchData = async () => {
        try {
            const channelresponse = await axios.get('http://localhost:3000/chat/channel/all');
            UserData.setListChannelsToJoin(channelresponse.data);
            
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                // console.error("ERROR AT BEGIN: no channel found:", error.response.data);
                toast.error(error.response.data.message);
            }
        }
    };

        useEffect(() => {
            fetchData();
        }, [UserData.popUpOn]);

    function handelAddNewConversation() {
		UserData.setPopUpOn(true);
	}

    if (UserData.whatIcon == "channel")
    {
        return (
        <>
                <div className='flex  justify-between items-center  px-3 min-h-[60px] border-[#F3FAFF] bg-[#ffffff] cursor-pointer hover:bg-[#e2eef6]'
                onClick={handelAddNewConversation}>

                    <h1 className=' text-[#6D8CA3] text-lg' >  Join Channel Now </h1>
                    <Btns icon={"../../assets/addChannel.png"} onClick={undefined}/>

                </div>

                {console.log("here")}
                
                    <div className='flex flex-col no-scrollbar overflow-y-scroll  cursor-pointer h-full w-full  px-3'>
                         {UserData.channelsList.map((chat) => {						
                            return <Channels key={chat.id} chat={chat}/>;
                        })}
                    </div>
            </>
        )
    }
}

export default ChannelConversation



// if (UserData.popUpOn === true)
// {
//     UserData.setListChannelsToJoin(chatClicked);
// }
// else if (UserData.popUpOn === false)
// {
//     UserData.setChannelClicked(chatClicked);
//     UserData.setChatClicked([]);
// }