import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import { chatslistContext } from "../../app/(home)/chat/page";
import { toast } from "sonner";
import CreatProtected from "./creatProtected";
import Image from "next/image";

function CreatChannel() {
  const [photoPath, setPhotoPath] = useState<any>();
  const [avatar, setAvatar] = useState<File | null>(null);
  const [changeAvatar, setChangeAvatar] = useState(false);
  const UserData: any = useContext(chatslistContext);
  const [avatarLink, setAvatarLink] = useState<any>(
    "http://localhost:8000/assets/DefaultChannelImage.svg"
  );
  const inputMessageRef = useRef(null);
  const backendUrl = process.env.BACKEND_URL || "http://localhost:3000";
  const handelSubmitrefrech = (e: any) => {
    e.preventDefault();
  };

  const addChannelToLits = (channel: any) => {
    const newChannelList = [...UserData.channelsList, channel];
    UserData.setChannelsList(newChannelList);
  };

  const handelCreatChannel = async () => {
    if (!inputMessageRef?.current?.value || !UserData.channelType)
      return toast("choose the type of your channel");
    if (
      UserData.channelType == "PROTECTED" &&
      !UserData.inputPassRef?.current.value
    )
      return toast("Please enter a pasword");
    try {
      const creatChannelResponse = await axios.post(
        `${backendUrl}/chat/channel/create`,
        {
          avatar: avatarLink.avatar,
          name: inputMessageRef?.current.value,
          type: UserData.channelType,
          password: UserData.inputPassRef?.current?.value,
        },
        {
          withCredentials: true,
        }
      );

      UserData.setPopUpOn(false);
      UserData.setChannelClicked(creatChannelResponse.data);
      UserData.setchannelType("");
      UserData.inputPassRef = "";
      addChannelToLits(creatChannelResponse.data);
      UserData.setShowInvite(true);
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      }
    }
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
      console.log("file before the send of the data", file);

      await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/chat/upload`, formData)
        .then((res) => {
          console.log("the data came in the upload ::: ", res.data);
          setAvatarLink(res.data);
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="relative flex flex-col ">
          <div
            onClick={() => {
              UserData.setchannelType("");
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

          <form onSubmit={handelSubmitrefrech}>
            <div className="flex flex-col  items-center w-[571px] h-[897px] bg-[#F3FAFF] rounded-[29px] border border-black">
              <div className=" flex mb-[36px] items-center justify-center text-[20px] h-[120px] w-full bg-[#FFFFFF] rounded-[29px_29px_0px_0px]">
                Creat your channel
              </div>
              <div className="flex flex-col  gap-9 items-center">
                <div className="w-[134px] h-[134px] bg-color-6 rounded-full relative border border-color-0 group cursor-pointer">
                  <div className="w-full h-full absolute rounded-full overflow-hidden">
                    <div className="w-full h-full relative">
                      <Image
                        src={photoPath || "/assets/DefaultChannelImage.svg"}
                        alt="Add image icon"
                        fill={true}
                        className="object-cover w-full h-full"
                        priority={true}
                        sizes="(min-width: 480px) 445px, calc(90.63vw + 28px)"
                      />
                    </div>
                  </div>

                  <div className="h-[23px] w-[23px]  absolute bottom-2 right-2 bg-color-24 flex items-center justify-center rounded-full ">
                    <Image
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

                {/* chose name for channel */}
                <div className="flex w-full flex-row gap-7 justify-center items-center">
                  <div className="flex justify-start items-center ">
                    chose name:
                  </div>
                  <input
                    type="text"
                    className="flex bg-[#ffff] rounded-lg outline-none text-sm text-[#454135]  h-[40px] m-3 p-3 placeholder:text-sm placeholder:text-[#8194a3] "
                    placeholder="type a message"
                    ref={inputMessageRef}
                  />
                </div>

                {/* choose type of channel */}
                <div className="">Choose type of your channel</div>
                <ul className="flex items-center justify-center  w-full gap-6 md:grid-cols-2">
                  <li>
                    <input
                      type="radio"
                      id="private"
                      name="typeOfChannel"
                      value="PRIVATE"
                      className="hidden peer"
                      onClick={(e) => {
                        UserData.setchannelType(e.target.value);
                      }}
                    />
                    <label
                      htmlFor="private"
                      className="flex items-center justify-center w-[150px] p-5 text-[#8194a3] bg-[#FFFFFF] border rounded-lg cursor-pointer  peer-checked:border-[#6f87de] peer-checked:text-[#6f87de] hover:text-gray-600 hover:bg-gray-100"
                    >
                      <div>private</div>
                    </label>
                  </li>

                  <li>
                    <input
                      type="radio"
                      id="public"
                      name="typeOfChannel"
                      value="PUBLIC"
                      className="hidden peer"
                      onClick={(e) => {
                        UserData.setchannelType(e.target.value);
                      }}
                    />
                    <label
                      htmlFor="public"
                      className="flex items-center justify-center w-[150px] p-5 text-[#8194a3] bg-[#FFFFFF] border rounded-lg cursor-pointer  peer-checked:border-[#6f87de] peer-checked:text-[#6f87de] hover:text-gray-600 hover:bg-gray-100"
                    >
                      <div>public</div>
                    </label>
                  </li>

                  <li>
                    <input
                      type="radio"
                      id="protected"
                      name="typeOfChannel"
                      value="PROTECTED"
                      className="hidden peer"
                      onClick={(e) => {
                        UserData.setchannelType(e.target.value);
                      }}
                    />
                    <label
                      htmlFor="protected"
                      className="flex items-center justify-center w-[150px] p-5 text-[#8194a3] bg-[#FFFFFF] border rounded-lg cursor-pointer  peer-checked:border-[#6f87de] peer-checked:text-[#6f87de] hover:text-gray-600 hover:bg-gray-100"
                    >
                      <div>protected</div>
                    </label>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col justify-center items-center py-[30px]">
                <CreatProtected />
              </div>

              <button
                className="flex absolute bottom-0 right-0 m-[30px] p-[15px] w-fit justify-end items-end rounded-lg
                                            text-[#8194a3] bg-[#FFFFFF] border cursor-pointer hover:border-[#adf39d]  hover:text-gray-600
                                            hover:bg-[#e5f6e1]"
                onClick={handelCreatChannel}
              >
                {" "}
                submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreatChannel;
