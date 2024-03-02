// import Image from "next/image"

// export function MatchesHistory () {
//     return (
//         <div className="h-[619px] 2xl:w-[596px] xl:w-[1137px] w-full bg-color-0 rounded-[22px] flex flex-col gap-[34px]">
//             <div className="w-full flex items-center justify-center gap-[15px] pt-[18px]">
//                 <div className=' w-[37px] h-[28px] relative sm:flex hidden items-center justify-center pt-3 '>
//                     <Image
//                         src="/../../assets/MatchHistoryIcon.svg"
//                         alt='Leader Board Icon'
//                         fill={true}
//                         priority={true}
//                         className='object-cover w-full h-full'
//                     />
//                 </div>
//                 <div className='flex gap-[10px] '>
//                     <span className='font-nico-moji text-color-6 sm:text-[32px]  text-[28px]'>Matches</span>
//                     <span className='font-nico-moji text-color-29 sm:text-[32px] text-[28px]'>History</span>
//                 </div>
//             </div>
//             <div className="w-full flex flex-col gap-[25px]  px-10">
//                 <div className="w-full h-[58px] flex gap-[8px] cursor-pointer items-center justify-center ">
//                     <div className="flex h-full sm:w-[224px] w-[58px]  rounded-[209px]  gap-[10px] items-center justify-start bg-color-30">
//                         <div className='w-[48px] h-[48px] rounded-full bg-color-28 ml-[5px] relative overflow-hidden'>
//                             <Image
//                                 src="/../../assets/ProfileHeaderImage.svg"
//                                 alt='First Place Icon'
//                                 fill={true}
//                                 priority={true}
//                                 className='object-cover w-full h-full ' />
//                         </div>
//                         <div className="sm:flex hidden flex-col ">
//                             <span className='font-nico-moji text-[14px] text-color-6'>Abdelabri</span>
//                             <span className="-mt-1 font-nico-moji text-[13px] text-color-29">Messah</span>
//                         </div>
//                     </div>
//                     <div className="w-[102px] h-[38px] bg-color-30 rounded-[209px] flex items-center justify-center gap-3">
//                         <span className="font-nico-moji text-[20px] text-color-6">2</span>
//                         <span className="font-nico-moji text-[20px] text-color-6">/</span>
//                         <span className="font-nico-moji text-[20px] text-color-6">5</span>
//                     </div>
//                     <div className="flex h-full sm:w-[224px] w-[58px] rounded-[209px]  gap-[10px] items-center justify-start bg-color-30">
//                         <div className='w-[48px] h-[48px] rounded-full bg-color-28 ml-[5px] relative overflow-hidden'>
//                             <Image
//                                 src="/../../assets/ProfileHeaderImage.svg"
//                                 alt='First Place Icon'
//                                 fill={true}
//                                 priority={true}
//                                 className='object-cover w-full h-full ' />
//                         </div>
//                         <div className="sm:flex  hidden flex-col ">
//                             <span className='font-nico-moji text-[14px] text-color-6'>Imad</span>
//                             <span className="-mt-1 font-nico-moji text-[13px] text-color-29">Abid</span>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="w-full h-[58px] flex gap-[8px] cursor-pointer items-center justify-center ">
//                     <div className="flex h-full sm:w-[224px] w-[58px]  rounded-[209px]  gap-[10px] items-center justify-start bg-color-30">
//                         <div className='w-[48px] h-[48px] rounded-full bg-color-28 ml-[5px] relative overflow-hidden'>
//                             <Image
//                                 src="/../../assets/ProfileHeaderImage.svg"
//                                 alt='First Place Icon'
//                                 fill={true}
//                                 priority={true}
//                                 className='object-cover w-full h-full ' />
//                         </div>
//                         <div className="sm:flex hidden flex-col ">
//                             <span className='font-nico-moji text-[14px] text-color-6'>Abdelabri</span>
//                             <span className="-mt-1 font-nico-moji text-[13px] text-color-29">Messah</span>
//                         </div>
//                     </div>
//                     <div className="w-[102px] h-[38px] bg-color-30 rounded-[209px] flex items-center justify-center gap-3">
//                         <span className="font-nico-moji text-[20px] text-color-6">2</span>
//                         <span className="font-nico-moji text-[20px] text-color-6">/</span>
//                         <span className="font-nico-moji text-[20px] text-color-6">5</span>
//                     </div>
//                     <div className="flex h-full sm:w-[224px] w-[58px] rounded-[209px]  gap-[10px] items-center justify-start bg-color-30">
//                         <div className='w-[48px] h-[48px] rounded-full bg-color-28 ml-[5px] relative overflow-hidden'>
//                             <Image
//                                 src="/../../assets/ProfileHeaderImage.svg"
//                                 alt='First Place Icon'
//                                 fill={true}
//                                 priority={true}
//                                 className='object-cover w-full h-full ' />
//                         </div>
//                         <div className="sm:flex  hidden flex-col ">
//                             <span className='font-nico-moji text-[14px] text-color-6'>Imad</span>
//                             <span className="-mt-1 font-nico-moji text-[13px] text-color-29">Abid</span>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="w-full h-[58px] flex gap-[8px] cursor-pointer items-center justify-center ">
//                     <div className="flex h-full sm:w-[224px] w-[58px]  rounded-[209px]  gap-[10px] items-center justify-start bg-color-30">
//                         <div className='w-[48px] h-[48px] rounded-full bg-color-28 ml-[5px] relative overflow-hidden'>
//                             <Image
//                                 src="/../../assets/ProfileHeaderImage.svg"
//                                 alt='First Place Icon'
//                                 fill={true}
//                                 priority={true}
//                                 className='object-cover w-full h-full ' />
//                         </div>
//                         <div className="sm:flex hidden flex-col ">
//                             <span className='font-nico-moji text-[14px] text-color-6'>Abdelabri</span>
//                             <span className="-mt-1 font-nico-moji text-[13px] text-color-29">Messah</span>
//                         </div>
//                     </div>
//                     <div className="w-[102px] h-[38px] bg-color-30 rounded-[209px] flex items-center justify-center gap-3">
//                         <span className="font-nico-moji text-[20px] text-color-6">2</span>
//                         <span className="font-nico-moji text-[20px] text-color-6">/</span>
//                         <span className="font-nico-moji text-[20px] text-color-6">5</span>
//                     </div>
//                     <div className="flex h-full sm:w-[224px] w-[58px] rounded-[209px]  gap-[10px] items-center justify-start bg-color-30">
//                         <div className='w-[48px] h-[48px] rounded-full bg-color-28 ml-[5px] relative overflow-hidden'>
//                             <Image
//                                 src="/../../assets/ProfileHeaderImage.svg"
//                                 alt='First Place Icon'
//                                 fill={true}
//                                 priority={true}
//                                 className='object-cover w-full h-full ' />
//                         </div>
//                         <div className="sm:flex  hidden flex-col ">
//                             <span className='font-nico-moji text-[14px] text-color-6'>Imad</span>
//                             <span className="-mt-1 font-nico-moji text-[13px] text-color-29">Abid</span>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="w-full h-[58px] flex gap-[8px] cursor-pointer items-center justify-center ">
//                     <div className="flex h-full sm:w-[224px] w-[58px]  rounded-[209px]  gap-[10px] items-center justify-start bg-color-30">
//                         <div className='w-[48px] h-[48px] rounded-full bg-color-28 ml-[5px] relative overflow-hidden'>
//                             <Image
//                                 src="/../../assets/ProfileHeaderImage.svg"
//                                 alt='First Place Icon'
//                                 fill={true}
//                                 priority={true}
//                                 className='object-cover w-full h-full ' />
//                         </div>
//                         <div className="sm:flex hidden flex-col ">
//                             <span className='font-nico-moji text-[14px] text-color-6'>Abdelabri</span>
//                             <span className="-mt-1 font-nico-moji text-[13px] text-color-29">Messah</span>
//                         </div>
//                     </div>
//                     <div className="w-[102px] h-[38px] bg-color-30 rounded-[209px] flex items-center justify-center gap-3">
//                         <span className="font-nico-moji text-[20px] text-color-6">2</span>
//                         <span className="font-nico-moji text-[20px] text-color-6">/</span>
//                         <span className="font-nico-moji text-[20px] text-color-6">5</span>
//                     </div>
//                     <div className="flex h-full sm:w-[224px] w-[58px] rounded-[209px]  gap-[10px] items-center justify-start bg-color-30">
//                         <div className='w-[48px] h-[48px] rounded-full bg-color-28 ml-[5px] relative overflow-hidden'>
//                             <Image
//                                 src="/../../assets/ProfileHeaderImage.svg"
//                                 alt='First Place Icon'
//                                 fill={true}
//                                 priority={true}
//                                 className='object-cover w-full h-full ' />
//                         </div>
//                         <div className="sm:flex  hidden flex-col ">
//                             <span className='font-nico-moji text-[14px] text-color-6'>Imad</span>
//                             <span className="-mt-1 font-nico-moji text-[13px] text-color-29">Abid</span>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="w-full h-[58px] flex gap-[8px] cursor-pointer items-center justify-center ">
//                     <div className="flex h-full sm:w-[224px] w-[58px]  rounded-[209px]  gap-[10px] items-center justify-start bg-color-30">
//                         <div className='w-[48px] h-[48px] rounded-full bg-color-28 ml-[5px] relative overflow-hidden'>
//                             <Image
//                                 src="/../../assets/ProfileHeaderImage.svg"
//                                 alt='First Place Icon'
//                                 fill={true}
//                                 priority={true}
//                                 className='object-cover w-full h-full ' />
//                         </div>
//                         <div className="sm:flex hidden flex-col ">
//                             <span className='font-nico-moji text-[14px] text-color-6'>Abdelabri</span>
//                             <span className="-mt-1 font-nico-moji text-[13px] text-color-29">Messah</span>
//                         </div>
//                     </div>
//                     <div className="w-[102px] h-[38px] bg-color-30 rounded-[209px] flex items-center justify-center gap-3">
//                         <span className="font-nico-moji text-[20px] text-color-6">2</span>
//                         <span className="font-nico-moji text-[20px] text-color-6">/</span>
//                         <span className="font-nico-moji text-[20px] text-color-6">5</span>
//                     </div>
//                     <div className="flex h-full sm:w-[224px] w-[58px] rounded-[209px]  gap-[10px] items-center justify-start bg-color-30">
//                         <div className='w-[48px] h-[48px] rounded-full bg-color-28 ml-[5px] relative overflow-hidden'>
//                             <Image
//                                 src="/../../assets/ProfileHeaderImage.svg"
//                                 alt='First Place Icon'
//                                 fill={true}
//                                 priority={true}
//                                 className='object-cover w-full h-full ' />
//                         </div>
//                         <div className="sm:flex  hidden flex-col ">
//                             <span className='font-nico-moji text-[14px] text-color-6'>Imad</span>
//                             <span className="-mt-1 font-nico-moji text-[13px] text-color-29">Abid</span>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="w-full h-[58px] flex gap-[8px] cursor-pointer items-center justify-center ">
//                     <div className="flex h-full sm:w-[224px] w-[58px]  rounded-[209px]  gap-[10px] items-center justify-start bg-color-30">
//                         <div className='w-[48px] h-[48px] rounded-full bg-color-28 ml-[5px] relative overflow-hidden'>
//                             <Image
//                                 src="/../../assets/ProfileHeaderImage.svg"
//                                 alt='First Place Icon'
//                                 fill={true}
//                                 priority={true}
//                                 className='object-cover w-full h-full ' />
//                         </div>
//                         <div className="sm:flex hidden flex-col ">
//                             <span className='font-nico-moji text-[14px] text-color-6'>Abdelabri</span>
//                             <span className="-mt-1 font-nico-moji text-[13px] text-color-29">Messah</span>
//                         </div>
//                     </div>
//                     <div className="w-[102px] h-[38px] bg-color-30 rounded-[209px] flex items-center justify-center gap-3">
//                         <span className="font-nico-moji text-[20px] text-color-6">2</span>
//                         <span className="font-nico-moji text-[20px] text-color-6">/</span>
//                         <span className="font-nico-moji text-[20px] text-color-6">5</span>
//                     </div>
//                     <div className="flex h-full sm:w-[224px] w-[58px] rounded-[209px]  gap-[10px] items-center justify-start bg-color-30">
//                         <div className='w-[48px] h-[48px] rounded-full bg-color-28 ml-[5px] relative overflow-hidden'>
//                             <Image
//                                 src="/../../assets/ProfileHeaderImage.svg"
//                                 alt='First Place Icon'
//                                 fill={true}
//                                 priority={true}
//                                 className='object-cover w-full h-full ' />
//                         </div>
//                         <div className="sm:flex  hidden flex-col ">
//                             <span className='font-nico-moji text-[14px] text-color-6'>Imad</span>
//                             <span className="-mt-1 font-nico-moji text-[13px] text-color-29">Abid</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
"use client";

