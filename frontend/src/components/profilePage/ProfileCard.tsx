"use client";
import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SocketContext } from "@/app/SocketContext";

axios.defaults.withCredentials = true;

function ProfileCard() {
  const socketClient = useContext(SocketContext);
  const [id, setId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>();
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [changeAvatar, setChangeAvatar] = useState(false);
  const [photoPath, setPhotoPath] = useState<any>(null);
  const [avatar, setAvatar] = useState<File | null>(null);
  const backendUrl = process.env.BACKEND_API || "http://localhost:3000";
  const handleSettingsClick = () => {
    setIsSettingsVisible(!isSettingsVisible);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user/me`
        );
        setUser(res.data);
        setId(res.data.providerId);
        setAvatar(res.data.avatar);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };

    getData();
  }, [id]);

  useEffect(() => {
    socketClient.on("updateInfo", async (data) => {
      if (user && data.providerId === user.providerId) {
        try {
          setIsLoading(true);
          const res = await axios.get(`${backendUrl}/user/me`);

          setUser(res.data);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          // eslint-disable-next-line no-console
          console.error(error);
        }
      }
    });
  });

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChangeAvatar(true);
    const file = event.target.files?.[0];
    if (file) {
      setPhotoPath(URL.createObjectURL(file));
      setAvatar(file);
    }
  };
  async function handleSaveClick() {
    if (avatar && changeAvatar === true) {
      const formData = new FormData();
      formData.append("cover", avatar);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/updateCover`,
        formData
      );
      socketClient.emit("updateInfo", { providerId: user.providerId });
      toast.success("cover updated successfully");
      setUser({ ...user, cover: res.data.url });
    }
    setChangeAvatar(false);
  }

  return (
    <div className=" w-full xl:w-[1139px] h-[386px] bg-color-0 rounded-[22px] relative overflow-hidden  ">
      <div className="w-full h-[150px] bg-color-6  relative group cursor-pointer  overflow-hidden">
        {user && (
          <div className="w-full h-full absolute  overflow-hidden">
            <Image
              src={photoPath || user.cover}
              alt="profile image"
              fill={true}
              sizes="100%"
              priority={true}
              className="object-cover w-full h-full "
              draggable={false}
            />
          </div>
        )}
        <div className="h-full w-full  absolute hidden group-hover:flex  bg-black items-center justify-center text-center bg-slate-600/50 text-white tracking-wider font-nico-moji">
          Change Cover Image
        </div>
        <input
          className="h-full w-full  absolute opacity-0 z-10 cursor-pointer"
          onChange={handleFileChange}
          type="file"
          accept=".png, .jpg, .jpeg"
        />
        {changeAvatar && (
          <div
            onClick={handleSaveClick}
            className="w-[50px] z-[1000] cursor-pointer h-[16px] flex items-center justify-center rounded-[5px] bg-color-0 absolute bottom-1 right-1"
          >
            <span className="text-center font-nico-moji text-[10px] text-color-6 capitalize">
              Save
            </span>
          </div>
        )}
      </div>
      <div className="w-full flex justify-between items-center px-[85px] absolute top-[111px]">
        <div className="flex items-center gap-3">
          {isLoading ? (
            <Skeleton className="w-[120px] h-[120px] rounded-full bg-color-25" />
          ) : (
            <div className="w-[120px] h-[120px]   relative z-50 rounded-full overflow-hidden bg-black border-[2px] border-color-0  hover:scale-[1.01]">
              <Image
                src={user.avatar}
                alt="profile image"
                fill={true}
                sizes="100%"
                priority={true}
                className="object-cover w-full h-full "
                draggable={false}
              />
            </div>
          )}
          <div className="flex flex-col  pt-[15px] ">
            {isLoading ? (
              <Skeleton className="w-[264px] h-[24px] rounded-full bg-color-25" />
            ) : (
              <span className="font-nico-moji text-color-6 sm:text-[24px] text-[18px] capitalize">
                {`${user.firstName.substring(0, 10)}${
                  user.firstName.length > 10 ? ".." : ""
                } ${user.lastName.substring(0, 10)}${
                  user.lastName.length > 10 ? ".." : ""
                }`}
              </span>
            )}
            {isLoading ? (
              <Skeleton className="w-[86px] h-[16px] rounded-full mt-1 bg-color-25" />
            ) : (
              <span className="font-nico-moji -mt-1 sm:text-[16px] text-[12px]  text-color-29 capitalize">
                @{user.nickName.substring(0, 10)}
                {user.nickName.length > 10 ? ".." : ""}
              </span>
            )}
          </div>
        </div>
        <div onClick={handleSettingsClick} className="p-2 cursor-pointer">
          <div className="h-[21px] w-[6px] relative flex items-center justify-center  pt-[15px] cursor-pointer">
            <Image
              src="/../../assets/SettingsPoints.svg"
              alt="profile image"
              fill={true}
              draggable={false}
            />
          </div>
        </div>
        {isSettingsVisible && <SettingsPoint />}
      </div>
      <div className="w-full flex items-center justify-center absolute bottom-[40px] px-[25px]">
        <div className="h-[82px] w-[867px] bg-color-0 border-[1px] border-[#DDD] rounded-[22px] flex flex-col gap-[4px]">
          <div className="flex justify-between  px-[28px] pt-[14px]">
            <div className="flex ">
              <span className="font-nico-moji text-[20px] text-color-6 capitalize">
                {user ? `LEVEL ${user.level}` : "Loading..."}
              </span>
            </div>

            <div className="">
              <span className="font-nico-moji text-[16px] text-color-6 capitalize">
                {user ? `${user.level} / 100` : "Loading..."}
              </span>
            </div>
          </div>
          <div className="px-[28px] ">
            {user ? (
              <Progress value={user.level} />
            ) : (
              <Skeleton className="w-full h-4 rounded-[22px]  bg-color-25" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;

const SettingsPoint = () => {
  const router = useRouter();
  async function handleLogoutClick() {
    try {
      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        withCredentials: true,
      });
      router.push("/");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  return (
    <div className="w-[157px] h-[71px] bg-color-0 border border-[#DDD] rounded-[10px] flex flex-col items-center justify-center absolute top-12 right-[100px] z-[3000]">
      <div className="w-full px-[21px] ">
        <Link href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/setting`}>
          <div className="w-full flex items-center justify-between border-b border-[#DDD]  hover:scale-105">
            <span className="font-nico-moji text-[12px] text-color-6 pb-[5px] cursor-pointer capitalize">
              Settings
            </span>
            <div className="w-[13px] h-[14px] mb-[5px] flex items-center justify-center relative object-cover">
              <Image
                src="/../../assets/SettingIconProfile.svg"
                alt="profile image"
                fill={true}
                draggable={false}
              />
            </div>
          </div>
        </Link>
      </div>
      <div className="w-full px-[21px] ">
        <div
          onClick={handleLogoutClick}
          className=" w-full flex items-center justify-between  hover:scale-105 cursor-pointer"
        >
          <span className=" font-nico-moji text-[12px] text-color-6 pt-[4px] capitalize">
            Logout
          </span>
          <div className="w-[13px] h-[14px] mt-1 flex items-center justify-center relative object-cover">
            <Image
              src="/../../assets/LogoutIconProfile.svg"
              alt="profile image"
              fill={true}
              draggable={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export { SettingsPoint };

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-color-28/30 border-[0.5px] border-[#DDD]",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1  transition-all rounded-[22px] bg-[#52768F]"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
