import React, { useContext, useRef, useEffect } from "react";
import Btns from "./commun_component/btns";
import { chatslistContext } from "@/app/ChatContext";
import Messages from "./messages";
import Moment from "react-moment";
import "moment-timezone";
import axios from "axios";
import { SocketContext } from "@/app/SocketContext";
import { toast } from "sonner";
import ChannelMenu from "./channelMenu";
import Image from "next/image";

function ChannelRightSide() {
  const inputMessageRef: any = useRef(null);
  const refToBottum: any = useRef(null);
  const UserData: any = useContext(chatslistContext);
  const socket = useContext(SocketContext);
  const backendUrl = process.env.BACKEND_API || "http://localhost:3000";

  useEffect(() => {
    refToBottum.current?.scrollIntoView({ behavior: "smooth" });
  }, [UserData.channelChatConversation]);

  const addMessageToChannel = (message: any) => {
    if (UserData.channelClicked.id === message.channelId) {
      UserData.setChannelChatConversation(null);
      const newMessageArray = [...UserData.channelChatConversation, message];
      UserData.setChannelChatConversation(newMessageArray);
    }
  };

  useEffect(() => {
    socket.on("newMessage", (data) => {
      addMessageToChannel(data);
    });
    return () => {
      socket.off("newMessage");
    };
  }),
    [];

  if (UserData.channelClicked?.id != undefined) {
    const handelSubmitrefrech = (e: any) => {
      e.preventDefault();
    };

    const handelMessageInput = () => {
      inputMessageRef.current?.value.length === 0
        ? UserData.setTyping(true)
        : UserData.setTyping(false);
    };

    const handelSubmit = async () => {
      try {
        const postMsgResponse = await axios.post(
          `${backendUrl}/chat/message`,
          {
            content: inputMessageRef.current?.value,
            channelId: UserData.channelClicked.id,
          },
          {
            withCredentials: true,
          }
        );
        addMessageToChannel(postMsgResponse.data);
        inputMessageRef.current.value = "";
        UserData.setTyping(false);
      } catch (error: any) {
        if (
          error.response &&
          (error.response.status === 400 || error.response.status === 403)
        ) {
          toast.error(error.response.data.message);
        }
      }
    };

    return (
      <div className="flex flex-row w-full h-full ">
        <div className="flex flex-col h-full w-full">
          <div className="flex justify-between w-full  bg-[#ffff] h-[130px] border-b-[3px] border-[#F3FAFF] p-5 rounded-[0px_29px_0px_0px]">
            <div className="flex items-center">
              <div className="h-[60px] w-[60px] rounded-full object-cover overflow-hidden relative">
                <Image
                  src={
                    UserData.channelClicked.avatar ||
                    "../../../assets/DefaultChannelImage.svg"
                  }
                  alt="DefaultChannelImage"
                  fill={true}
                  draggable={false}
                  priority={true}
                  sizes="(min-width: 480px) 445px, calc(90.63vw + 28px)"
                ></Image>
              </div>
              <div className="flex gap-1 items-center flex-col px-3">
                <span className="font-nico-moji text-[18px]  text-color-6">
                  {`${UserData.channelClicked.name.substring(0, 14)}${
                    UserData.channelClicked.name.length > 14 ? ".." : ""
                  }`}
                </span>
                <span className="font-nico-moji text-[12px] -mb-1 place-self-start text-color-29">
                  {` ${UserData.channelClicked.type.substring(0, 10)}${
                    UserData.channelClicked.type.length > 10 ? ".." : ""
                  }`}
                </span>
              </div>
            </div>
            <div className=" flex items-center justify-end w-[146px]">
              <Btns
                icon={"../../assets/chatChannelMenuIcon.svg"}
                onClick={() => {
                  UserData.showChannelMenu == true
                    ? UserData.setShowChannelMenu(false)
                    : UserData.setShowChannelMenu(true);
                }}
              />
            </div>
          </div>

          <div className="no-scrollbar h-full bg-[#F3FAFF] bg-[url('../../public/assets/chat-bg.png')] overflow-y-scroll p-[38px]">
            {UserData.channelChatConversation.map((msg: any) => (
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

          <form onSubmit={handelSubmitrefrech}>
            <div className="flex items-center bg-[#fafdff] h-[90px] p-4 border-[#F3FAFF]  border-r-[5px]">
              <input
                type="text"
                className=" bg-[#71a1c7] pl-5 rounded-[22px] outline-none text-[17px] text-color-0 w-full h-[50px] m-3 p-3 placeholder:text-[16px] placeholder:text-color-0 "
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
          <ChannelMenu />
        </div>
      </div>
    );
  }
}

export default ChannelRightSide;
