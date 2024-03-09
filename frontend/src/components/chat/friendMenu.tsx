import React, { useContext, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { chatslistContext } from "../../app/(home)/chat/page";
import { SocketContext } from "@/app/SocketContext";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";

axios.defaults.withCredentials = true;
export default function FriendMenu({
  avatar,
  nickName,
  firstName,
  lastName,
  friendProviderId,
  friendId,
  myBlockedList,
  isBlocked,
}: any) {
  const userData: any = useContext(chatslistContext);
  const backendUrl = process.env.BACKEND_URL || "http://localhost:3000";

  if (userData.showFriendMenu === true) {
    // const isBlocked = myBlockedList.some((item :any) => item.id === friendId);
    // console.log("isBlocked [[111111]]", isBlocked);

    const blocked = userData.blockList.some(
      (user: any) => user.id === friendId
    );
    // console.log("list is : ", userData.blockList);
    // console.log(" and my friendId is : ", friendId);
    // console.log("and the user is blocked?: ", blocked);
    // isBlocked === false ? userData.setIsBlocked("Unblock") : userData.setIsBlocked("Block")
    // console.log('the isBlocked 1231231', isBlocked);
    // useEffect(() => {
    // userData.setIsBlocked('Block')
    // }, [userData.isBlocked])

    const handlBlockUser = async () => {
      try {
        const postMsgResponse = await axios.post(`${backendUrl}/chat/block`, {
          userId: friendId,
        });
        // userData.setIsBlocked("Unblock");
        toast.message("user is blocked");
        const newList = [postMsgResponse.data, ...userData.blockList];
        // console.log("res data in handle block: ", postMsgResponse.data);
        // console.log("newlist after block: ", newList);

        userData.setBlockList(newList);
      } catch (error: any) {
        // console.error(error.response.data);
      }
    };
    const handlUnBlockUser = async () => {
      // user
      try {
        // console.log("try to unblock");

        const postMsgResponse = await axios.post(
          `${backendUrl}/chat/unblock`,
          {
            userId: friendId,
          },
          {
            withCredentials: true,
          }
        );
        // console.log("after res");
        // userData.setIsBlocked("Block");
        const newList = userData.blockList?.filter(
          (user: any) => user.id != friendId
        );
        // console.log("newList after unblock: ", newList);

        toast.message("user is unblocked");
        userData.setBlockList(newList);
      } catch (error: any) {
        // console.error(error.response);
      }
    };

    return (
      <div className=" h-[1077px] w-[422px] bg-color-0 flex items-center justify-between flex-col pt-[113px] pb-[19px]">
        <div className="w-full flex flex-col  items-center justify-center gap-[20px] ">
          <div className="w-[156px] h-[156px] rounded-full bg-color-30 relative object-cover hover:scale-[1.01]">
            <Image
              sizes="(min-width: 480px) 445px, calc(90.63vw + 28px)"
              src={avatar}
              alt={nickName}
              draggable={false}
              fill={true}
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
                  sizes="(min-width: 480px) 445px, calc(90.63vw + 28px)"
                />
              </div>
            </div>
            <Link href={`/profile/${friendProviderId}`}>
              <div className="w-[370px] h-[60px] bg-[#F3FAFF] rounded-[22px] flex items-center justify-between px-5 hover:scale-[1.01] hover:opacity-95 cursor-pointer">
                <div className="flex items-center justify-center">
                  <span className="text-color-6">Visite Profile</span>
                </div>

                <div className="w-[25px] h-[25px] relative flex items-center justify-center object-cover">
                  <Image
                    sizes="(min-width: 480px) 445px, calc(90.63vw + 28px)"
                    src="../../../../assets/visiteProfileIcon.svg"
                    alt="avatar"
                    draggable={false}
                    fill={true}
                  />
                </div>
              </div>
            </Link>
          </div>
        </div>

        {blocked ? (
          <div
            className="w-[370px] h-[60px] bg-[#FFF3F3] rounded-[22px] flex items-center justify-between px-5 hover:scale-[1.01] hover:opacity-95 cursor-pointer"
            onClick={handlUnBlockUser}
          >
            <div className="flex items-center justify-center">
              <span className="text-[#763232]">unblock</span>
            </div>
            <div className="w-[25px] h-[25px] relative flex items-center justify-center object-cover">
              <Image
                sizes="(min-width: 480px) 445px, calc(90.63vw + 28px)"
                src="../../../../assets/blockUserIcon.svg"
                alt="avatar"
                draggable={false}
                fill={true}
              />
            </div>
          </div>
        ) : (
          <div
            className="w-[370px] h-[60px] bg-[#FFF3F3] rounded-[22px] flex items-center justify-between px-5 hover:scale-[1.01] hover:opacity-95 cursor-pointer"
            onClick={handlBlockUser}
          >
            <div className="flex items-center justify-center">
              <span className="text-[#763232]">block</span>
            </div>
            <div className="w-[25px] h-[25px] relative flex items-center justify-center object-cover">
              <Image
                sizes="(min-width: 480px) 445px, calc(90.63vw + 28px)"
                src="../../../../assets/blockUserIcon.svg"
                alt="avatar"
                draggable={false}
                fill={true}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}
