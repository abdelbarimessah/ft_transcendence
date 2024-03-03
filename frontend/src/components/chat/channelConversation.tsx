import React, {useContext} from "react";
import Channels from "./channels";
import { chatslistContext } from '../../app/(home)/chat/page'
import Btns from "./commun_component/btns";


function ChannelConversation(){
    const UserData: any = useContext(chatslistContext);
    
    function handelAddNewConversation() {
		UserData.setPopUpOn(true);
	}

    if (UserData.whatIcon == "channel")
    {
        return (
            <>
                <div className='flex  justify-between items-center  px-3 min-h-[60px] bg-[#FEE7C5] cursor-pointer hover:bg-[#f49797]' onClick={handelAddNewConversation}>

                    <h1 className=' text-color-2 text-lg' >  Add New Channel </h1>
                    <Btns icon={"../../assets/addChannel.png"} onClick={undefined}/>
                    

                </div>
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