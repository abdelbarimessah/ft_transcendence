"use client";
import React, { useContext, useEffect } from "react";
import Channels from "./channels";
import { chatslistContext } from "../../app/(home)/chat/page";
import Btns from "./commun_component/btns";
import { toast } from "sonner";
import Image from "next/image";
import axios from "axios";

function ChannelConversation() {
  const UserData: any = useContext(chatslistContext);

  const fetchData = async () => {
    try {
      const channelresponse = await axios.get(
        "http://localhost:3000/chat/channel/all"
      );
      UserData.setListChannelsToJoin(channelresponse.data);
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [UserData.popUpOn]);

  function handelAddNewConversation() {
    UserData.setPopUpOn(true);
  }

  if (UserData.whatIcon == "channel") {
    return (
      <>
        <div
          className="flex  justify-between items-center  px-3 min-h-[60px] border-[#F3FAFF] bg-[#ffffff] cursor-pointer hover:bg-[#e2eef6]"
          onClick={handelAddNewConversation}
        >
          <h1 className=" text-[#6D8CA3] text-lg"> Join Channel Now </h1>
          <div className="h-[36px] w-[36px] relative object-cover overflow-x-hidden ">
            <Image
              src="../../assets/iconChatPlus.svg"
              alt="iconChatPlus"
              fill={true}
              priority={true}
              draggable={false}
            ></Image>
          </div>
        </div>

        {console.log("here")}

        <div className="flex flex-col no-scrollbar overflow-y-scroll h-full w-full  px-3">
          {UserData.channelsList.map((chat) => {
            return <Channels key={chat.id} chat={chat} />;
          })}
        </div>
      </>
    );
  }
}

export default ChannelConversation;
