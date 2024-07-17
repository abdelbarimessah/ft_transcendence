import React, { useContext } from "react";
import { chatslistContext } from "@/app/ChatContext";
import Image from "next/image";
import "moment-timezone";
import ChannelsToJoin from "./listJoinChannel";

function JoinChannel() {
  const UserData: any = useContext(chatslistContext);
  UserData.channelType = "";

  return (
    <>
      <div className="flex justify-center items-center ">
        <div className=" relative flex flex-col  w-[571px] max-h-[800px]">
          <div
            onClick={() => {
              UserData.setPopUpOn(false);
            }}
            className="absolute w-[26px] h-[26px] flex items-center justify-center top-3 right-3 hover:scale-[1.03] cursor-pointer"
          >
            <Image
              src="../../../../assets/closeSettingModal.svg"
              alt="avatar"
              draggable={false}
              fill={true}
              priority={true}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col items-center max-h-[700px] bg-[#f3faff] rounded-[29px] border border-black">
            <div className="flex mb-[36px] items-center justify-center text-[20px] h-[120px] w-full bg-[#FFFFFF] rounded-[29px_29px_0px_0px] ">
              Join Channel
            </div>
            <div className="border-b-[1px] ">
              {" "}
              Join for Endless Fun and Excitement{" "}
            </div>
            <div className="flex w-full overflow-hidden flex-col gap-9 mt-4">
              <div className="flex flex-col no-scrollbar overflow-y-scroll  h-full w-full  px-3">
                {UserData.listChannelsToJoin.map((chat: any) => {
                  return <ChannelsToJoin key={chat.id} channelToJoin={chat} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default JoinChannel;
