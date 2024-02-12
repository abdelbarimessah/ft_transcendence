'use client'
import { SocketContext } from '@/app/SocketContext';
import Header from "@/components/header/header";
import { useContext } from 'react';



function Chat() {
    const socket = useContext(SocketContext);
    // use the socket connection
    socket.emit('someevent', 'data');
    socket.on('someevent', (data) => {
        console.log('data in the emit ' , data);
      });

    return (
        <>
            <div className=" w-full gap-10 max-h-screen h-screen bg-[#FFF0D2] ">
                <div className=' m-auto max-w-screen-lg flex items-center justify-center h-screen bg-[#FFF0D2]'>
                    <div className=' w-1/3 h-[1077px] bg-[#000000] rounded-[29px]'></div>
                    <div className=' w-2/3 h-[1077px] bg-[#ffffff] rounded-[29px]'></div>
                </div>
                
            </div>
        </>
    )
}

export default Chat;