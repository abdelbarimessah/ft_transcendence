'use client'
import { SocketContext } from '@/app/SocketContext';
import { useContext } from 'react';
import LeftSide from '@/components/chat/leftSide';
import RightSide from '@/components/chat/rightSide';
import axios from 'axios';
import { useEffect, useState, createContext } from 'react';
import PopUpChannel from '@/components/chat/channelPopUp';



export const chatslistContext = createContext();

function Chat() {

    const [friendsList, setFriendsList] = useState([]);
    const [channelsList, setChannelsList] = useState([]);
    const [myId, setMyId] = useState([]);
    const [chatConversation, setChatConversation] = useState([]);
    const [chatClicked, setChatClicked] = useState([]);
    const [typing, setTyping] = useState(true);
    const [popUpOn, setPopUpOn] = useState(false);
    const [channelType, setchannelType] = useState("")

      const fetchData = async () => {
        try {
          const friendresponse = await axios.get('http://localhost:3000/chat/all');
          setFriendsList(friendresponse.data);
        
        } 
        catch (error) {
          console.error("ERROR AT BEGINGN :", error);
        }
        
        try{
          const channelresponse = await axios.get('http://localhost:3000/chat/channel');
          setChannelsList(channelresponse.data);
          
        }
        catch (error) {
          console.error("ERROR AT BEGINGN :", error);
        }
        try{
          const myIdResponse = await axios.get('http://localhost:3000/user/me');
          setMyId(myIdResponse.data);
          
        }
        catch (error) {
          console.error("ERROR AT BEGINGN :", error);
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



    return (
        <>
        <chatslistContext.Provider value={{ friendsList, channelsList, myId, chatConversation, chatClicked, typing, 
                                            setTyping, setChatConversation, setChatClicked, popUpOn, setPopUpOn,
                                            channelType, setchannelType, setChannelsList}}>
        <div className='relative flex justify-start chat-bp:justify-center items-center w-screen h-screen overflow-hidden '>
          <PopUpChannel />
          <div className="flex justify-start chat-bp:justify-center items-center w-[1731px] h-[1080px] bg-[#ffbb3b] ">

              <div className=" bg-[#FFE0B3] min-w-[340px] max-w-[460px] h-full w-full rounded-[29px_0px_0px_29px]">
                <LeftSide/>
              </div>

              <div className="bg-[#FFF0D2]  min-w-[415px] max-w-[1271px] h-full w-full rounded-[0px_29px_29px_0px]">
                <RightSide  />
              </div>
            </div>
        </div>
        </chatslistContext.Provider>
        </>
    )
}

export default Chat;