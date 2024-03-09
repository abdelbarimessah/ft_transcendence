import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { chatslistContext } from "@/app/ChatContext";
import { toast } from "sonner";
import Owner from "@/components/chat/ownerId";
import RenderFromUser from "@/components/chat/renderFromUser";

axios.defaults.withCredentials = true;

export default function ChannelMenu() {
  const userData: any = useContext(chatslistContext);

  const [settingModal, setSettingModal] = useState(false);
  const [passwordState, setPasswordState] = useState(false);
  const [changeChannelNameState, setChangeChannelNameState] = useState(false);
  const [cancelState, setCancelState] = useState("hidden");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [photoPath, setPhotoPath] = useState<any>();
  const [avatar, setAvatar] = useState<File | null>(null);
  const [changeAvatar, setChangeAvatar] = useState(false);
  const [avatarLink, setAvatarLink] = useState<any>();

  const handleSettingsClick = () => {
    setSettingModal(true);
  };
  const handleCloseSettingModal = () => {
    setSettingModal(false);
  };

  const handleCancelClick = () => {
    setChangeChannelNameState(false);
    setPasswordState(false);
    setCancelState("hidden");
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChangeAvatar(true);
    const file = event.target.files?.[0];
    if (file) {
      setPhotoPath(URL.createObjectURL(file));
      setAvatar(file);
      const formData = new FormData();
      formData.append("avatar", file);

      await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/chat/upload`, formData)
        .then((res) => {

          setAvatarLink(res.data);
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
    // if (avatar ) {
    //   const formData = new FormData();
    //   formData.append("avatar", avatar);
    // }
  };

  const fetchChannelMembers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/chat/channel/${userData.channelClicked.id}/members`
      );
      userData.setChannelMembers(response.data);
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      }
    }
  };
  let amdinId: string = "";
  const myStatus: string = userData.channelMembers?.members?.map((member:any) => {
    if (member.userId === userData.myId.id && member.isAdmin === true) {
      return (amdinId = member.userId);
    }
  });

  useEffect(() => {
    if (userData.showChannelMenu === true) fetchChannelMembers();
  }, [userData.channelClicked, userData.showChannelMenu]);

  const ownerId = userData.channelMembers.ownerId;

  const handelLeaveChannel = async () => {
    try {
      const bankResponse = await axios.post(
        `http://localhost:3000/chat/channel/${userData.channelClicked.id}/leave`,
        {
          userId: userData.myId.id,
        },
        {
          withCredentials: true,
        }
      );
      toast.message("You leave sucsesfouli ");
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      }
    }
  };
  const handelChangeChannelSetting = async () => {
    try {
      const data: any = {};
      if (name) data.name = name;
      if (pass) {
        data.password = pass;
        data.type = "PROTECTED";
      }
      if (avatarLink?.avatar) data.avatar = avatarLink.avatar;
      const newSettingResponse = await axios.patch(
        `http://localhost:3000/chat/channel/${userData.channelClicked.id}`,
        data,
        {
          withCredentials: true,
        }
      );
      toast.message("channel updated");
      userData.setShowChannelMenu(false);
      handleCloseSettingModal();
      handleCancelClick();
      const newChannelList = userData.channelsList.map((channel: any) =>
        channel.id === newSettingResponse.data.id
          ? newSettingResponse.data
          : channel
      );
      userData.setChannelsList(newChannelList);
      userData.setChannelClicked(newSettingResponse.data);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  if (userData.showChannelMenu === true) {
    return (
      <div className="flex w-full flex-col  items-center justify-center relative bg-color-0 rounded-[22px] ">
        <div className="select-none h-[1077px] w-[422px] bg-color-0 flex items-center justify-between flex-col pt-[113px] pb-[19px] relative rounded-[22px]">
          {userData.channelClicked.ownerId === userData.myId.id &&
            !settingModal && (
              <div
                onClick={handleSettingsClick}
                className="absolute w-[25px] h-[27px] flex items-center justify-center top-3 right-3 hover:scale-[1.03] cursor-pointer"
              >
                <Image
                  sizes="(min-width: 480px) 445px, calc(90.63vw + 28px)"
                  src="../../../../assets/settingIconChatGroup.svg"
                  alt="avatar"
                  draggable={false}
                  fill={true}
                  priority={true}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          {userData.channelClicked.ownerId === userData.myId.id &&
            settingModal && (
              <div
                onClick={handleCloseSettingModal}
                className="absolute w-[26px] h-[26px] flex items-center justify-center top-3 right-3 hover:scale-[1.03] cursor-pointer"
              >
                <Image
                  sizes="(min-width: 480px) 445px, calc(90.63vw + 28px)"
                  src="../../../../assets/closeSettingModal.svg"
                  alt="avatar"
                  draggable={false}
                  fill={true}
                  priority={true}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          <div className="w-full flex flex-col  items-center justify-center gap-[10px] relative">
            {!settingModal && (
              <div className="flex items-center justify-center flex-col">
                <div className="w-[156px] h-[156px] rounded-full bg-color-30 relative object-cover overflow-hidden hover:scale-[1.01]">
                  <Image
                    sizes="(min-width: 480px) 445px, calc(90.63vw + 28px)"
                    src={
                      userData.channelClicked.avatar ||
                      "../../../assets/DefaultChannelImage.svg"
                    }
                    alt="avatar"
                    draggable={false}
                    fill={true}
                    priority={true}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="w-full h-[54px]  flex flex-col items-center justify-center">
                  <span className="font-nico-moji text-color-6 sm:text-[24px] text-[18px] capitalize">
                    {userData.channelClicked.name}
                  </span>
                </div>
                <div className="w-full h-[2px] bg-color-30"></div>
              </div>
            )}
            {settingModal && (
              <div className="flex items-center justify-center flex-col gap-[20px]">
                <div className="w-[134px] h-[134px] bg-color-6 rounded-full relative border border-color-0 group cursor-pointer">
                  <div className="w-full h-full absolute rounded-full overflow-hidden">
                    <Image
                      sizes="(min-width: 480px) 445px, calc(90.63vw + 28px)"
                      src={
                        photoPath ||
                        userData.channelClicked.avatar ||
                        "../../../assets/DefaultChannelImage.svg"
                      }
                      alt="Add image icon"
                      fill={true}
                      className="object-cover w-full h-full"
                      priority={true}
                    />
                  </div>

                  <div className="h-[23px] w-[23px]  absolute bottom-2 right-2 bg-color-24 flex items-center justify-center rounded-full ">
                    <Image
                      sizes="(min-width: 480px) 445px, calc(90.63vw + 28px)"
                      src="/../../assets/addImageIcon.svg"
                      alt="Add image icon"
                      height={14}
                      width={14}
                      priority={true}
                    />
                  </div>
                  <div className="h-full w-full rounded-full absolute hidden group-hover:flex  bg-black items-center justify-center text-center bg-slate-600/50 text-white tracking-wider">
                    Change Profile
                  </div>
                  <input
                    className="h-full w-full rounded-full absolute opacity-0 z-10 cursor-pointer"
                    onChange={handleFileChange}
                    type="file"
                    accept=".png, .jpg, .jpeg"
                  />
                </div>
                <div className="flex gap-[10px]">
                  {userData.channelClicked.type !== "PROTECTED" && (
                    <>
                      <SetPassowrd
                        setPasswordState={setPasswordState}
                        passwordState={passwordState}
                        setCancelState={setCancelState}
                      />
                      {passwordState && <TypePassword setPass={setPass} />}
                    </>
                  )}
                  {userData.channelClicked.type !== "PRIVATE" && <SetPrivate />}
                  {userData.channelClicked.type !== "PUBLIC" && <SetPublic />}
                </div>
                <div
                  className={` {${cancelState} === 'hidden' ? 'gap-[119px]' : 'gap-[43px]' } flex  w-full justify-between `}
                >
                  <SetChannelName
                    setChangeChannelNameState={setChangeChannelNameState}
                    changeChannelNameState={changeChannelNameState}
                    setCancelState={setCancelState}
                  />
                  {changeChannelNameState && (
                    <TypeChannelName setName={setName} />
                  )}
                  {userData.channelClicked.type === "PROTECTED" && (
                    <>
                      <SetPassowrd
                        setPasswordState={setPasswordState}
                        passwordState={passwordState}
                        setCancelState={setCancelState}
                      />
                      {passwordState && <TypePassword setPass={setPass} />}
                    </>
                  )}
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div
                    onClick={handleCancelClick}
                    className={` ${cancelState} h-[29px] w-[69px] bg-[#EBEBEB] rounded-[10px] items-center justify-center mt-[16px] cursor-pointer  hover:scale-[1.01] hover:opacity-95 `}
                  >
                    <div className="h-full w-full flex items-center justify-center">
                      <span className="text-[12px] text-color-31">
                        {" "}
                        Cancel{" "}
                      </span>
                    </div>
                  </div>

                  <div
                    className="h-[29px] w-[69px] bg-color-32 rounded-[10px] flex items-center justify-center mt-[16px] cursor-pointer  hover:scale-[1.01] hover:opacity-95"
                    onClick={handelChangeChannelSetting}
                  >
                    <span className="text-[12px] text-color-31">Save</span>
                  </div>
                </div>
                <div className="w-full h-[2px] bg-color-30"></div>
              </div>
            )}

            <div className="w-full flex flex-col justify-center gap-2 px-3 ">
              <div className="Chat_members flex justify-start items-center gap-2 pl-4  ">
                <div className="relative h-[16px] w-[22px] object-cover">
                  <Image
                    sizes="(min-width: 480px) 445px, calc(90.63vw + 28px)"
                    src="../../../../assets/groupMembersChat.svg"
                    alt="avatar"
                    draggable={false}
                    width={22}
                    height={16}
                    priority={true}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-center text-color-6">Members</span>
                </div>
              </div>

              <div className="Chat_members_tab w-full h-[473px] flex items-center py-3 overflow-y-auto gap-1 flex-col  no-scrollbar overflow-hidden bg-color-6 rounded-[10px]">
                {userData.channelMembers?.members?.map((members: any) =>
                  members.user.id === ownerId ? (
                    <Owner
                      key={members.user.id}
                      userId={members.user.id}
                      ownerId={ownerId}
                      avatar={members.user.avatar}
                      nickName={members.user.nickName}
                      firstName={members.user.firstName}
                      lastName={members.user.lastName}
                      admin={members.isAdmin}
                    />
                  ) : (
                    <User
                      key={members.user.id}
                      myId={userData.myId.id}
                      avatar={members.user.avatar}
                      nickName={members.user.nickName}
                      firstName={members.user.firstName}
                      lastName={members.user.lastName}
                      admin={members.isAdmin}
                      ownerId={ownerId}
                      userId={members.user.id}
                      isMuted={members.isMuted}
                      amdinId={amdinId}
                    />
                  )
                )}
              </div>
            </div>
          </div>

          <div
            className="w-[370px] h-[60px] bg-[#FFF9F9] rounded-[22px] flex items-center justify-between px-5 hover:scale-[1.01] hover:opacity-95 cursor-pointer"
            onClick={handelLeaveChannel}
          >
            <div className="flex items-center justify-center">
              <span className="text-[#763232]">Exit Group</span>
            </div>
            <div className="w-[25px] h-[25px] relative flex items-center justify-center object-cover">
              <Image
                sizes="(min-width: 480px) 445px, calc(90.63vw + 28px)"
                src="../../../../assets/exitGroupChat.svg"
                alt="avatar"
                draggable={false}
                fill={true}
                priority={true}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function User({
  avatar,
  nickName,
  firstName,
  lastName,
  admin,
  myId,
  userId,
  amdinId,
}: any) {
  const [showSettings, setShowSettings] = useState(false);
  const userRef = useRef<HTMLDivElement>(null);
  const zIndex = showSettings ? "z-10" : "z-0";
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setShowSettings(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (admin === true && userId === myId) {
    return (
      <RenderFromUser
        avatar={avatar}
        nickName={nickName}
        firstName={firstName}
        lastName={lastName}
        zIndex={zIndex}
        userRef={userRef}
        admin={admin}
      />
    );
  } else if (myId === amdinId) {

    return (
      <div
        ref={userRef}
        className={`Chat_owner h-[60px] w-[370px] bg-color-32 flex items-center justify-between rounded-[22px] pl-2 pr-10 flex-shrink-0  hover:scale-[1.01] relative ${zIndex}`}
      >
        <div className="flex items-center justify-center">
          <div className="h-[43px] w-[43px] relative object-cover cursor-pointer">
            {/* <Link href={`/profile/${friendProviderId}`}> */}
            <Image
              sizes="(min-width: 480px) 445px, calc(90.63vw + 28px)"
              src={avatar}
              alt={nickName}
              draggable={false}
              fill={true}
              priority={true}
              className="w-full h-full rounded-full object-cover"
            />
            {/* </Link> */}
          </div>
          <div className="Chat_names flex flex-col items-start justify-center pl-[10px]">
            <span className="text-color-6 text-[14px]">
              {firstName} {lastName}
            </span>
            <span className="text-color-23 text-[10px] -mt-1">{nickName}</span>
          </div>
          {admin === true && (
            <div className="Chat_role">
              <span className="text-[#325176]/50 text-[14px] pl-[45px]">
                Admin
              </span>
            </div>
          )}
        </div>
        <div
          onClick={(e) => {
            setShowSettings(true);
          }}
          className="flex items-center justify-center px-3 cursor-pointer hover:scale-[1.02]"
        >
          <div className="relative h-[18px] w-[4px] object-cover  ">
            <Image
              sizes="(min-width: 480px) 445px, calc(90.63vw + 28px)"
              src="../../../../assets/threePointChat.svg"
              alt="avatar"
              draggable={false}
              fill={true}
              priority={true}
              className="w-full h-full object-cover"
            ></Image>
          </div>
        </div>
        {showSettings && <UsersSettingsPoint userId={userId} />}
      </div>
    );
  } else {
    return (
      <RenderFromUser
        avatar={avatar}
        nickName={nickName}
        firstName={firstName}
        lastName={lastName}
        zIndex={zIndex}
        userRef={userRef}
        admin={admin}
      />
    );
  }
}

function SetPassowrd(props: any) {
  return (
    !props.passwordState && (
      <div
        onClick={(e) => {
          props.setPasswordState(true);
          props.setCancelState("");
        }}
        className="w-[178px] h-[45px] bg-color-31 gap-4 rounded-[16px] flex items-center justify-center cursor-pointer  hover:scale-[1.01] hover:opacity-95"
      >
        <div className="relative h-[20px] w-[20px] object-cover cursor-pointer hover:scale-[1.02] ">
          <Image
            sizes="(min-width: 480px) 445px, calc(90.63vw + 28px)"
            src="../../../../assets/setPasswordIcon.svg"
            alt="avatar"
            draggable={false}
            fill={true}
            priority={true}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="">
          <span className="text-[12px] text-color-0">Set Password</span>
        </div>
      </div>
    )
  );
}

function TypePassword({ setPass }: any) {
  return (
    <div className="w-[178px] h-[45px] bg-color-32 gap-4 rounded-[16px] flex items-center justify-center cursor-pointer  hover:scale-[1.01] hover:opacity-95">
      <input
        onChange={(e) => {
          setPass(e.target.value);
        }}
        type="text"
        placeholder="password..."
        className="placeholder-color-31 px-3 h-full bg-color-32 tracking-wider placeholder:font-medium font-poppins font-[400] rounded-[16px] text-color-31 text-[16px] w-full focus:outline-none"
      />
    </div>
  );
}

function SetPublic() {
  const userData: any = useContext(chatslistContext);
  const handleSetPublic = async () => {
    try {
      const newSettingResponse = await axios.patch(
        `http://localhost:3000/chat/channel/${userData.channelClicked.id}`,
        {
          type: "PUBLIC",
        },
        {
          withCredentials: true,
        }
      );

      const newChannelList = userData.channelsList.map((channel: any) =>
        channel.id === newSettingResponse.data.id
          ? newSettingResponse.data
          : channel
      );
      userData.setChannelsList(newChannelList);
      userData.setChannelClicked(newSettingResponse.data);
      userData.setShowChannelMenu(false);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };
  return (
    <div
      onClick={handleSetPublic}
      className="w-[178px] h-[45px] bg-color-31 gap-4 rounded-[16px] flex items-center justify-center cursor-pointer  hover:scale-[1.01] hover:opacity-95"
    >
      <div className="relative h-[20px] w-[17px] object-cover cursor-pointer hover:scale-[1.02] ">
        <Image
          sizes="(min-width: 480px) 445px, calc(90.63vw + 28px)"
          src="../../../../assets/setPublicIcon.svg"
          alt="avatar"
          draggable={false}
          fill={true}
          priority={true}
          className="w-full h-full object-cover"
        ></Image>
      </div>
      <div className="">
        <span className="text-[12px] text-color-0">Set Public</span>
      </div>
    </div>
  );
}
function SetPrivate() {
  const userData: any = useContext(chatslistContext);
  const handleSetPrivate = async () => {
    try {
      const newSettingResponse = await axios.patch(
        `http://localhost:3000/chat/channel/${userData.channelClicked.id}`,
        {
          type: "PRIVATE",
        },
        {
          withCredentials: true,
        }
      );

      const newChannelList = userData.channelsList.map((channel: any) =>
        channel.id === newSettingResponse.data.id
          ? newSettingResponse.data
          : channel
      );
      userData.setChannelsList(newChannelList);
      userData.setChannelClicked(newSettingResponse.data);
      userData.setShowChannelMenu(false);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div
      onClick={handleSetPrivate}
      className="w-[178px] h-[45px] bg-color-31 gap-4 rounded-[16px] flex items-center justify-center cursor-pointer hover:scale-[1.01] hover:opacity-95"
    >
      <div className="relative h-[20px] w-[17px] object-cover cursor-pointer hover:scale-[1.02] ">
        <Image
          sizes="(min-width: 480px) 445px, calc(90.63vw + 28px)"
          src="../../../../assets/setPrivateIcon.svg"
          alt="avatar"
          draggable={false}
          fill={true}
          priority={true}
          className="w-full h-full object-cover"
        ></Image>
      </div>
      <div className="">
        <span className="text-[12px] text-color-0">Set private</span>
      </div>
    </div>
  );
}

function SetChannelName(props: any) {
  return (
    !props.changeChannelNameState && (
      <div
        onClick={(e) => {
          props.setChangeChannelNameState(true);
          props.setCancelState("");
        }}
        className="w-[178px] h-[45px] bg-color-31 gap-4 rounded-[16px] flex items-center justify-center cursor-pointer hover:scale-[1.01] hover:opacity-95"
      >
        <div className="relative h-[21px] w-[21px] object-cover cursor-pointer hover:scale-[1.02] ">
          <Image
            sizes="(min-width: 480px) 445px, calc(90.63vw + 28px)"
            src="../../../../assets/ChannelNameIcon.svg"
            alt="avatar"
            draggable={false}
            fill={true}
            priority={true}
            className="w-full h-full object-cover"
          ></Image>
        </div>
        <div className="">
          <span className="text-[12px] text-color-0">change name</span>
        </div>
      </div>
    )
  );
}

function TypeChannelName({ setName }: any) {
  return (
    <div className="w-[178px] h-[45px] bg-color-32 gap-4 rounded-[16px] flex items-center justify-center cursor-pointer  hover:scale-[1.01] hover:opacity-95">
      <input
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Leet Chess"
        className="placeholder-color-31 px-3 h-full bg-color-32 tracking-wider placeholder:font-medium font-poppins font-[400] rounded-[16px] text-color-31 text-[16px] w-full focus:outline-none"
      />
    </div>
  );
}

function UsersSettingsPoint({ userId }:any) {
  const userData: any = useContext(chatslistContext);

  const updateMembers = (updatedMember: any) => {
    const userMembers = userData.channelMembers?.members?.map((member :any) => {
      return member.userId === updatedMember?.userId
        ? { ...member, ...updatedMember }
        : member;
    });
    const newUpdate = { ...userData.channelMembers, members: userMembers };
    userData.setChannelMembers(newUpdate);
  };

  const handelAddAdmin = async () => {
    try {
      const addAdminResponse = await axios.post(
        `http://localhost:3000/chat/channel/${userData.channelClicked.id}/admin`,
        {
          userId: userId,
        },
        {
          withCredentials: true,
        }
      );
      updateMembers(addAdminResponse.data);
      toast.message(addAdminResponse.data.message);
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      }
    }
  };

  const handelMute = async () => {
    try {
      const muteResponse = await axios.post(
        `http://localhost:3000/chat/channel/${userData.channelClicked.id}/mute`,
        {
          userId: userId,
        },
        {
          withCredentials: true,
        }
      );
      userData.setIsMuted("Unmute");
      // toast.message(muteResponse.data);
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      }
    }
  };

  const handelUnMute = async () => {
    try {
      const muteResponse = await axios.post(
        `http://localhost:3000/chat/channel/${userData.channelClicked.id}/unmute`,
        {
          userId: userId,
        },
        {
          withCredentials: true,
        }
      );
      userData.setIsMuted("Mute");

      // toast.message(muteResponse.data);
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      }
    }
  };

  const handelKick = async () => {
    try {
      const kickResponse = await axios.post(
        `http://localhost:3000/chat/channel/${userData.channelClicked.id}/kick`,
        {
          userId: userId,
        },
        {
          withCredentials: true,
        }
      );

      // toast.message(kickResponse.data);
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      }
    }
  };
  /* ban is not working cuzing server to get down   */
  const handelBan = async () => {
    try {
      const bankResponse = await axios.post(
        `http://localhost:3000/chat/channel/${userData.channelClicked.id}/ban`,
        {
          userId: userId,
        },
        {
          withCredentials: true,
        }
      );

      // toast.message(bankResponse.data);
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="h-[160px] w-[160px] bg-color-31 rounded-b-[9px] rounded-tl-[9px] flex flex-col items-center justify-center overflow-hidden gap-[3px] absolute top-5 right-14 z-[1000]">
      <div
        className="h-[27px] w-[135px] bg-color-0 rounded-[6px] flex items-center justify-center hover:scale-[1.01] hover:opacity-95 cursor-pointer"
        onClick={handelAddAdmin}
      >
        <span className="text-color-31 text-[13px]">Make Admin</span>
      </div>
      <div className="h-[27px] w-[135px] bg-color-0 rounded-[6px] flex items-center justify-center hover:scale-[1.01] hover:opacity-95 cursor-pointer">
        <span className="text-color-31 text-[13px]" onClick={undefined}>
          Play With
        </span>
      </div>

      {userData.isMuted === "Mute" ? (
        <div
          className="h-[27px] w-[135px] bg-color-0 rounded-[6px] flex items-center justify-center hover:scale-[1.01] hover:opacity-95 cursor-pointer"
          onClick={handelMute}
        >
          <span className="text-color-31 text-[13px]">
            {" "}
            tz{userData.isMuted}{" "}
          </span>
        </div>
      ) : (
        <div
          className="h-[27px] w-[135px] bg-color-0 rounded-[6px] flex items-center justify-center hover:scale-[1.01] hover:opacity-95 cursor-pointer"
          onClick={handelUnMute}
        >
          <span className="text-color-31 text-[13px]">
            tr {userData.isMuted}{" "}
          </span>
        </div>
      )}

      <div
        className="h-[27px] w-[135px] bg-color-0 rounded-[6px] flex items-center justify-center hover:scale-[1.01] hover:opacity-95 cursor-pointer"
        onClick={handelKick}
      >
        <span className="text-color-31 text-[13px]">Kick</span>
      </div>
      <div
        className="h-[27px] w-[135px] bg-color-0 rounded-[6px] flex items-center justify-center hover:scale-[1.01] hover:opacity-95 cursor-pointer"
        onClick={handelBan}
      >
        <span className="text-color-31 text-[13px]">Ban</span>
      </div>

      {/* to-do request play game */}
    </div>
  );
}

export {
  User,
  SetPassowrd,
  SetPublic,
  SetPrivate,
  TypePassword,
  SetChannelName,
  TypeChannelName,
  UsersSettingsPoint,
};
