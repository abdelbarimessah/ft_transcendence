import React, {useContext} from 'react'
import Btns from './commun_component/btns'
import Link from 'next/link'


import { chatslistContext } from '../../app/(home)/chat/page'




function RightSide () {

    const UserData = useContext(chatslistContext);
    
    if (UserData.chatClicked.members != undefined)
    {   
        return(
            //chat 
            <div className='flex flex-col bg-[#ffff] h-full'>
                
                {/* up nav */}
                <div className='flex justify-between items-center bg-black h-[130px] border-r border-b border-[#FFEFD9] p-5'>
                   
                    <Link href="/profile">
                        <img    
                                src={(UserData.myId.id != UserData.chatClicked.members[0].id) ? UserData.chatClicked.members[0].avatar : UserData.chatClicked.members[1].avatar}
                                alt={(UserData.myId.id != UserData.chatClicked.members[0].id) ? UserData.chatClicked.members[0].nickName : UserData.chatClicked.members[1].nickName}
                                className=' rounded-full object-center w-[86px] h-[86px] ' />
                    </Link>
                    
                    
                    {/* info */}
                    <div className=''>
    
                    </div>
    
                </div>
    
                {/* messages */}
    
                    <div>
    
                    </div>
    
    
                {/* bot nav */}
    
            </div>
        )

    }
}

export default RightSide