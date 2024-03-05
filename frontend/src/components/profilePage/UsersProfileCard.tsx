"use client";
import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

axios.defaults.withCredentials = true;

function ProfileCard() {
  const [ids, setIds] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>();

  const params = useParams<{ id: string; tag: string; item: string }>();
  const router = useRouter();
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user/${params?.id}`
        );
        if (res.data === 1) {
          router.push("/profile");
        }
        setUser(res.data);
        setIds(res.data.providerId);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    };

    getData();
  }, [ids, params]);

  return (
    <div className="  w-full 2xl:w-[557px] xl:w-[1137px] h-[386px] bg-color-0 rounded-[22px] relative overflow-hidden  ">
      <div className="w-full h-[150px] bg-color-6  relative group  overflow-hidden">
        {user && (
          <div className="w-full h-full absolute  overflow-hidden">
            <Image
              src={user.cover}
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
      <div className="w-full flex justify-center items-center gap-[100px] absolute top-[111px] ">
        <div className="flex items-center gap-3">
          {isLoading ? (
            <Skeleton className="w-[120px] h-[120px] rounded-full bg-color-25 ml-7" />
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
          <div className="flex flex-col pt-[15px] ">
            {isLoading ? (
              <Skeleton className="w-[200px] h-[20px] rounded-full bg-color-25" />
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
              <Skeleton className="w-[60px] h-[14px] rounded-full mt-1 bg-color-25" />
            ) : (
              <span className="font-nico-moji -mt-1 sm:text-[16px] text-[12px]  text-color-29 capitalize">
                @{user.nickName.substring(0, 10)}
                {user.nickName.length > 10 ? ".." : ""}
              </span>
            )}
          </div>
        </div>
        {isLoading ? (
          <Skeleton className="h-[28px] w-[70px] rounded-[10px] bg-color-25 mt-5 mr-5" />
        ) : user.isFriend ? (
          <RemoveFriend
            onSuccess={() => setUser({ ...user, isFriend: false })}
          />
        ) : (
          <AddFriend onSuccess={() => setUser({ ...user, isFriend: true })} />
        )}
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

interface AddFriendProps {
  onSuccess: () => void;
}

const backendUrl = process.env.BACKEND_URL || "http://localhost:3000";
function AddFriend(props: AddFriendProps) {
  const params = useParams<{ id: string; tag: string; item: string }>();
  function handleAddFriend() {
    axios
      .patch(`${backendUrl}/user/addFriend`, { id: params.id })
      .then((response) => {
        props.onSuccess();
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
      className="h-[28px] w-[70px] bg-color-6 mt-5 rounded-[10px] gap-[5px] flex items-center justify-center  cursor-pointer hover:scale-[1.01] hover:opacity-95"
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
      <span className="font-nico-moji text-[8px] text-color-0 ">ADD</span>
    </div>
  );
}

export { AddFriend };

interface RemoveFriendProps {
  onSuccess: () => void;
}

function RemoveFriend(props: RemoveFriendProps) {
  const params = useParams<{ id: string; tag: string; item: string }>();
  function handleRemoveFriend() {
    axios
      .patch(`${backendUrl}/user/removeFriend`, { id: params.id })
      .then((response) => {
        props.onSuccess();
        toast.success("user removed successfully");
      })
      .catch((error) => {
        if (error.response && error.response.status === 422)
          toast.error("error removing user");
      });
  }

  return (
    <div
      onClick={handleRemoveFriend}
      className="h-[28px] w-[70px] bg-color-30 mt-5 rounded-[10px] gap-[5px] flex items-center justify-center  cursor-pointer"
    >
      <div className="w-[12px] h-[13px] relative z-50 overflow-hidden ">
        <Image
          src="/../../assets/removeFriendIconUsers.svg"
          alt="profile image"
          fill={true}
          sizes="100%"
          priority={true}
          className="object-cover w-full h-full "
          draggable={false}
        />
      </div>
      <span className="font-nico-moji text-[8px] text-color-6 ">REMOVE</span>
    </div>
  );
}

export { RemoveFriend };

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
