import React, {useContext} from "react";
import Friend from "./friend";
import { chatslistContext } from '../../app/(home)/chat/page'
import Btns from "./commun_component/btns";


function FriendConversation(){
    const UserData: any = useContext(chatslistContext);
    
    const handelAddNewConversation = () => {
        
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
                    <div className='felx  flex-col justify-between items-center cursor-pointer w-full h-[85px] px-3 hover:bg-[#e2eef6]'>
                         {UserData.friendsList.map((chat) => {								
                            return <Friend key={chat.id} chat={chat}/>;
                        })}
                    </div>

            </>
        )
    }
}

export default FriendConversation
