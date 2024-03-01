import React, {useContext} from "react";
import Friend from "./friend";
import { chatslistContext } from '../../app/(home)/chat/page'
import Btns from "./commun_component/btns";

function FriendConversation(){

    const UserData: any = useContext(chatslistContext);
    console.log("icon = ", UserData.whatIcon);
    if (UserData.whatIcon == "friend")
    {
        

        return (
            <>
                <div className='flex  justify-between items-center  px-3 min-h-[60px] bg-[#FEE7C5] cursor-pointer hover:bg-[#635b4d]' onClick={() => {handelAddNewConversation('friend')}}>

                    <h1 className=' text-color-2 text-lg' >  Find New Friend</h1>
                    <Btns icon={"../../assets/addChannel.png"} onClick={undefined} />

                </div>
                    <div className='felx  flex-col justify-between items-center cursor-pointer w-full h-[85px] px-3 hover:bg-orange-600'>
                         {UserData.friendsList.map((chat) => {								
                            return <Friend key={chat.id} chat={chat}/>;
                        })}
                    </div>

            </>
        )
    }
}

export default FriendConversation
