import React, {useContext} from 'react'
import Btns from './commun_component/btns'
import Link from 'next/link'
import { chatslistContext } from '../../app/(home)/chat/page'
import Image from 'next/image';
import Messages from './messages';


function RightSide () {

    const UserData = useContext(chatslistContext);
    
    if (UserData.chatClicked.members != undefined)
    {   
        const messages = UserData.chatConversation;
        console.log("messages = ", messages);
        
        const friendSrcImg = UserData.myId.id !== UserData.chatClicked.members[0].id ? UserData.chatClicked.members[0].avatar : UserData.chatClicked.members[1].avatar;
        const friendNickName = UserData.myId.id !== UserData.chatClicked.members[0].id ? UserData.chatClicked.members[0].nickName : UserData.chatClicked.members[1].nickName;
        return(
            //chat 
            <div className='flex flex-col bg-[#ffff] h-full'>
                
                {/* up nav */}
                <div className='flex justify-between  bg-black h-[130px] border-r border-b border-[#FFEFD9] p-5'>
                   <div className='flex items-center'>

                   {/* todo: profile need to redirect to: /profile/friend */}
                        <Link href="/profile">
                            <Image    
                                    src={friendSrcImg}
                                    alt={friendNickName}
                                    width={1024}
                                    height={1080}
                                    className=' rounded-full object-center w-[86px] h-[86px] p-1' />

                        </Link>

                        {/* info */}
                        <div className='felx flex-col p-3'>
                            <div className=' text-white '>{friendNickName}</div>
                            <div className=' text-xs text-white'>online</div>
                        </div>
        
                   </div>
                   <div className=' flex items-center justify-end w-[146px]'>
                        <Btns icon={"../../assets/addChannel.png"}/>
                   </div>
    
                </div>
    

                {/* messages */}
                <div className="h-full bg-[#FFF0D2] bg-[url('../../public/assets/chat-bg.png')] overflow-y-scroll p-[38px]">

                    {/* {console.log(UserData.chatConversation)} */}


                    {messages.map((msg) => (
                        <Messages />
                    ))}
{/*                     {messages.map((chat) => {
						console.log(chat);
					})} */}


                </div>


                {/* bot nav */}
                <div className='flex items-center bg-[#FFE0B3] h-[90px] p-4 rounded-lg'>
                    <input  type="text"
                            placeholder='type a message'
                            className=' bg-[#eadec4] rounded-lg outline-none text-sm text-[#39362d] w-full h-[50px] m-3 p-3 placeholder:text-sm placeholder:text-[#f3b679] '
                    />
                    <div className='flex items-center justify-end  ml-4 mr-3'>
                        <Btns icon={"../../assets/addChannel.png"}/>
                    </div>
                </div>
    
            </div>
        )

    }
}

export default RightSide