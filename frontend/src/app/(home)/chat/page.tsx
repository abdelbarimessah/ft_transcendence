'use client'
import { SocketContext } from '@/app/SocketContext';
import { useContext } from 'react';
import LeftSide from '@/components/chat/leftSide';
import RightSide from '@/components/chat/rightSide';

function Chat() {
    const socket = useContext(SocketContext);
    // use the socket connection
    socket.emit('someevent', 'data');
    socket.on('someevent', (data) => {
        console.log('data in the emit ' , data);
      });

    return (
        <>

          <div className="flex my-auto justify-start items-center w-[1920px] h-[1080px]  bg-[#ffbb3b]">

              <div className="bg-[#000000] min-w-[340px] max-w-[500px] h-[1080px] text-color-0 rounded-[29px]">
                <LeftSide />
              </div>

              <div className="bg-[#ffffff] min-w-[415px] max-w-[1120px] w-100 h-100">
                <RightSide />
              </div>
            </div>




        {/* <div className='flex items-center '>
            
            <div className='flex h-[67.5rem] w-[120rem] bg-[#ffa928] rounded-[29px]'>
                <div className= 'max-w-[460px] min-w-[400px] h-[1080px] rounded-[29px_0px_0px_29px] bg-[#fbe6c7]'>
                    <LeftSide />
                </div>
                <div className='max-w-[1460px] min-w-[1520px] h-[1080px] rounded-[0px_29px_29px_0] bg-[#ffff]'>
                    <RightSide />
                </div>
            </div>
        </div> */}
            
        </>
    )








    // <div className=' flex justify-start chat-bp:m-auto w-[1731px] h-[1080px] m-auto bg-[#ffb623]'>
    // {/* <div className='flex justify-start chat-bp:justify-center items-center bg-[#ffa434] h-screen'> */}
    //     <div className=' chat-bp:w-1/3  p-4 bg-[#000000] rounded-[29px] text-color-0'>
    //     {/* <div className='bg-[#000000] min-w-[340px] max-w-[500px] w-100 h-100'> */}
    //         <LeftSide />
    //     </div>
    //     <div className=' chat-bp:w-2/3 p-4 bg-[#ffffff] rounded-[29px]'>
    //     {/* <div className='bg-[#ffffff] min-w-[415px] max-w-[1120px] w-100 h-100'> */}
    //         <RightSide />
    //     </div>
    
    // </div>
}

export default Chat;