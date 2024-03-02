'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";



axios.defaults.withCredentials = true;

export default function App() {
  const [settingModal, setSettingModal] = useState(false);

  const handleSettingsClick = () => {
    setSettingModal(true)
  }
  const handleCloseSettingModal = () => {
    setSettingModal(false)
  }

  return (
    <div className="flex w-full flex-col  items-center justify-center relative bg-color-18">
      <div className="select-none h-[1077px] w-[422px] bg-color-0 flex items-center justify-between flex-col pt-[113px] pb-[19px] relative" >
        {!settingModal &&
          <div onClick={handleSettingsClick} className="absolute w-[25px] h-[27px] flex items-center justify-center top-3 right-3 hover:scale-[1.03] cursor-pointer">
            <Image
              src="../../../../assets/settingIconChatGroup.svg"
              alt="avatar"
              draggable={false}
              fill={true}
              priority={true}
              className="w-full h-full object-cover"
            >
            </Image>
          </div>
        }
        {settingModal &&
          <div onClick={handleCloseSettingModal} className="absolute w-[26px] h-[26px] flex items-center justify-center top-3 right-3 hover:scale-[1.03] cursor-pointer">
            <Image
              src="../../../../assets/closeSettingModal.svg"
              alt="avatar"
              draggable={false}
              fill={true}
              priority={true}
              className="w-full h-full object-cover"
            >
            </Image>
          </div>
        }
        <div className="w-full flex flex-col  items-center justify-center gap-[10px] relative">
          {!settingModal &&
            <div className="">
              <div className="w-[156px] h-[156px] rounded-full bg-color-30 relative object-cover hover:scale-[1.01]">
                <Image
                  src="../../../../assets/ProfileHeaderImage.svg"
                  alt="avatar"
                  draggable={false}
                  fill={true}
                  priority={true}
                  className="w-full h-full object-cover"
                >
                </Image>
              </div>
              <div className="w-full h-[54px]  flex flex-col items-center justify-center">
                <span className='font-nico-moji text-color-6 sm:text-[24px] text-[18px] capitalize'>
                  Leet Chess
                </span>
              </div>
              <div className="w-full h-[2px] bg-color-30">
              </div>
            </div>
          }
          {settingModal &&
            <div className="flex items-center justify-center flex-col gap-[20px]">
              <div className="w-[119px] h-[119px] rounded-full bg-color-30 relative object-cover hover:scale-[1.01] ">
                <Image
                  src="../../../../assets/ProfileHeaderImage.svg"
                  alt="avatar"
                  draggable={false}
                  fill={true}
                  priority={true}
                  className="w-full h-full object-cover"
                >
                </Image>
              </div>
              <div className="flex gap-[10px]">
                <SetPassowrd />
                <SetPublic />
              </div>
              <div className="flex gap-[119px]">
                <SetPrivate />
                <div className="h-[29px] w-[69px] bg-[#F3FAFF] rounded-[10px] flex items-center justify-center mt-[16px]">
                  <span className="text-[12px] text-color-31">Save</span>
                </div>
              </div>
              <div className="w-full h-[2px] bg-color-30">
              </div>

            </div>
          }

          <div className="w-full flex flex-col justify-center gap-2">
            <div className="Chat_members flex justify-start items-center gap-2 pl-4  ">
              <div className="relative h-[16px] w-[22px] object-cover">
                <Image
                  src="../../../../assets/groupMembersChat.svg"
                  alt="avatar"
                  draggable={false}
                  width={22}
                  height={16}
                  priority={true}
                  className="w-full h-full object-cover"
                >
                </Image>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-center text-color-6" >Members</span>
              </div>
            </div>
            <div className="Chat_members_tab w-full h-[473px] flex items-center pt-3 overflow-y-auto gap-1 flex-col  no-scrollbar overflow-hidden ">
              <Owner />
              <Admin />
              <User />
              <User />
              <User />
              <User />
              <User />
              <User />
              <User />
            </div>
          </div>
        </div>

        <div className="w-[370px] h-[60px] bg-[#FFF9F9] rounded-[22px] flex items-center justify-between px-5 hover:scale-[1.01] hover:opacity-95 cursor-pointer">
          <div className="flex items-center justify-center">
            <span className="text-[#763232]">Exit Group</span>
          </div>
          <div className="w-[25px] h-[25px] relative flex items-center justify-center object-cover">
            <Image
              src="../../../../assets/exitGroupChat.svg"
              alt="avatar"
              draggable={false}
              fill={true}
              priority={true}
            >
            </Image>
          </div>
        </div>
      </div>
    </div>
  );
}



