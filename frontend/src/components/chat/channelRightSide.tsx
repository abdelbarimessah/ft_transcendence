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
import { toast } from "sonner";
import CreatPrivate from "./creatPrivate";

// author: Object { id: "204d1637-d674-426f-8df5-260324a33823", providerId: "94400", avatar: "https://cdn.intra.42.fr/users/aaf6846387f1dfca758132ebf22f9c42/imittous.jpg", … }
// avatar: "https://cdn.intra.42.fr/users/aaf6846387f1dfca758132ebf22f9c42/imittous.jpg"
// id: "204d1637-d674-426f-8df5-260324a33823"
// nickName: "imittous"
// providerId: "94400"

// authorId: "204d1637-d674-426f-8df5-260324a33823"
// channelId: "a9e442d5-a4ea-4416-a0af-e7018c36d4dd"
// chatId: null
// content: "asd"
// createdAt: "2024-03-02T11:33:24.113Z"
// id: "b644bc76-391c-41d3-911a-69b512277d29"

function ChannelRightSide() {
  const inputMessageRef = useRef(null);
  const refToBottum = useRef(null);
  const UserData: any = useContext(chatslistContext);
  const socket = useContext(SocketContext);

  useEffect(() => {
    refToBottum.current?.scrollIntoView({ behavior: "smooth" });
  }, [UserData.channelChatConversation]);

  const addMessageToChannel = (message) => {

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
    return (() => {
        socket.off("newMessage")
    })
  }), [];
  
  
  if (UserData.channelClicked.id != undefined) {
    // console.log("UserData.channelClicked =>", UserData.channelClicked);

    const handelSubmitrefrech = (e) => {
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
          "http://localhost:3000/chat/message",
          {
            content: inputMessageRef.current?.value,
            channelId: UserData.channelClicked.id,
          },
          {
            withCredentials: true,
          }
        );
        console.log(
          "postMsgResponse.data HERHE HREHEH  = ",
          postMsgResponse.data
        );

        addMessageToChannel(postMsgResponse.data);
        inputMessageRef.current.value = "";
        UserData.setTyping(false);
      } catch (error: any) {
        if (error.response && error.response.status === 400) {
          toast.error(error.response.data.message);
        }
      }
    };

    return (
      //chat
      <div className="flex flex-col h-full">
        {/* up nav */}
        <div className="flex justify-between  bg-[#ffff] h-[130px] border-r border-b border-[#FFEFD9] p-5">
          <div className="flex items-center">
            {/* todo: channel avatar */}

            {/* info */}
            <div className="felx flex-col p-3 text-[#325876] ">
              {UserData.channelClicked.name}
            </div>
          </div>
          <div className=" flex items-center justify-end w-[146px]">
            <Btns icon={"../../assets/addChannel.png"} />
          </div>
        </div>

        {/* UserData.channelChatConversation */}
        <div className="h-full bg-[#F3FAFF] bg-[url('../../public/assets/chat-bg.png')] overflow-y-scroll p-[38px]">
          {UserData.channelChatConversation.map((msg) => (
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
          {/* {messages.map((msg) => (
                            console.log("message array: ", msg)
                        ))} */}

          <div ref={refToBottum} />
        </div>

        {/* {messages.map((chat) => {
						console.log(chat);
					})} */}

        {/* bott nav */}

        <form onSubmit={handelSubmitrefrech}>
          <div className="flex items-center bg-[#F3FAFF] h-[90px] p-4 rounded-lg">
            <input
              type="text"
              className=" bg-[#eadec4] rounded-lg outline-none text-sm text-[#39362d] w-full h-[50px] m-3 p-3 placeholder:text-sm placeholder:text-[#f3b679] "
              placeholder="type a message"
              onChange={handelMessageInput}
              ref={inputMessageRef}
            />
            <div className="flex items-center justify-end  ml-4 mr-3">
              {UserData.typing ? (
                <Btns icon={"../../assets/addChannel.png"} />
              ) : (
                <Btns icon={"../../assets/ball.png"} onClick={handelSubmit} />
              )}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default ChannelRightSide;
