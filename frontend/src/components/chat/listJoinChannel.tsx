import { createContext, useContext, useRef } from "react";

import { chatslistContext } from "../../app/(home)/chat/page";
import { toast } from "sonner";
import { socket } from "@/app/SocketContext";
import axios from "axios";
import EnterPassword from "./enterPassword";
import Image from "next/image";

function ChannelsToJoin({ channelToJoin }: any) {
  const backendUrl = process.env.BACKEND_URL || "http://localhost:3000";

  const UserData: any = useContext(chatslistContext);

  const addNewChannelToList = (channel: string) => {
    const newChannelToAdd = [...UserData.channelsList, channel];
    UserData.setChannelsList(newChannelToAdd);
  };

  const addChannelToList = async (channelToJoin: any) => {
    // console.log("UserData.channelToJoin = >", channelToJoin.id);
    try {
      const joinResponse = await axios.post(
        `${backendUrl}/chat/channel/${channelToJoin.id}/join`,
        {
          password: UserData.inputEnterPassRef?.current?.value,
        },
        {
          withCredentials: true,
        }
      );
      // console.log("joinResponse.data here here:", joinResponse.data);
      UserData.setChannelClicked(joinResponse.data);
      addNewChannelToList(joinResponse.data);
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      }
    }
  };

  const handelChanneltoJoin = (channelToJoin: any) => {
    if (channelToJoin.type === "PROTECTED") {
      UserData.setChannelToJoin(channelToJoin);
      UserData.setNeedPassword(true);
    } else {
      addChannelToList(channelToJoin);
      UserData.setPopUpOn(false);
    }
    // console.log("channelToJoin im at handelChanneltoJoin <= =>", channelToJoin.id);
  };

  return (
    <div className=" flex justify-between items-center border-t-[2px] border-[#cdd7dd] p-3 min-h-[68px]">
      <div className="flex justify-between items-center p-[10px]">
        <Image
          src="/assets/friend_icon.png"
          alt="channel pic"
          className=" rounded-full w-[60px] "
          priority={true}
          width={60}
          height={60}
        />

        <h1 className="flex pl-3 font-medium text-[#325876] ">
          {channelToJoin.name}
        </h1>
      </div>
      <button
        className="flex items-center justify-center w-[100px] h-[55px] p-5 text-[#8194a3] bg-[#FFFFFF] border rounded-lg cursor-pointer hover:text-gray-600 hover:bg-[#f7faf1]"
        onClick={(e) => {
          handelChanneltoJoin(channelToJoin);
        }}
      >
        Join
      </button>
    </div>
  );
}

export default ChannelsToJoin;
