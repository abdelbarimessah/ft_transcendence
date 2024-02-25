'use client'
import { SocketContext } from '@/app/SocketContext';
import { useContext } from 'react';
import LeftSide from '@/components/chat/leftSide';
import RightSide from '@/components/chat/rightSide';

import axios from 'axios';
import { useEffect, useState, createContext } from 'react';




export const chatslistContext = createContext();

function Chat() {
    // const socket = useContext(SocketContext);
    // // use the socket connection
    // // socket.emit('someevent', 'data');
    // socket.on('someevent', (data) => {
    //     console.log('data in the emit ' , data);
    // });


    const [friendsList, setFriendsList] = useState([]);
    const [channelsList, setChannelsList] = useState([]);
    const [myId, setMyId] = useState([]);
    const [chatConversation, setChatConversation] = useState([]);
    const [chatClicked, setChatClicked] = useState([]);
    

      const fetchData = async () => {
        try {
          const friendresponse = await axios.get('http://localhost:3000/chat/all');
          setFriendsList(friendresponse.data);
          // console.log("response_friend = ", friendresponse.data);
          const channelresponse = await axios.get('http://localhost:3000/chat/all');
          setChannelsList(channelresponse.data);
          // console.log("response_channel = ", channelresponse.data);
          const myIdResponse = await axios.get('http://localhost:3000/user/me');
          setMyId(myIdResponse.data);
          console.log("myIdResponse = ", myIdResponse.data);
        } catch (error) {
          console.error(error);
        }
      };
    
      useEffect(() => {
        fetchData();
      }, []);

      const fetchConversationDta = async () =>{
        try {
          console.log("chatClicked = ", chatClicked);   
          const messageResponse = await axios.get(`http://localhost:3000/chat/message/${chatClicked.id}`);
          setChatConversation(messageResponse.data);
          // console.log("messageResponse = ",messageResponse.data);
        } catch (error) {
          console.error("haaaahowa lerroor: ",error);
        }
      };

      useEffect(() => {
        if (chatClicked.id)
          fetchConversationDta();
      }, [chatClicked]);
  
      // console.log("EventTriger = ", chatClicked);

    return (
        <>
        <chatslistContext.Provider value={{friendsList, channelsList, myId, chatConversation, chatClicked}}>
        <div className='flex justify-start chat-bp:justify-center items-center w-screen h-screen overflow-hidden '>

          <div className="flex justify-start chat-bp:justify-center items-center w-[1731px] h-[1080px] bg-[#ffbb3b] ">

              <div className=" bg-[#FFE0B3] min-w-[340px] max-w-[460px] h-full w-full rounded-[29px_0px_0px_29px]">
                <LeftSide ParentEventTriger={setChatClicked}/>
              </div>

              <div className="bg-[#FFF0D2]  min-w-[415px] max-w-[1271px] h-full w-full rounded-[0px_29px_29px_0px]">
                <RightSide />
              </div>
            </div>
        </div>
        </chatslistContext.Provider>
        </>
    )
}

export default Chat;