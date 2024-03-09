"use client";
import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SocketContext } from "@/app/SocketContext";

axios.defaults.withCredentials = true;

function ProfileCard() {
  const [ids, setIds] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>();
  const [me, setMe] = useState<any>();
  const socketClient = useContext(SocketContext);
  const [sameProfile, setSameProfile] = useState(false);

  const params = useParams<{ id: string; tag: string; item: string }>();
  const router = useRouter();
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user/${params?.id}`
        );

        if (res.data === 1) {;
          setSameProfile(true);
          router.push("/profile");
        }
        setUser(res.data);
        setIds(res.data.providerId);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        toast.error('user not found !!')
        // console.error(error);
      }
    };
    socketClient.on("updateInfo", async (data) => {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/user/${params?.id}`)
        .then((res) => {
          setUser(res.data);
          setIds(res.data.providerId);
        })
        .catch((error) => {
          // console.error(error);
        });
    });

    getData();
  }, [ids, params]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/user/me`)
      .then((res) => {
        setMe(res);
      })
      .catch((error) => {
        // console.error(error);
      });
  }, [me]);

  const handlePlayWith = () => {
    socketClient.emit("playInvite", { sender: me, receiver: user });

    setTimeout(() => {
      router.push(
        `/game/waiting?room=InviteRoom-${me.providerId}-${user.providerId}`
      );
    }, 500);
  };

  return (
    <>
    
      {!sameProfile &&  user  && (
        <div className="  w-full 2xl:w-[557px] xl:w-[1137px] h-[386px] bg-color-0 rounded-[22px] relative overflow-hidden  ">
          <div className="w-full h-[150px] bg-color-6  relative group  overflow-hidden">
            {user && (
              <div className="w-full h-full absolute  overflow-hidden">
                <Image
                  src={user?.cover}
                  alt="profile image"
                  fill={true}
                  sizes="100%"
                  priority={true}
                  className="object-cover w-full h-full "
                  draggable={false}
                />
              </div>
            )}
          </div>
          <div className="w-full flex justify-between items-center px-10 absolute top-[111px] ">
            <div className="flex flex-col sm:flex-row items-center sm:gap-3">
              {isLoading ? (
                <Skeleton className="w-[120px] h-[120px] rounded-full bg-color-25 ml-7" />
              ) : (
                <div className="sm:w-[120px] w-[90px] sm:h-[120px] h-[90px] relative z-50 rounded-full overflow-hidden bg-black border-[2px] border-color-0  hover:scale-[1.01]">
                  <Image
                    src={user?.avatar}
                    alt="profile image"
                    fill={true}
                    sizes="100%"
                    priority={true}
                    className="object-cover w-full h-full "
                    draggable={false}
                  />
                </div>
              )}
              <div className="flex flex-col pt-[15px] ">
                {isLoading ? (
                  <Skeleton className="w-[200px] h-[20px] rounded-full bg-color-25" />
                ) : (
                  <span className="font-nico-moji text-color-6 lg:text-[21px] text-[18px] capitalize">
                    {`${user?.firstName.substring(0, 10)}${
                      user?.firstName.length > 10 ? ".." : ""
                    } ${user?.lastName.substring(0, 10)}${
                      user?.lastName.length > 10 ? ".." : ""
                    }`}
                  </span>
                )}
                {isLoading ? (
                  <Skeleton className="w-[60px] h-[14px] rounded-full mt-1 bg-color-25" />
                ) : (
                  <span className="font-nico-moji -mt-1 lg:text-[16px] text-[12px]  text-color-29 capitalize">
                    @{user.nickName.substring(0, 10)}
                    {user.nickName.length > 10 ? ".." : ""}
                  </span>
                )}
              </div>
            </div>
            {isLoading ? (
              <Skeleton className="h-[28px] w-[70px] rounded-[10px] bg-color-25 mt-5 mr-5" />
            ) : user.isFriend ? (
              <div className=" gap-1 flex flex-col items-center justify-center mt-10 ">
                <RemoveFriend
                  onSuccess={() => setUser({ ...user, isFriend: false })}
                />
              </div>
            ) : (
              <div className=" mt-[10px]">
                <AddFriend
                  onSuccess={() => setUser({ ...user, isFriend: true })}
                />
              </div>
            )}
          </div>
          <div className="w-full flex items-center justify-center absolute bottom-[40px] px-[25px]">
            <div className="h-[82px] w-[867px] bg-color-0 border-[1px] border-[#DDD] rounded-[22px] flex flex-col gap-[4px]">
              <div className="flex justify-between  px-[28px] pt-[14px]">
                <div className="flex ">
                  <span className="font-nico-moji text-[20px] text-color-6 capitalize">
                    {user ? `LEVEL ${user?.level}` : "Loading..."}
                  </span>
                </div>
                <div className="">
                  <span className="font-nico-moji text-[16px] text-color-6 capitalize">
                    {user ? `${user?.level} / 100` : "Loading..."}
                  </span>
                </div>
              </div>
              <div className="px-[28px] ">
                {user ? (
                  <Progress value={user?.level} />
                ) : (
                  <Skeleton className="w-full h-4 rounded-[22px]  bg-color-25" />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileCard;

interface AddFriendProps {
  onSuccess: () => void;
}

function AddFriend(props: AddFriendProps) {
  const params = useParams<{ id: string; tag: string; item: string }>();
  const socketClient = useContext(SocketContext);

  function handleAddFriend() {
    axios
      .patch("http://localhost:3000/user/addFriend", { id: params.id })
      .then((response) => {
        props.onSuccess();
        socketClient.emit("updateInfo", { providerId: params.id });
        toast.success("user added successfully");
      })
      .catch((error) => {
        if (error.response && error.response.status === 422)
          toast.error("error adding user");
      });
  }

  return (
    <div
      onClick={handleAddFriend}
      className=" h-[28px] lg:w-[90px] w-[40px] bg-color-6 rounded-[10px] flex items-center justify-around px-3 hover:scale-[1.01] hover:opacity-90 cursor-pointer"
    >
      <div className="w-[12px] h-[13px] relative z-50 overflow-hidden ">
        <Image
          src="/../../assets/addFriendIconUsers.svg"
          alt="profile image"
          fill={true}
          sizes="100%"
          priority={true}
          className="object-cover w-full h-full "
          draggable={false}
        />
      </div>
      <span className="font-nico-moji text-[8px] text-color-0 hidden lg:block ">
        ADD
      </span>
    </div>
  );
}

export { AddFriend };
