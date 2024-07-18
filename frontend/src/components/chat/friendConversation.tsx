import React, { useContext } from "react";
import Friend from "./friend";
import { chatslistContext } from "@/app/ChatContext";
import Btns from "./commun_component/btns";


function FriendConversation() {
    const UserData: any = useContext(chatslistContext);

    const handelAddNewConversation = () => {
        UserData.setShowNewFriendsList(true);
    }

    if (UserData.whatIcon == "friend") {

        return (
            <>
                <div className='static flex  justify-between items-center  px-3 min-h-[60px] border-[#F3FAFF] bg-[#ffffff] cursor-pointer hover:bg-[#e2eef6]'
                    onClick={handelAddNewConversation}>

                    <h1 className=' text-[#6D8CA3] text-lg' >  Find New Friend </h1>
                    <div className="static ">
                        <Btns icon={"../../assets/chatAddUser.svg"} onClick={undefined} />
                    </div>

                </div>
                <div className='flex flex-col no-scrollbar overflow-y-scroll h-full w-full  px-3'>
                    {UserData.friendsList.map((chat: any) => {
                        return <Friend key={chat.id} chat={chat} />;
                    })}
                </div>

            </>
        )
    }
}

export default FriendConversation