function Owner() {
  return (
    <div className="Chat_owner h-[60px] w-[370px] bg-[#F3FAFF] flex items-center justify-between rounded-[22px] pl-2 pr-10 flex-shrink-0  hover:scale-[1.01]">
      <div className="flex items-center justify-center">
        <div className="h-[43px] w-[43px] relative object-cover cursor-pointer">
          <Image
            src="../../../../assets/ProfileHeaderImage.svg"
            alt="avatar"
            draggable={false}
            fill={true}
            priority={true}
            className="w-full h-full object-cover"
          >
          </Image>
        </div>
        <div className="Chat_names flex flex-col items-start justify-center pl-[10px]">
          <span className="text-color-6 text-[14px]">abdelbari messah</span>
          <span className="text-color-23 text-[10px] -mt-1">@amessah</span>
        </div>
      </div>
      <div className="Chat_role">
        <span className="text-[#325176]/50 text-[14px]">Owner</span>
      </div>
    </div>
  )
}

function Admin() {
  return (
    <div className="Chat_owner h-[60px] w-[370px] bg-[#F3FAFF] flex items-center justify-between rounded-[22px] pl-2 pr-10 flex-shrink-0 hover:scale-[1.01]">
      <div className="flex items-center justify-center">
        <div className="h-[43px] w-[43px] relative object-cover cursor-pointer">
          <Image
            src="../../../../assets/ProfileHeaderImage.svg"
            alt="avatar"
            draggable={false}
            fill={true}
            priority={true}
            className="w-full h-full object-cover"
          >
          </Image>
        </div>
        <div className="Chat_names flex flex-col items-start justify-center pl-[10px]">
          <span className="text-color-6 text-[14px]">abdelbari messah</span>
          <span className="text-color-23 text-[10px] -mt-1">@amessah</span>
        </div>
      </div>
      <div className="Chat_role flex items-center justify-center gap-8">
        <span className="text-[#325176]/50 text-[14px]">Admin</span>
        <div className="relative h-[18px] w-[4px]  object-cover cursor-pointer hover:scale-[1.02]">
          <Image
            src="../../../../assets/threePointChat.svg"
            alt="avatar"
            draggable={false}
            fill={true}
            priority={true}
            className="w-full h-full object-cover"
          >
          </Image>
        </div>
      </div>
    </div>
  )
}

function User() {
  return (
    <div className="Chat_owner h-[60px] w-[370px] bg-[#F3FAFF] flex items-center justify-between rounded-[22px] pl-2 pr-10 flex-shrink-0  hover:scale-[1.01]">
      <div className="flex items-center justify-center">
        <div className="h-[43px] w-[43px] relative object-cover cursor-pointer">
          <Image
            src="../../../../assets/ProfileHeaderImage.svg"
            alt="avatar"
            draggable={false}
            fill={true}
            priority={true}
            className="w-full h-full object-cover"
          >
          </Image>
        </div>
        <div className="Chat_names flex flex-col items-start justify-center pl-[10px]">
          <span className="text-color-6 text-[14px]">abdelbari messah</span>
          <span className="text-color-23 text-[10px] -mt-1">@amessah</span>
        </div>
      </div>
      <div className="relative h-[18px] w-[4px] object-cover cursor-pointer hover:scale-[1.02] ">
        <Image
          src="../../../../assets/threePointChat.svg"
          alt="avatar"
          draggable={false}
          fill={true}
          priority={true}
          className="w-full h-full object-cover"
        >
        </Image>
      </div>
    </div>
  )
}

function SetPassowrd() {

  return (
    <div className="w-[178px] h-[45px] bg-color-31 gap-4 rounded-[16px] flex items-center justify-center ">

      <div className="relative h-[20px] w-[20px] object-cover cursor-pointer hover:scale-[1.02] ">
        <Image
          src="../../../../assets/setPasswordIcon.svg"
          alt="avatar"
          draggable={false}
          fill={true}
          priority={true}
          className="w-full h-full object-cover"
        >
        </Image>
      </div>
      <div className="">
        <span className="text-[12px] text-color-0">Set Password</span>
      </div>
    </div>
  )
}
function SetPublic() {

  return (
    <div className="w-[178px] h-[45px] bg-color-31 gap-4 rounded-[16px] flex items-center justify-center ">
      <div className="relative h-[20px] w-[17px] object-cover cursor-pointer hover:scale-[1.02] ">
        <Image
          src="../../../../assets/setPublicIcon.svg"
          alt="avatar"
          draggable={false}
          fill={true}
          priority={true}
          className="w-full h-full object-cover"
        >
        </Image>
      </div>
      <div className="">
        <span className="text-[12px] text-color-0">Set Public</span>
      </div>
    </div>
  )
}
function SetPrivate() {

  return (
    <div className="w-[178px] h-[45px] bg-color-31 gap-4 rounded-[16px] flex items-center justify-center ">
      <div className="relative h-[20px] w-[17px] object-cover cursor-pointer hover:scale-[1.02] ">
        <Image
          src="../../../../assets/setPrivateIcon.svg"
          alt="avatar"
          draggable={false}
          fill={true}
          priority={true}
          className="w-full h-full object-cover"
        >
        </Image>
      </div>
      <div className="">
        <span className="text-[12px] text-color-0">Set private</span>
      </div>
    </div>
  )
}




export { Owner, Admin, User, SetPassowrd, SetPublic, SetPrivate }