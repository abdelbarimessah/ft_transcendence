import React, { useContext } from 'react'
import { chatslistContext } from '@/app/ChatContext'


function CreatChannel() {

    const userData :any = useContext(chatslistContext);
    
    
    if (userData.channelType === "PROTECTED")
    {
        return (
            <>
                <div className='flex justify-center items-center'>
                <div className='flex w-full flex-row gap-7 justify-center items-center'>
                                    <div className='flex justify-start items-center '>
                                            Enter password:
                                    </div>
                                            <input  type="text"
                                                className='flex bg-[#ffff] rounded-lg outline-none text-sm text-[#454135]  h-[40px] m-3 p-3 placeholder:text-sm placeholder:text-[#8194a3] '
                                                placeholder='type a message'
                                                ref={userData.inputPassRef}
                                                
                                                
                                                />
                                </div>
                </div>
            </>
        )
    }
}

export default CreatChannel