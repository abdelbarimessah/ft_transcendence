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
import ChannelMenu from "./channelMenu";

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
        addMessageToChannel(postMsgResponse.data);
        inputMessageRef.current.value = "";
        UserData.setTyping(false);
      } 
      catch (error: any) {
        if (error.response && (error.response.status === 400 || error.response.status === 403)) {
          toast.error(error.response.data.message);
        }
      }
    };

    return (
      //chat
      <div className='flex flex-row w-full h-full'>

          <div className="flex flex-col h-full w-full">
            {/* up nav */}
            <div className="flex justify-between  bg-[#ffff] h-[130px] border-r border-b border-[#FFEFD9] p-5">
              <div className="flex items-center">
                
                
                {/* todo:   !!!!!! channel avatar !!!!!1*/}

                {/* info */}
                <div className="felx flex-col p-3 text-[#325876] ">
                  {UserData.channelClicked.name}
                </div>
              </div>
              <div className=" flex items-center justify-end w-[146px]">
                <Btns icon={"../../assets/addChannel.png"} onClick={() => {UserData.showChannelMenu == true ? UserData.setShowChannelMenu(false) : UserData.setShowChannelMenu(true)}}/>
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
                  {UserData.typing == undefined ? (
                    <Btns icon={"../../assets/addChannel.png"} />
                    ) : (
                      <Btns icon={"../../assets/ball.png"} onClick={handelSubmit} />
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
