'use client'
import { SocketContext } from '@/app/SocketContext';
import { useContext } from 'react';
import LeftSide from '@/components/chat/leftSide';
import RightSide from '@/components/chat/rightSide';

function Chat() {
    return (
        <>
        <div className='flex justify-start chat-bp:justify-center items-center w-screen h-screen overflow-hidden '>

          <div className="flex justify-start chat-bp:justify-center items-center w-[1731px] h-[1080px] bg-[#ffbb3b] ">

              <div className=" bg-[#FFE0B3] min-w-[340px] max-w-[460px] h-full w-full rounded-[29px_0px_0px_29px]">
                <LeftSide />
              </div>

              <div className="bg-[#FFF0D2]  min-w-[415px] max-w-[1271px] h-full w-full rounded-[0px_29px_29px_0px]">
                <RightSide />
              </div>
            </div>
        </div>
        </>
    )
}

export default Chat;