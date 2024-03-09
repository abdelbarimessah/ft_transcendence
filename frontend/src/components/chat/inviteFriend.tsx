import React, { useContext } from "react";
import { chatslistContext } from "@/app/ChatContext";
import InviteFriendListe from "./inviteFriendListe";

function InviteFriend() {
  const UserData: any = useContext(chatslistContext);

  if (UserData.showInvite === true) {
    return (
      <>
        <div className="bg-opacity-25 bg-black z-10  flex justify-center items-center fixed w-screen h-screen">
          <div className="flex flex-col items-center w-[571px] h-[500px] bg-[#F3FAFF] rounded-[29px] border border-black">
            <button
              className="flex place-self-end text-[25px] p-2"
              onClick={() => {
                UserData.setShowInvite(false);
              }}
            >
              {" "}
              X{" "}
            </button>
            <div className="flex flex-col gap-[20px] justify-center items-center ">
              <div className=" flex"> Invite your friend and have fun </div>
              <div className="flex pt-5 flex-col justify-between items-center w-full h-fit px-3">
                <div className="flex flex-col h-[360px] overflow-y-scroll no-scrollbar">
                  {UserData.friendsList.map((chat: any) => {
                    return (
                      <InviteFriendListe
                        key={chat.id}
                        chat={chat}
                        friendList={undefined}
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

export default InviteFriend;
