import React, {useContext} from "react";
import Friend from "./friend";
import { chatslistContext } from '../../app/(home)/chat/page'
import Btns from "./commun_component/btns";


function FriendConversation(){
    const UserData: any = useContext(chatslistContext);
    
    const handelAddNewConversation = () => {
        UserData.setShowNewFriendsList(true);
    }

    if (UserData.whatIcon == "friend")
    {

        return (
            <>
                <div className='flex  justify-between items-center  px-3 min-h-[60px] border-[#F3FAFF] bg-[#ffffff] cursor-pointer hover:bg-[#e2eef6]'
                 onClick={handelAddNewConversation}>

                    <h1 className=' text-[#6D8CA3] text-lg' >  Find New Friend</h1>
                    <Btns icon={"../../assets/addChannel.png"} onClick={undefined} />

                </div>
                    <div className='flex flex-col no-scrollbar overflow-y-scroll h-full w-full  px-3'>
                         {UserData.friendsList.map((chat) => {								
                            return <Friend key={chat.id} chat={chat}/>;
                        })}
                    </div>

            </>
        )
    }
}

export default FriendConversation
