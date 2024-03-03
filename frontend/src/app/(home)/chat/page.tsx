'use client'
import { SocketContext } from '@/app/SocketContext';
import { useContext } from 'react';
import LeftSide from '@/components/chat/leftSide';
import RightSide from '@/components/chat/rightSide';
import axios from 'axios';
import { useEffect, useState, createContext } from 'react';
import { log } from 'console';
import { toast } from 'sonner';
import ChannelOption from '@/components/chat/channelOption';



export const chatslistContext = createContext();

function Chat() {

    const [friendsList, setFriendsList] = useState([]);
    const [channelsList, setChannelsList] = useState([]);
    const [myId, setMyId] = useState([]);
    const [friendChatConversation, setFriendChatConversation] = useState([]);
    const [channelChatConversation, setChannelChatConversation] = useState([]);
    const [chatClicked, setChatClicked] = useState([]);
    const [channelClicked, setChannelClicked] = useState([]);
    const [channelToJoin, setChannelToJoin] = useState([]);
    const [typing, setTyping] = useState(true);
    const [popUpOn, setPopUpOn] = useState(false);
    const [channelType, setchannelType] = useState("");
    const [whatIcon, setWhatIcon] = useState("");
    const [listChannelsToJoin, setListChannelsToJoin] = useState([]);


    const fetchData = async () => {
      try {
        const friendresponse = await axios.get('http://localhost:3000/chat/all');
        console.log("friendresponse.data = ");
          setFriendsList(friendresponse.data);
          
        } 
        catch (error: any) {
            if (error.response && error.response.status === 400) {
                // console.error("ERROR AT BEGIN: no channel found:", error.response.data);
                toast.error(error.response.data.message);
            }
        }
        
        try{
          const channelresponse = await axios.get('http://localhost:3000/chat/channel');
          setChannelsList(channelresponse.data);
          
        }
        catch (error: any) {
          if (error.response && error.response.status === 400) {
              // console.error("ERROR AT BEGIN: no channel found:", error.response.data);
              toast.error(error.response.data.message);
          }
      }
        try{
          const myIdResponse = await axios.get('http://localhost:3000/user/me');
          setMyId(myIdResponse.data);
          
        }
        catch (error: any) {
          if (error.response && error.response.status === 400) {
              // console.error("ERROR AT BEGIN: no channel found:", error.response.data);
              toast.error(error.response.data.message);
          }
      }
      };
      useEffect(() => {
        fetchData();
      }, []);

      const fetchFriendConversation = async () =>{
        try {
          const messageResponse = await axios.get(`http://localhost:3000/chat/message/${chatClicked.id}`);
          setFriendChatConversation(messageResponse.data);
          // console.log("messageResponse = ",messageResponse.data);
        }
        catch (error: any) {
          if (error.response && error.response.status === 400) {
              // console.error("ERROR AT BEGIN: no channel found:", error.response.data);
              toast.error(error.response.data.message);
          }
      }
      };

      useEffect(() => {
        if (chatClicked.id)
          fetchFriendConversation();
      }, [chatClicked]);
      
      
      const fetchChannelConversation = async () =>{
        console.log("channelClicked.id = ", channelClicked.id);
        
        try {
          console.log("channelClicked = ", channelClicked);   
          const messageResponse = await axios.get(`http://localhost:3000/chat/channel/${channelClicked.id}/messages`);
          setChannelChatConversation(messageResponse.data);
          console.log("messageResponse = ",messageResponse.data);
        } 
        catch (error: any) {
          if (error.response && error.response.status === 400) {
              // console.error("ERROR AT BEGIN: no channel found:", error.response.data);
              toast.error(error.response.data.message);
          }
      }
      };

      useEffect(() => {
        if (channelClicked.id)
          fetchChannelConversation();
      }, [channelClicked]);



    return (
        <>
        <chatslistContext.Provider value={{ friendsList, channelsList, myId, friendChatConversation, chatClicked, typing, 
                                            setTyping, setFriendChatConversation, setChatClicked, popUpOn, setPopUpOn,
                                            channelType, setchannelType, setChannelsList, whatIcon, setWhatIcon, channelChatConversation,
                                            setChannelChatConversation, channelClicked, setChannelClicked, listChannelsToJoin,
                                            setListChannelsToJoin, channelToJoin, setChannelToJoin}}>
        <div className='relative flex justify-start chat-bp:justify-center items-center w-screen h-screen overflow-hidden '>
          <ChannelOption />
          <div className="flex justify-start chat-bp:justify-center items-center w-[1731px] h-[1080px] bg-[#FFFFFF] ">

              <div className=" bg-[#FFFFFF] min-w-[340px] max-w-[460px] h-full w-full rounded-[29px_0px_0px_29px]">
                <LeftSide/>
              </div>

              <div className="bg-[#FFFFFF]  min-w-[415px] max-w-[1271px] h-full w-full rounded-[0px_29px_29px_0px]">
                <RightSide  />
              </div>
            </div>
        </div>
        </chatslistContext.Provider>
        </>
    )
}

export default Chat;