import Image from "next/image";
import MatchHistoryItem, { MatchHistoryProps } from "./MatchHistoryItem";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import animationData from "../../../public/assets/EmptyFriends.json";

import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { user } from "@nextui-org/react";
import { SocketContext } from "@/app/SocketContext";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
axios.defaults.withCredentials = true;

// const matchHistoryTest: MatchHistoryProps = {
//   id: 1,
//   userId: "99177",
//   userScore: 5,
//   opponentId: "332f6c7b-2791-40cd-a4eb-3e8bbfa51675",
//   opponentScore: 3,
// };

export type userProps = {
  providerId: string;
  firstName: string;
  lastName: string;
  nickName: string;
  avatar: string;
};

const getMatchHistoryList = async (userId: string) => {
  try {
    const res = await axios.get<MatchHistoryProps[]>(
      `http://localhost:3000/game/matchHistory/${userId}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export function MatchesHistory() {
  const socketClient = useContext(SocketContext);
  const queryClient = useQueryClient();
  const [me, setMe] = useState<userProps>();
  const [userToFetch, setUserToFetch] = useState<string>("");

  const pathname = usePathname();
  const params = pathname.split("/");

  const getUserToFetch = async () => {
    try {
      if (params.length === 2) {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user/me`
        );
        setMe(res.data);
        setUserToFetch(res.data?.providerId);
      } else {
        setUserToFetch(params[2]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserToFetch();
  }, [pathname]);

  // useEffect(() => {
  //   socketClient.on("updateInfo", () => {
  //     queryClient.invalidateQueries("matchesHistoryList");
  //   });
  // }, [socketClient, queryClient]);

  const {
    data: matchesHistoryList,
    isLoading,
    isError,
    error,
  } = useQuery<MatchHistoryProps[], Error>({
    queryKey: ["matchesHistoryList", userToFetch ?? ""],
    queryFn: () => getMatchHistoryList(userToFetch ?? ""),
  });

  return (
    <div className="h-[619px] 2xl:w-[596px] xl:w-[1137px] w-full bg-color-0 rounded-[22px] flex flex-col items-center overflow-x-scroll no-scrollbar">
      <div className="w-full flex items-center justify-center gap-[15px] py-3">
        <div className="w-[37px] h-[28px] relative sm:flex hidden items-center justify-center">
          <Image
            src="/../../assets/MatchHistoryIcon.svg"
            alt="Leader Board Icon"
            fill={true}
            priority={true}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex gap-[10px] flex-col sm:flex-row sm:items-start items-center">
          <span className="font-nico-moji text-color-6 sm:text-[32px]  text-[28px]">
            Matches
          </span>
          <span className="font-nico-moji text-color-29 sm:text-[32px] text-[28px]">
            History
          </span>
        </div>
      </div>

      <div className="w-full h-full flex flex-col gap-2 overflow-x-scroll no-scrollbar pb-6">
        {isLoading && (
          <div className="flex w-full h-full items-center justify-center ">
            <span className="font-nico-moji text-[25px] text-color-6 capitalize text-center">
              Loading...
            </span>
          </div>
        )}

        {isError && (
          <div className="flex w-full h-full items-center justify-center">
            Error: {error.message}
          </div>
        )}

        {/* <MatchHistoryItem historyEntry={matchHistoryTest} /> */}

        {!isLoading && matchesHistoryList?.length === 0 && (
          <div className="flex w-full h-full items-center justify-center">
            <Lottie
              autoPlay
              loop
              style={{ width: 300 }}
              animationData={animationData}
            />
          </div>
        )}
        {!isError &&
          !isLoading &&
          matchesHistoryList &&
          matchesHistoryList.map((matchHistory) => (
            <MatchHistoryItem
              key={matchHistory.id}
              historyEntry={matchHistory}
            />
          ))}
      </div>
    </div>
  );
}
