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

        if (res.data === 1) {
          console.log("the res of the profile page", res.data);
          setSameProfile(true);
          router.push("/profile");
        }
        setUser(res.data);
        setIds(res.data.providerId);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        toast.error("user not found !!");
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
    console.log("the user is : ", user);
    console.log("me in the invite ", me);

    setTimeout(() => {
      router.push(
        `/game/waiting?room=InviteRoom-${me.providerId}-${user.providerId}`
      );
    }, 500);
  };

  return (
    <>
      {!sameProfile && user && (
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
                {/* <div className="">
                  <button
                    className=" h-[28px] lg:w-[90px] w-[40px] bg-color-6 rounded-[10px] flex items-center justify-around px-3 hover:scale-[1.01] hover:opacity-90 cursor-pointer"
                    onClick={handlePlayWith}
                  >
                    <div className="w-[12px] h-[12px] relative overflow-hidden">
                      <Image
                        src="/../../assets/playWithIcon.svg"
                        alt="Leader Board Icon"
                        fill={true}
                        priority={true}
                        className="object-cover w-full h-full"
                        draggable={false}
                      />
                    </div>
                    <span className="font-nico-moji text-[8px] text-color-0 hidden lg:block ">
                      Play With
                    </span>
                  </button>
                </div> */}
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
  const backendUrl = process.env.BACKEND_URL || "http://localhost:3000";

  function handleAddFriend() {
    axios
      .patch(`${backendUrl}/user/addFriend`, { id: params.id })
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

// function InviteGame(user: any, me: any) {
//     const socketClient = useContext(SocketContext);
//     const router = useRouter();
//     console.log('User in the function :', { user });
//     console.log('Me  in the function :', { me });

//     const handlePlayWith = () => {
//         socketClient.emit("playInvite", { sender: me, receiver: user });

//         setTimeout(() => {
//             router.push(
//                 `/game/waiting?room=InviteRoom-${me.providerId}-${user.providerId}`
//             );
//         }, 500);
//     }

//     return (
//         <div className="">
//             <button
//                 className="h-[28px] w-[90px] bg-color-6 rounded-[10px] cursor-pointer flex items-center justify-around px-3 hover:scale-[1.01] hover:opacity-90"
//                 onClick={handlePlayWith}
//             >
//                 <div className="w-[12px] h-[12px] relative overflow-hidden">
//                     <Image
//                         src="/../../assets/playWithIcon.svg"
//                         alt="Leader Board Icon"
//                         fill={true}
//                         priority={true}
//                         className="object-cover w-full h-full"
//                         draggable={false}
//                     />
//                 </div>
//                 <span className="font-nico-moji text-[8px] text-color-0">
//                     Play With
//                 </span>
//             </button>
//         </div>
//     )
// }
// export { InviteGame }

interface RemoveFriendProps {
  onSuccess: () => void;
}

function RemoveFriend(props: RemoveFriendProps) {
  const params = useParams<{ id: string; tag: string; item: string }>();
  const socketClient = useContext(SocketContext);
  const backendUrl = process.env.BACKEND_URL || "http://localhost:3000";

  function handleRemoveFriend() {
    axios
      .patch(`${backendUrl}/user/removeFriend`, { id: params.id })
      .then((response) => {
        props.onSuccess();
        socketClient.emit("updateInfo", { providerId: params.id });
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
      className=" h-[28px] lg:w-[90px] w-[40px] bg-color-30 rounded-[10px] flex items-center justify-around px-3 hover:scale-[1.01] hover:opacity-90 cursor-pointe"
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
      <span className="font-nico-moji text-[8px] text-color-6 hidden lg:block ">
        REMOVE
      </span>
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

// "use client";
// import * as React from "react";
// import * as ProgressPrimitive from "@radix-ui/react-progress";
// import { cn } from "@/lib/utils";
// import Image from "next/image";
// import { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { Skeleton } from "@nextui-org/react";
// import { notFound, useParams } from "next/navigation";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import { SocketContext } from "@/app/SocketContext";

// axios.defaults.withCredentials = true;

// function ProfileCard() {
//   const [ids, setIds] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [user, setUser] = useState<any>();
//   const [me, setMe] = useState<any>();
//   const socketClient = useContext(SocketContext);
//   const [sameProfile, setSameProfile] = useState(false);

//   const params = useParams<{ id: string; tag: string; item: string }>();
//   const router = useRouter();

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         setIsLoading(true);
//         const res = await axios.get(
//           `${process.env.NEXT_PUBLIC_API_URL}/user/${params?.id}`
//         );

//         if (res.data === 1) {
//           setSameProfile(true);
//           router.push("/profile");
//         }
//         setUser(res.data);
//         setIds(res.data.providerId);
//         setIsLoading(false);
//       } catch (error) {
//         setIsLoading(false);
//         toast.error('user not found')
//         router.push('/profile')
//       }
//     };

//     socketClient.on("updateInfo", async (data) => {
//       await axios
//         .get(`${process.env.NEXT_PUBLIC_API_URL}/user/${params?.id}`)
//         .then((res) => {
//           setUser(res.data);
//           setIds(res.data.providerId);
//         })
//         .catch((error) => {

//         });
//     });

//     getData();
//   }, [ids, params, socketClient, router]);

//   useEffect(() => {
//     axios
//       .get(`${process.env.NEXT_PUBLIC_API_URL}/user/me`)
//       .then((res) => {
//         setMe(res);
//       })
//       .catch((error) => {
//         // eslint-disable-next-line no-console
//         console.error(error);
//       });
//   }, []);

//   const handlePlayWith = () => {

//     socketClient.emit("playInvite", { sender: me.data, receiver: user });
//     router.push(`/game/waiting/${me.data.providerId}${user.providerId}`);
//   };

//   return (
//     <>
//       {user && <div>

//         {!sameProfile && (
//           <div className="  w-full 2xl:w-[557px] xl:w-[1137px] h-[386px] bg-color-0 rounded-[22px] relative overflow-hidden  ">
//             <div className="w-full h-[150px] bg-color-6  relative group  overflow-hidden">
//               {user && (
//                 <div className="w-full h-full absolute  overflow-hidden">
//                   <Image
//                     src={user?.cover}
//                     alt="profile image"
//                     fill={true}
//                     sizes="100%"
//                     priority={true}
//                     className="object-cover w-full h-full "
//                     draggable={false}
//                   />
//                 </div>
//               )}
//             </div>
//             <div className="w-full flex justify-between items-center px-10 absolute top-[111px] ">
//               <div className="flex flex-col sm:flex-row items-center sm:gap-3">
//                 {isLoading ? (
//                   <Skeleton className="w-[120px] h-[120px] rounded-full bg-color-25 ml-7" />
//                 ) : (
//                   <div className="sm:w-[120px] w-[90px] sm:h-[120px] h-[90px] relative z-50 rounded-full overflow-hidden bg-black border-[2px] border-color-0  hover:scale-[1.01]">
//                     <Image
//                       src={user?.avatar}
//                       alt="profile image"
//                       fill={true}
//                       sizes="100%"
//                       priority={true}
//                       className="object-cover w-full h-full "
//                       draggable={false}
//                     />
//                   </div>
//                 )}
//                 <div className="flex flex-col pt-[15px] ">
//                   {isLoading ? (
//                     <Skeleton className="w-[200px] h-[20px] rounded-full bg-color-25" />
//                   ) : (
//                     <span className="font-nico-moji text-color-6 lg:text-[21px] text-[18px] capitalize">
//                       {`${user?.firstName.substring(0, 10)}${user?.firstName.length > 10 ? ".." : ""
//                         } ${user?.lastName.substring(0, 10)}${user?.lastName.length > 10 ? ".." : ""
//                         }`}
//                     </span>
//                   )}
//                   {isLoading ? (
//                     <Skeleton className="w-[60px] h-[14px] rounded-full mt-1 bg-color-25" />
//                   ) : (
//                     <span className="font-nico-moji -mt-1 lg:text-[16px] text-[12px]  text-color-29 capitalize">
//                       @{user?.nickName.substring(0, 10)}
//                       {user?.nickName.length > 10 ? ".." : ""}
//                     </span>
//                   )}
//                 </div>
//               </div>
//               {isLoading ? (
//                 <Skeleton className="h-[28px] w-[70px] rounded-[10px] bg-color-25 mt-5 mr-5" />
//               ) : user?.isFriend ? (
//                 <div className=" gap-1 flex flex-col items-center justify-center mt-10 ">
//                   <div className="">
//                     <button
//                       className=" h-[28px] lg:w-[90px] w-[40px] bg-color-6 rounded-[10px] flex items-center justify-around px-3 hover:scale-[1.01] hover:opacity-90 cursor-pointer"
//                       onClick={handlePlayWith}
//                     >
//                       <div className="w-[12px] h-[12px] relative overflow-hidden">
//                         <Image
//                           src="/../../assets/playWithIcon.svg"
//                           alt="Leader Board Icon"
//                           fill={true}
//                           priority={true}
//                           className="object-cover w-full h-full"
//                           draggable={false}
//                         />
//                       </div>
//                       <span className="font-nico-moji text-[8px] text-color-0 hidden lg:block ">
//                         Play With
//                       </span>
//                     </button>
//                   </div>
//                   <RemoveFriend
//                     onSuccess={() => setUser({ ...user, isFriend: false })}
//                   />
//                 </div>
//               ) : (
//                 <div className=" mt-[10px]">
//                   <AddFriend
//                     onSuccess={() => setUser({ ...user, isFriend: true })}
//                   />
//                 </div>
//               )}
//             </div>
//             <div className="w-full flex items-center justify-center absolute bottom-[40px] px-[25px]">
//               <div className="h-[82px] w-[867px] bg-color-0 border-[1px] border-[#DDD] rounded-[22px] flex flex-col gap-[4px]">
//                 <div className="flex justify-between  px-[28px] pt-[14px]">
//                   <div className="flex ">
//                     <span className="font-nico-moji text-[20px] text-color-6 capitalize">
//                       {user ? `LEVEL ${user?.level}` : "Loading..."}
//                     </span>
//                   </div>
//                   <div className="">
//                     <span className="font-nico-moji text-[16px] text-color-6 capitalize">
//                       {user ? `${user?.level} / 100` : "Loading..."}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="px-[28px] ">
//                   {user ? (
//                     <Progress value={user?.level} />
//                   ) : (
//                     <Skeleton className="w-full h-4 rounded-[22px]  bg-color-25" />
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//       }
//     </>
//   );
// }

// export default ProfileCard;

// interface AddFriendProps {
//   onSuccess: () => void;
// }

// function AddFriend(props: AddFriendProps) {
//   const params = useParams<{ id: string; tag: string; item: string }>();
//   const socketClient = useContext(SocketContext);

//   function handleAddFriend() {
//     axios
//       .patch("http://localhost:3000/user/addFriend", { id: params.id })
//       .then((response) => {
//         props.onSuccess();
//         socketClient.emit("updateInfo", { providerId: params.id });
//         toast.success("user added successfully");
//       })
//       .catch((error) => {
//         if (error.response && error.response.status === 422)
//           toast.error("error adding user");
//       });
//   }

//   return (
//     <div
//       onClick={handleAddFriend}
//       className=" h-[28px] lg:w-[90px] w-[40px] bg-color-6 rounded-[10px] flex items-center justify-around px-3 hover:scale-[1.01] hover:opacity-90 cursor-pointer"
//     >
//       <div className="w-[12px] h-[13px] relative z-50 overflow-hidden ">
//         <Image
//           src="/../../assets/addFriendIconUsers.svg"
//           alt="profile image"
//           fill={true}
//           sizes="100%"
//           priority={true}
//           className="object-cover w-full h-full "
//           draggable={false}
//         />
//       </div>
//       <span className="font-nico-moji text-[8px] text-color-0 hidden lg:block ">
//         ADD
//       </span>
//     </div>
//   );
// }

// export { AddFriend };

// // function InviteGame(user: any, me: any) {
// //     const socketClient = useContext(SocketContext);
// //     const router = useRouter();
// //     console.log('User in the function :', { user });
// //     console.log('Me  in the function :', { me });

// //     const handlePlayWith = () => {
// //         socketClient.emit("playInvite", { sender: me, receiver: user });

// //         setTimeout(() => {
// //             router.push(
// //                 `/game/waiting?room=InviteRoom-${me.providerId}-${user.providerId}`
// //             );
// //         }, 500);
// //     }

// //     return (
// //         <div className="">
// //             <button
// //                 className="h-[28px] w-[90px] bg-color-6 rounded-[10px] cursor-pointer flex items-center justify-around px-3 hover:scale-[1.01] hover:opacity-90"
// //                 onClick={handlePlayWith}
// //             >
// //                 <div className="w-[12px] h-[12px] relative overflow-hidden">
// //                     <Image
// //                         src="/../../assets/playWithIcon.svg"
// //                         alt="Leader Board Icon"
// //                         fill={true}
// //                         priority={true}
// //                         className="object-cover w-full h-full"
// //                         draggable={false}
// //                     />
// //                 </div>
// //                 <span className="font-nico-moji text-[8px] text-color-0">
// //                     Play With
// //                 </span>
// //             </button>
// //         </div>
// //     )
// // }
// // export { InviteGame }

// interface RemoveFriendProps {
//   onSuccess: () => void;
// }

// function RemoveFriend(props: RemoveFriendProps) {
//   const params = useParams<{ id: string; tag: string; item: string }>();
//   const socketClient = useContext(SocketContext);

//   function handleRemoveFriend() {
//     axios
//       .patch("http://localhost:3000/user/removeFriend", { id: params.id })
//       .then((response) => {
//         props.onSuccess();
//         socketClient.emit("updateInfo", { providerId: params.id });
//         toast.success("user removed successfully");
//       })
//       .catch((error) => {
//         if (error.response && error.response.status === 422)
//           toast.error("error removing user");
//       });
//   }

//   return (
//     <div
//       onClick={handleRemoveFriend}
//       className=" h-[28px] lg:w-[90px] w-[40px] bg-color-30 rounded-[10px] flex items-center justify-around px-3 hover:scale-[1.01] hover:opacity-90 cursor-pointe"
//     >
//       <div className="w-[12px] h-[13px] relative z-50 overflow-hidden ">
//         <Image
//           src="/../../assets/removeFriendIconUsers.svg"
//           alt="profile image"
//           fill={true}
//           sizes="100%"
//           priority={true}
//           className="object-cover w-full h-full "
//           draggable={false}
//         />
//       </div>
//       <span className="font-nico-moji text-[8px] text-color-6 hidden lg:block ">
//         REMOVE
//       </span>
//     </div>
//   );
// }

// export { RemoveFriend };

// const Progress = React.forwardRef<
//   React.ElementRef<typeof ProgressPrimitive.Root>,
//   React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
// >(({ className, value, ...props }, ref) => (
//   <ProgressPrimitive.Root
//     ref={ref}
//     className={cn(
//       "relative h-4 w-full overflow-hidden rounded-full bg-color-28/30 border-[0.5px] border-[#DDD]",
//       className
//     )}
//     {...props}
//   >
//     <ProgressPrimitive.Indicator
//       className="h-full w-full flex-1  transition-all rounded-[22px] bg-[#52768F]"
//       style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
//     />
//   </ProgressPrimitive.Root>
// ));
// Progress.displayName = ProgressPrimitive.Root.displayName;

// export { Progress };
