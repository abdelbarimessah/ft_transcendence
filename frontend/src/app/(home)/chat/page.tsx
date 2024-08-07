"use client";
import { socket } from "@/app/SocketContext";
import { useRef } from "react";
import LeftSide from "@/components/chat/leftSide";
import RightSide from "@/components/chat/rightSide";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ChannelOption from "@/components/chat/channelOption";
import InviteFriend from "@/components/chat/inviteFriend";
import ShowListNewFriend from "@/components/chat/showListNewFriend";
import AuthWrapper from "@/app/authToken";

import { chatslistContext } from "../../ChatContext";

function Chat() {
  const [friendsList, setFriendsList] = useState([]);
  const [newFriendsList, setNewFriendsList] = useState([]);
  const [showNewFriendsList, setShowNewFriendsList] = useState(false);
  const [channelsList, setChannelsList] = useState([]);
  const [myId, setMyId] = useState<any>([]);
  const [friendChatConversation, setFriendChatConversation] = useState([]);
  const [channelChatConversation, setChannelChatConversation] = useState([]);
  const [chatClicked, setChatClicked] = useState<any>([]);
  const [listChannelsToJoin, setListChannelsToJoin] = useState([]);
  const [channelClicked, setChannelClicked] = useState<any>([]);
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
  const [channelMembers, setChannelMembers] = useState<any>([]);
  const [isMuted, setIsMuted] = useState("Mute");
  const [isBlocked, setIsBlocked] = useState("Unblock");
  const [blockList, setBlockList] = useState([]);

  const fetchData = async () => {
    const backendUrl = process.env.BACKEND_API || "http://localhost:3000";

    try {
      const friendresponse = await axios.get(`${backendUrl}/chat/all`);
      setFriendsList(friendresponse.data);
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      }
    }

    try {
      const channelresponse = await axios.get(`${backendUrl}/chat/channel`);
      setChannelsList(channelresponse.data);
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      }
    }
    try {
      const NewFriendsListResponse = await axios.get(
        `${backendUrl}/user/friends`
      );

      setNewFriendsList(NewFriendsListResponse.data);
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      }
    }
    try {
      const myIdResponse = await axios.get(`${backendUrl}/user/me`);
      setMyId(myIdResponse.data);
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (chatClicked && chatClicked.id) fetchFriendConversation();
  }, [chatClicked]);

  const fetchFriendConversation = async () => {
    try {
      const backendUrl = process.env.BACKEND_API || "http://localhost:3000";

      const messageResponse = await axios.get(
        `${backendUrl}/chat/message/${chatClicked?.id}`
      );
      setFriendChatConversation(messageResponse.data);
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    if (channelClicked && channelClicked.id) fetchChannelConversation();
  }, [channelClicked]);

  const fetchChannelConversation = async () => {
    try {
      const backendUrl = process.env.BACKEND_API || "http://localhost:3000";

      const messageResponse = await axios.get(
        `${backendUrl}/chat/channel/${channelClicked?.id}/messages`
      );
      setChannelChatConversation(messageResponse.data);
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        // console.error("ERROR AT BEGIN: no channel found:", error.response.data);
        toast.error(error.response.data.message);
      }
    }
  };

  const addNewChannelToList = (channel: any) => {
    const exists = channelsList.some((item: any) => item.id === channel?.id);

    if (exists === false) {
      const newChannelToAdd: any = [...channelsList, channel];
      setChannelsList(newChannelToAdd);
    }
  };

  const updateMembers = (updatedMember: any) => {
    if (channelMembers && channelMembers.members) {
      const userMembers = channelMembers.members.map((member: any) => {
        return member.userId === updatedMember?.userId
          ? { ...member, ...updatedMember }
          : member;
      });
      const newUpdate = { ...channelMembers, members: userMembers };
      setChannelMembers(newUpdate);
    }
  };

  const updateChannelList = (channelId: any) => {
    const newChannelList = channelsList.filter((channel: any) => {
      return channel?.id != channelId;
    });

    setChannelsList(newChannelList);
    if (channelClicked && channelClicked.id === channelId)
      setChannelClicked(null);
  };

  const removeUserFromMembers = (userId: any) => {
    const newChannelMember = channelMembers?.members?.filter((member: any) => {
      return member?.userId != userId;
    });
    if (newChannelMember) {
      const newUpdate = { ...channelMembers, members: newChannelMember };
      setChannelMembers(newUpdate);
    }
  };

  useEffect(() => {
    socket.on("userJoined", (data) => {
      addNewChannelToList(data.user.channel);
      updateMembers(data.user);
    });
    socket.on("addAdmin", (data) => {
      updateMembers(data.user);
    });

    socket.on("newChat", (data) => {
      const friendExists = friendsList.some((user: any) => user.id === data.id);
      if (!friendExists) {
        const newList: any = [...friendsList, data];
        setFriendsList(newList);
      }
      setShowNewFriendsList(false);
    });
    socket.on("muteUser", (data) => {
      updateMembers(data.user);
    });

    socket.on("banUser", (data) => {
      if (myId && myId.id === data.userId) {
        updateChannelList(data.channelId);
      } else {
        removeUserFromMembers(data.userId);
      }
    });

    socket.on("kickUser", (data) => {
      if (myId && myId.id === data.userId) {
        updateChannelList(data.channelId);
      } else {
        removeUserFromMembers(data.userId);
      }
    });

    socket.on("userLeft", (data) => {
      if (myId && myId.id === data.userId) {
        updateChannelList(data.channelId);
      } else {
        removeUserFromMembers(data.userId);
      }
    });

    return () => {
      socket.off("userJoined");
      socket.off("addAdmin");
      socket.off("kickUser");
      socket.off("muteUser");
      socket.off("banUser");
      socket.off("userLeft");
      socket.off("newChat");
    };
  }),
    [];

  return (
    <>
      <AuthWrapper>
        <chatslistContext.Provider
          value={
            {
              friendsList,
              channelsList,
              myId,
              friendChatConversation,
              chatClicked,
              typing,
              setTyping,
              setFriendChatConversation,
              setChatClicked,
              popUpOn,
              setPopUpOn,
              channelType,
              setchannelType,
              setChannelsList,
              whatIcon,
              setWhatIcon,
              channelChatConversation,
              setChannelChatConversation,
              channelClicked,
              setChannelClicked,
              listChannelsToJoin,
              setListChannelsToJoin,
              channelToJoin,
              setChannelToJoin,
              inputPassRef,
              needPassword,
              setNeedPassword,
              inputEnterPassRef,
              showInvite,
              setShowInvite,
              showFriendMenu,
              setShowFriendMenu,
              showChannelMenu,
              setShowChannelMenu,
              channelMembers,
              setChannelMembers,
              isMuted,
              setIsMuted,
              newFriendsList,
              setNewFriendsList,
              showNewFriendsList,
              setShowNewFriendsList,
              isBlocked,
              setIsBlocked,
              blockList,
              setBlockList,
            } as any
          }
        >
          <div className=" flex justify-start chat-bp:justify-center items-center min-h-[600px] " 
          style={{ 
            position: 'absolute',
            top: '19px',
            width: 'calc(100% - 38px)',
            maxWidth: '1600px',
            height: 'calc(100% - 38px)',
           /*  margin: '0 auto',  */
            padding : '19px',
            }}>
            <InviteFriend />
            <ShowListNewFriend />
            <ChannelOption />
            <div className="flex justify-start chat-bp:justify-center items-center w-full h-full bg-color-0 rounded-[22px]">
              <div className=" bg-[#FFFFFF] min-w-[340px] max-w-[460px] h-full w-full rounded-[29px_0px_0px_29px]">
                <LeftSide />
              </div>

              <div className="bg-[#FFFFFF]  h-full w-full rounded-[0px_29px_29px_0px]">
                <RightSide />
              </div>
            </div>
          </div>
        </chatslistContext.Provider>
      </AuthWrapper>
    </>
  );
}

export default Chat;
