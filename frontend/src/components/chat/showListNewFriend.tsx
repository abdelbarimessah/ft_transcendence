import React from "react";
import { useContext } from "react";

import { chatslistContext } from "@/app/ChatContext";
import InviteFriendListe from "./inviteFriendListe";
import Image from "next/image";

function ShowListNewFriend() {
  const userData: any = useContext(chatslistContext);
  if (userData.showNewFriendsList === true) {
    return (
      <>
        <div className="bg-opacity-25 bg-black  flex justify-center items-center fixed w-screen h-screen ">
          <div className="flex flex-col items-center w-[520px] h-[500px] bg-[#ffff] rounded-[22px] relative">
            <div
              onClick={() => {
                userData.setShowNewFriendsList(false);
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
              ></Image>
            </div>

            <div className="flex flex-col gap-[20px] justify-center items-center pt-10">
              <div className=" flex items-center justify-center ">
                <span className="text-color-6 text-[20px]">start new chat</span>
              </div>

              <div className="flex pt-5 flex-col justify-between items-center w-full h-fit px-3">
                <div className="flex flex-col h-[360px] overflow-y-scroll no-scrollbar">
                  {userData.newFriendsList.map((friendLinst: any) => {
                    return (
                      <InviteFriendListe
                        key={friendLinst.id}
                        chat={undefined}
                        friendLinst={friendLinst}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ShowListNewFriend;
