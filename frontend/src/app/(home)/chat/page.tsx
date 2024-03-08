'use client'
import { SocketContext, socket } from '@/app/SocketContext';
import { useContext, useRef } from 'react';
import LeftSide from '@/components/chat/leftSide';
import RightSide from '@/components/chat/rightSide';
import axios from 'axios';
import { useEffect, useState, createContext } from 'react';
import { log } from 'console';
import { toast } from 'sonner';
import ChannelOption from '@/components/chat/channelOption';
import EnterPassword from '@/components/chat/enterPassword';
import InviteFriendListe from '@/components/chat/inviteFriendListe';
import InviteFriend from '@/components/chat/inviteFriend';
import FriendMenu from '@/components/chat/friendMenu';
import ShowListNewFriend from '@/components/chat/showListNewFriend';



export const chatslistContext = createContext("");

function Chat() {

    const [friendsList, setFriendsList] = useState([]);
    const [newFriendsList, setNewFriendsList] = useState([]);
    const [showNewFriendsList, setShowNewFriendsList] = useState(false);
    const [channelsList, setChannelsList] = useState([]);
    const [myId, setMyId] = useState([]);
    const [friendChatConversation, setFriendChatConversation] = useState([]);
    const [channelChatConversation, setChannelChatConversation] = useState([]);
    const [chatClicked, setChatClicked] = useState([]);
    const [listChannelsToJoin, setListChannelsToJoin] = useState([]);
    const [channelClicked, setChannelClicked] = useState([]);
    const [channelToJoin, setChannelToJoin] = useState([]);
    const [typing, setTyping] = useState(true);
    const [popUpOn, setPopUpOn] = useState(false);
    const [channelType, setchannelType] = useState("");
    const [whatIcon, setWhatIcon] = useState("channel");
    const inputPassRef = useRef(null);
    const inputEnterPassRef = useRef(null);
    const [needPassword, setNeedPassword] = useState(false);
    const [showInvite, setShowInvite] = useState(false);
    const [showFriendMenu, setShowFriendMenu] = useState(false);
    const [showChannelMenu, setShowChannelMenu] = useState(false);
    const [channelMembers, setChannelMembers] = useState([]);
    const [isMuted, setIsMuted] = useState("Mute");
    

    const fetchData = async () => {
      try {
        const friendresponse = await axios.get('http://localhost:3000/chat/all');
          setFriendsList(friendresponse.data);
        } 
        catch (error: any) {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.message);
            }
        }

        try{
          const channelresponse = await axios.get('http://localhost:3000/chat/channel');
          setChannelsList(channelresponse.data);
          
        }
        catch (error: any) {
          if (error.response && error.response.status === 400) {
              toast.error(error.response.data.message);
          }
        }
          try{
          const NewFriendsListResponse = await axios.get('http://localhost:3000/user/friends');
          console.log("NewFriendsListResponse: -----", NewFriendsListResponse.data);
          
          setNewFriendsList(NewFriendsListResponse.data);
          
        }
        catch (error: any) {
          if (error.response && error.response.status === 400) {
              toast.error(error.response.data.message);
          }
        }
        try{
          const myIdResponse = await axios.get('http://localhost:3000/user/me');
          setMyId(myIdResponse.data);
          
        }
        catch (error: any) {
          if (error.response && error.response.status === 400) {
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
        }
        catch (error: any) {
          if (error.response && error.response.status === 400) {
              toast.error(error.response.data.message);
          }
      }
      };

      useEffect(() => {
        if (chatClicked.id)
          fetchFriendConversation();
      }, [chatClicked]);
      
      
      const fetchChannelConversation = async () =>{
        
        try {
          const messageResponse = await axios.get(`http://localhost:3000/chat/channel/${channelClicked.id}/messages`);
          setChannelChatConversation(messageResponse.data);
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


      const addNewChannelToList = (channel :any) => {   
        const exists = channelsList.some(item  => item.id === channel?.id);
        
        if (exists === false)
        {
          const newChannelToAdd = [...channelsList, channel];
          setChannelsList(newChannelToAdd);
        }
      }

      const updateMembers = (updatedMember :any) => {
        const userMembers = channelMembers?.members?.map((member) => {
          return member.userId === updatedMember?.userId ? {...member, ...updatedMember} : member
        })
        const newUpdate = {...channelMembers, members:userMembers};
        setChannelMembers(newUpdate);        
      }

      const updateChannelList = (channelId) =>
      {
        console.log("channel members", channelMembers);
        const newChannelList = channelsList.filter((channel) => {
          return channel?.id != channelId;
        })
        
        setChannelsList(newChannelList);
        setChannelClicked([]);
      }
      
      const removeUserFromMembers = (userId) =>
      {
        console.log("channel members", channelMembers);
        const newChannelMember = channelMembers?.members?.filter((member) =>{
          return member?.userId != userId;
        })
        const newUpdate = {...channelMembers, members:newChannelMember};
        setChannelMembers(newUpdate);
      }


      useEffect(() => {
        socket.on("userJoined", (data) => {
          addNewChannelToList(data.user.channel);
          updateMembers(data.user);
          console.log("data", data);
          
        });
        socket.on("addAdmin", (data) => {
          console.log("add admin data", data);
          
          updateMembers(data.user);
        });
        socket.on("muteUser", (data) => {
          updateMembers(data.user);
          
        });
        socket.on("banUser", (data) => {
          
          if (myId.id === data.userId){
            updateChannelList(data.channelId);
          }
          else{
            removeUserFromMembers(data.userId);
          }
        });
        
        socket.on("kickUser", (data) => { 
          console.log('on event listner userkick: ', channelMembers);
          if (myId.id === data.userId){
            updateChannelList(data.channelId);
          }
          else{
            removeUserFromMembers(data.userId);
          }
        });

        socket.on("userLeft", (data) => {
          console.log('on event listner usrleft: ', channelMembers);
          
          if (myId.id === data.userId){
            updateChannelList(data.channelId);
          }
          else{
            removeUserFromMembers(data.userId);
          }
        });

        return (() => {
            socket.off("userJoined")
            socket.off("addAdmin")
            socket.off("kickUser")
            socket.off("muteUser")
            socket.off("banUser")
            socket.off("userLeft")
        })
      }), [];
      
    return (
        <>
        <chatslistContext.Provider value={{ friendsList, channelsList, myId, friendChatConversation, chatClicked, typing, 
                                            setTyping, setFriendChatConversation, setChatClicked, popUpOn, setPopUpOn,
                                            channelType, setchannelType, setChannelsList, whatIcon, setWhatIcon, channelChatConversation,
                                            setChannelChatConversation, channelClicked, setChannelClicked, listChannelsToJoin,
                                            setListChannelsToJoin, channelToJoin, setChannelToJoin, inputPassRef,
                                            needPassword, setNeedPassword, inputEnterPassRef, showInvite, setShowInvite, showFriendMenu,
                                            setShowFriendMenu, showChannelMenu, setShowChannelMenu, channelMembers, setChannelMembers,
                                            isMuted, setIsMuted, newFriendsList, setNewFriendsList, showNewFriendsList, setShowNewFriendsList}}>
        <div className='relative flex justify-start chat-bp:justify-center items-center w-screen h-screen overflow-hidden '>
          
          <InviteFriend />
          <ShowListNewFriend />
          <ChannelOption />
          <div className="flex justify-start chat-bp:justify-center items-center w-[1731px] h-[1080px] bg-[#FFFFFF] ">

              <div className=" bg-[#FFFFFF] min-w-[340px] max-w-[460px] h-full w-full rounded-[29px_0px_0px_29px]">
                <LeftSide/>
              </div>

              <div className="bg-[#FFFFFF]  h-full w-full rounded-[0px_29px_29px_0px]">
                <RightSide  />
                
              </div>
            </div>
            </div>
        </chatslistContext.Provider>
    </>
  );
}

export default Chat;
