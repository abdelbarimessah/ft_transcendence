"use client";

import Image from "next/image";
import FriendCard, { FriendCardProps } from "./FriendCard";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
// import Lottie from "lottie-react";
// import animationData from '../../../public/assets/EmptyFriends.json';
import animationData from "../../../public/assets/EmptyFriends.json";

import dynamic from "next/dynamic";
import { SocketContext } from "@/app/SocketContext";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

axios.defaults.withCredentials = true;

const getFriendsList = async () => {
  const res = await axios.get<FriendCardProps[]>(
    "http://localhost:3000/user/friends"
  );
  return res.data;
};

function FriendsList() {
  const socketClient = useContext(SocketContext);
  const queryClient = useQueryClient();
  const [me, setMe] = useState<any>();
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/user/me`)
      .then((res) => {
        setMe(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    socketClient.on("updateInfo", () => {
      queryClient.invalidateQueries("friendsList");
    });
  }, [socketClient, queryClient]);

  const {
    data: friendsList,
    isLoading,
    isError,
    error,
  } = useQuery<FriendCardProps[], Error>({
    queryKey: ["friendsList"],
    queryFn: getFriendsList,
  });

  return (
    <div className="h-[619px] 2xl:w-[557px] xl:w-[1137px] pb-2 w-full bg-color-0 rounded-[22px] flex flex-col items-center gap-[40px] overflow-x-scroll no-scrollbar  ">
      <div className="w-full flex items-center justify-center gap-[15px] pt-[18px]">
        <div className=" w-[37px] h-[28px] relative sm:flex hidden items-center justify-center pt-3 ">
          <Image
            src="/../../assets/MatchHistoryIcon.svg"
            alt="Leader Board Icon"
            fill={true}
            priority={true}
            className="object-cover w-full h-full"
            draggable={false}
          />
        </div>
        <div className="flex gap-[10px] ">
          <span className="font-nico-moji text-color-6 sm:text-[32px] text-[28px]">
            Friends
          </span>
        </div>
      </div>
      {!isLoading && friendsList?.length === 0 && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <Lottie
            autoPlay
            loop
            style={{ width: 300 }}
            animationData={animationData}
          />
        </div>
      )}

      {isLoading && (
        <div className="flex w-full h-full items-center justify-center ">
          <span className="font-nico-moji text-[25px] text-color-6 capitalize text-center">
            Loading...
          </span>
        </div>
      )}
      <div className="flex w-full justify-between px-10 gap-10 items-center flex-wrap pb-6 overflow-x-scroll no-scrollbar">
        {isError && (
          <div className="flex w-full h-full items-center justify-center">
            Error: {error.message}
          </div>
        )}
        <div className="flex w-full justify-center px-10 gap-10 items-center flex-wrap pb-6 overflow-x-scroll no-scrollbar">
          {!isLoading &&
            !isError &&
            friendsList?.map((friend) => (
              <FriendCard key={friend.id} friend={friend} user={me} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default FriendsList;
