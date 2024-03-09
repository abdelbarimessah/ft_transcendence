import React, { useContext } from "react";
import Image from "next/image";
import { chatslistContext } from "@/app/ChatContext";
import { SocketContext } from "@/app/SocketContext";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
  const socketClient = useContext(SocketContext);
  const router = useRouter();
  const backendUrl = process.env.BACKEND_API || "http://localhost:3000";

  if (userData.showFriendMenu === true) {
    const blocked = userData.blockList.some(
      (user: any) => user.id === friendId
    );

    const handlBlockUser = async () => {
      try {
        const postMsgResponse = await axios.post(`${backendUrl}/chat/block`, {
          userId: friendId,
        });
        toast.message("user is blocked");
        const newList = [postMsgResponse.data, ...userData.blockList];
        userData.setBlockList(newList);
      } catch (error: any) {
        console.error(error.response.data);
      }
    };
    const handlUnBlockUser = async () => {
      // user
      try {
        const postMsgResponse = await axios.post(
          `${backendUrl}/chat/unblock`,
          {
            userId: friendId,
          },
          {
            withCredentials: true,
          }
        );
        const newList = userData.blockList?.filter(
          (user: any) => user.id != friendId
        );

        toast.message("user is unblocked");
        userData.setBlockList(newList);
      } catch (error: any) {
        console.error(error.response);
      }
    };

    const handlePlayInvite = () => {
      let friendData;
      for (let member of userData.chatClicked.members) {
        if (userData.myId.providerId !== member.providerId) {
          friendData = member;
          break;
        }
      }

      socketClient.emit("playInvite", {
        sender: userData.myId,
        receiver: friendData,
      });
      router.push(
        `/game/waiting/${userData.myId.providerId}${friendData.providerId}`
      );
    };

    return (
      <div className=" h-[1077px] w-[422px] bg-color-0 flex items-center justify-between flex-col pt-[113px] pb-[19px]">
        <div className="w-full flex flex-col  items-center justify-center gap-[20px] ">
          <div className="w-[156px] h-[156px] rounded-full bg-color-30 relative object-cover hover:scale-[1.01]">
            <Image
              sizes="(min-width: 480px) 445px, calc(90.63vw + 28px)"
              src={avatar}
              alt="alt-img"
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
            <div
              onClick={handlePlayInvite}
              className="w-[370px] h-[60px] bg-[#F3FAFF] rounded-[22px] flex items-center justify-between px-5 hover:scale-[1.01] hover:opacity-95 cursor-pointer"
            >
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
