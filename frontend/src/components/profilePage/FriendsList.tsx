"use client";

import Image from "next/image";
import FriendCard, { FriendCardProps } from "./FriendCard";
import { useQuery } from "react-query";
import axios from "axios";

const friend1 = {
  id: 1,
  nickname: "abziouzi",
  firstName: "Abdel Hamid",
  lastName: "Ziouziou",
  avatar:
    "https://cdn.intra.42.fr/users/9e1ca2e516ae09da7301b880ee3d7edc/abziouzi.jpg",
  cover: "http://localhost:3000/uploads/DefaultCover.svg",
};

const getFriendsList = async () => {
  const res = await axios.get<FriendCardProps[]>(
    "http://localhost:3000/user/friends"
  );
  return res.data;
};

function FriendsList() {
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
    <div className="h-[619px] 2xl:w-[557px] xl:w-[1137px] pb-2 w-full bg-color-0 rounded-[22px] flex flex-col items-center gap-[40px] overflow-x-scroll no-scrollbar ">
      <div className="w-full flex items-center justify-center gap-[15px] pt-[18px]">
        <div className=" w-[37px] h-[28px] relative sm:flex hidden items-center justify-center pt-3 ">
          <Image
            src="/../../assets/MatchHistoryIcon.svg"
            alt="Leader Board Icon"
            fill={true}
            priority={true}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex gap-[10px] ">
          <span className="font-nico-moji text-color-6 sm:text-[32px] text-[28px]">
            Friends
          </span>
        </div>
      </div>

      <div className="flex w-full justify-between px-10 gap-10 items-center flex-wrap pb-6 overflow-x-scroll no-scrollbar">
        {isLoading && (
          <div className="flex w-full h-full items-center justify-center">
            Loading...
          </div>
        )}

        {isError && (
          <div className="flex w-full h-full items-center justify-center">
            Error: {error.message}
          </div>
        )}

        {!isLoading &&
          !isError &&
          friendsList?.map((friend) => (
            <FriendCard key={friend.id} friend={friend} />
          ))}

        {/* <FriendCard friend={friend1} /> */}
      </div>
    </div>
  );
}

export default FriendsList;