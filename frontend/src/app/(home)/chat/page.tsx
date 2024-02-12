'use client'
import { SocketContext } from '@/app/SocketContext';
import Header from "@/components/header/header";
import { useContext } from 'react';



function Chat() {
    // const socket = useContext(SocketContext);
    // // use the socket connection
    // // socket.emit('someevent', 'data');
    // socket.on('someevent', (data) => {
    //     console.log('data in the emit ' , data);
    // });

    return (
        <>
            <div className="w-full gap-10 max-h-screen h-screen bg-color-18 ">
                <Header/>
            </div>
        </>
    )
}

export default Chat;