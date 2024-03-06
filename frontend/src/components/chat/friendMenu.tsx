import React, { useContext } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { chatslistContext } from "../../app/(home)/chat/page";
import { SocketContext } from "@/app/SocketContext";
import Link from "next/link";
import axios from "axios";

axios.defaults.withCredentials = true ;
export default function FriendMenu({avatar ,nickName,firstName,lastName,friendProviderId,friendId}) {

  const userData = useContext(chatslistContext);

  if (userData.showFriendMenu === true) {
    const handlBlockUser = async() => {
      try{
          const postMsgResponse = await axios.post("http://localhost:3000/chat/block",
          {
              userId: friendId,
          }
          );
          console.log('res in block', postMsgResponse);
      }
      catch (error:any)
      {
          console.error(error.response);
      }
  }

    return (
      <div className=" h-[1077px] w-[422px] bg-color-0 flex items-center justify-between flex-col pt-[113px] pb-[19px]">
        <div className="w-full flex flex-col  items-center justify-center gap-[20px] ">
          <div className="w-[156px] h-[156px] rounded-full bg-color-30 relative object-cover hover:scale-[1.01]">
            <Image
              src={avatar}
              alt={nickName}
              draggable={false}
              fill={true}
              priority={true}
              className=" rounded-full w-full h-full object-cover"
            ></Image>
          </div>
          <div className="w-full h-[54px]  flex flex-col items-center justify-center">
            <span className="font-nico-moji text-color-6 sm:text-[24px] text-[18px] capitalize">
              {`${firstName.substring(0, 10)}${
                firstName.length > 10 ? ".." : ""
              } ${lastName.substring(0, 10)}${
                lastName.length > 10 ? ".." : ""
              }`}
            </span>
            <span className="font-nico-moji -mt-1 sm:text-[16px] text-[12px]  text-color-29 capitalize">
              @{nickName.substring(0, 10)}
              {nickName.length > 10 ? ".." : ""}
            </span>
          </div>
          <div className="w-full h-[2px] bg-color-30"></div>

          <div className="w-full flex items-center justify-center gap-3 flex-col">
            <div className="w-[370px] h-[60px] bg-[#F3FAFF] rounded-[22px] flex items-center justify-between px-5 hover:scale-[1.01] hover:opacity-95 cursor-pointer">
              <div className="flex items-center justify-center">
                <span className="text-color-6 capitalize">Play With</span>
              </div>
              <div className="w-[25px] h-[25px] relative flex items-center justify-center object-cover">
                <Image
                  src="../../../../assets/gameIcon.svg"
                  alt="avatar"
                  draggable={false}
                  fill={true}
                  priority={true}
                ></Image>
              </div>
            </div>
            <Link href={`/profile/${friendProviderId}`}>
              <div
                className="w-[370px] h-[60px] bg-[#F3FAFF] rounded-[22px] flex items-center justify-between px-5 hover:scale-[1.01] hover:opacity-95 cursor-pointer">
                <div className="flex items-center justify-center">
                  <span className="text-color-6">Visite Profile</span>
                </div>

                <div className="w-[25px] h-[25px] relative flex items-center justify-center object-cover">
                  <Image
                    src="../../../../assets/visiteProfileIcon.svg"
                    alt="avatar"
                    draggable={false}
                    fill={true}
                    priority={true}
                  />
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="w-[370px] h-[60px] bg-[#FFF3F3] rounded-[22px] flex items-center justify-between px-5 hover:scale-[1.01] hover:opacity-95 cursor-pointer"
              onClick={handlBlockUser}>
          <div className="flex items-center justify-center">
            <span className="text-[#763232]">Block</span>
          </div>
          <div className="w-[25px] h-[25px] relative flex items-center justify-center object-cover">
            <Image
              src="../../../../assets/blockUserIcon.svg"
              alt="avatar"
              draggable={false}
              fill={true}
              priority={true}
            ></Image>
          </div>
        </div>
      </div>
    );
  }
}
