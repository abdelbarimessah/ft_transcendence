import React, { useContext, useRef, useEffect } from "react";
import Btns from "./commun_component/btns";
import Link from "next/link";
import { chatslistContext } from "../../app/(home)/chat/page";
import Image from "next/image";
import Messages from "./messages";
import Moment from "react-moment";
import "moment-timezone";
import axios from "axios";
import { SocketContext } from "@/app/SocketContext";
import FriendMenu from "./friendMenu";
import { toast } from "sonner";

function FriendRightSide() {
  const backendUrl = process.env.BACKEND_URL || "http://localhost:3000";
  const inputMessageRef: any = useRef(null);
  const refToBottum: any = useRef(null);
  const UserData: any = useContext(chatslistContext);
  const socket = useContext(SocketContext);

  useEffect(() => {
    refToBottum.current?.scrollIntoView({ behavior: "smooth" });
  }, [UserData.friendChatConversation]);

  const addMessageToChat = (message: any) => {
    if (UserData.chatClicked.id === message.chatId) {
      const newMessageArray = [...UserData.friendChatConversation, message];
      UserData.setFriendChatConversation(newMessageArray);
    }
  };

  useEffect(() => {
    socket.on("newMessage", (data) => {
      addMessageToChat(data);
    });
    return () => {
      socket.off("newMessage");
    };
  }),
    [];

  if (UserData.chatClicked.id != undefined) {
    const friendSrcImg =
      UserData.myId.id !== UserData.chatClicked.members[0].id
        ? UserData.chatClicked.members[0].avatar
        : UserData.chatClicked.members[1].avatar;
    const friendNickName =
      UserData.myId.id !== UserData.chatClicked.members[0].id
        ? UserData.chatClicked.members[0].nickName
        : UserData.chatClicked.members[1].nickName;
    const friendId =
      UserData.myId.id !== UserData.chatClicked.members[0].id
        ? UserData.chatClicked.members[0].id
        : UserData.chatClicked.members[1].id;
    // const myBlockedList = UserData.myId.id === UserData.chatClicked.members[0].id ? UserData.chatClicked.members[0]?.blockedUsers : UserData.chatClicked.members[1]?.blockedUsers;
    const friendProviderId =
      UserData.myId.id !== UserData.chatClicked.members[0].id
        ? UserData.chatClicked.members[0].providerId
        : UserData.chatClicked.members[1].providerId;
    const firstName =
      UserData.myId.id !== UserData.chatClicked.members[0].id
        ? UserData.chatClicked.members[0].firstName
        : UserData.chatClicked.members[1].firstName;
    const lastName =
      UserData.myId.id !== UserData.chatClicked.members[0].id
        ? UserData.chatClicked.members[0].lastName
        : UserData.chatClicked.members[1].lastName;
    // const isBlocked = myBlockedList.some((item :any) => item.id === friendId);

    const handelSubmitrefrech = (e: any) => {
      e.preventDefault();
    };

    const handelMessageInput = () => {
      inputMessageRef.current.value.length > 0
        ? UserData.setTyping(true)
        : UserData.setTyping(false);
    };

    const handelSubmit = async () => {
      try {
        const postMsgResponse = await axios.post(
          `${backendUrl}/chat/message`,
          {
            content: inputMessageRef.current?.value,
            chatId: UserData.chatClicked.id,
          },
          {
            withCredentials: true,
          }
        );
        // console.log("postMsgResponse.data = ", postMsgResponse.data);

        addMessageToChat(postMsgResponse.data);
        inputMessageRef.current.value = "";
        UserData.setTyping(false);
      } catch (error: any) {
        if (error.response) {
          toast.error(error.response.data.message);
        }
      }
    };
    const messages = UserData.friendChatConversation;

    return (
      //chat
      <div className="flex flex-row w-full h-full ">
        <div className="flex flex-col h-full w-full">
          {/* up nav */}
          <div className="flex justify-between w-full  bg-[#ffff] h-[130px] border-b-[3px] border-[#F3FAFF] p-5">
            <div className="flex items-center">
              {/* todo: profile need to redirect to: /profile/friend */}
              <div className="h-[60px] w-[60px] rounded-full object-cover overflow-hidden relative">
                <Link href={`/profile/${friendProviderId}`}>
                  <Image
                    sizes="(min-width: 480px) 445px, calc(90.63vw + 28px)"
                    src={friendSrcImg}
                    alt={friendNickName}
                    width={1024}
                    height={1080}
                  />
                </Link>
              </div>

              {/* info */}
              <div className="flex gap-1 items-center flex-col px-3">
                <span className="font-nico-moji text-[20px]  text-color-6">
                  {`${firstName.substring(0, 10)}${
                    firstName.length > 10 ? ".." : ""
                  } ${lastName.substring(0, 10)}${
                    lastName.length > 10 ? ".." : ""
                  }`}
                </span>
                <span className="font-nico-moji text-[16px] -mb-1 place-self-start text-color-29">
                  {` @${friendNickName.substring(0, 10)}${
                    friendNickName.length > 10 ? ".." : ""
                  }`}
                </span>
              </div>
            </div>
            <div className=" flex items-center justify-end w-[146px]">
              <Btns
                icon={"../../assets/chatChannelMenuIcon.svg"}
                onClick={() => {
                  UserData.showFriendMenu == true
                    ? UserData.setShowFriendMenu(false)
                    : UserData.setShowFriendMenu(true);
                }}
              />
            </div>
          </div>

          {/* messages */}
          <div className="no-scrollbar h-full w-full bg-[#F3FAFF] bg-[url('../../public/assets/chat-bg.png')] overflow-y-scroll p-[38px]">
            {messages.map((msg) => (
              <Messages
                key={msg.id}
                msg={msg.content}
                avatar={msg.author.avatar}
                nickname={msg.author.nickName}
                authorId={msg.authorId}
                time={<Moment format="hh:mm A">{msg.createdAt}</Moment>}
                myId={UserData.myId.id}
              />
            ))}
            <div ref={refToBottum} />
          </div>

          {/* bott nav */}

          <form onSubmit={handelSubmitrefrech}>
            <div className="flex items-center bg-[#F3FAFF] h-[90px] p-4 rounded-[22px]">
              <input
                type="text"
                className=" bg-[#325876] pl-5 rounded-[22px] outline-none text-[17px] text-color-0 w-full h-[50px] m-3 p-3 placeholder:text-[16px] placeholder:text-color-29 "
                placeholder="type a message"
                onChange={handelMessageInput}
                ref={inputMessageRef}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handelSubmit();
                  }
                }}
              />
              <div className="flex items-center justify-end  ml-4 mr-3">
                {UserData.typing == undefined ? (
                  <Btns icon={"/../../assets/playWithIcon.svg"} />
                ) : (
                  <Btns
                    icon={"/../../assets/sendMessageIconChannel.svg"}
                    onClick={handelSubmit}
                  />
                )}
              </div>
            </div>
          </form>
        </div>
        <div>
          <FriendMenu
            avatar={friendSrcImg}
            nickName={friendNickName}
            firstName={firstName}
            lastName={lastName}
            friendProviderId={friendProviderId}
            friendId={friendId}
            // myBlockedList={myBlockedList}
            // isBlocked={isBlocked}
          />
        </div>
      </div>
    );
  }
}

export default FriendRightSide;
