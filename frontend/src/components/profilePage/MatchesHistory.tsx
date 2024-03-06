"use client";

import Image from "next/image";
import MatchHistoryItem from "./MatchHistoryItem";
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

export type MatchHistoryProps = {
  game: {
    id: number;
    updatedAt: string;
    userScore: number;
    opponentScore: number;
    status: string;
  };
  user: {
    providerId: string;
    firstName: string;
    lastName: string;
    nickName: string;
    avatar: string;
  };
  opponent: {
    providerId: string;
    firstName: string;
    lastName: string;
    nickName: string;
    avatar: string;
  };
};

export function MatchesHistory() {
  const socketClient = useContext(SocketContext);
  const queryClient = useQueryClient();

  const [me, setMe] = useState<any>();
  const [userToFetch, setUserToFetch] = useState<string>("");

  const pathname = usePathname();
  const params = pathname.split("/");

  const getUserToFetch = async () => {
    try {
      if (params.length === 2) {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user/me`
        );
        setMe(res.data.providerId);
        setUserToFetch(res.data.providerId);
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

  useEffect(() => {
    socketClient.on("updateInfo", () => {
      queryClient.invalidateQueries("matchesHistoryList");
    });
  }, [socketClient, queryClient]);

  const getMatchHistoryList = async (userId: string) => {
    if (userId) {
      try {
        const res = await axios.get<MatchHistoryProps[]>(
          `http://localhost:3000/game/matchHistory/${userId}`
        );

        return res.data.map((item) => ({
          game: {
            id: item.game.id,
            updatedAt: item.game.updatedAt,
            userScore: item.game.userScore,
            opponentScore: item.game.opponentScore,
          },
          user: {
            providerId: item.user.providerId,
            firstName: item.user.firstName,
            lastName: item.user.lastName,
            nickName: item.user.nickName,
            avatar: item.user.avatar,
          },
          opponent: {
            providerId: item.opponent.providerId,
            firstName: item.opponent.firstName,
            lastName: item.opponent.lastName,
            nickName: item.opponent.nickName,
            avatar: item.opponent.avatar,
          },
        }));
      } catch (error) {
        console.error(error);
        return [];
      }
    }
  };

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
    <div className="h-[619px] 2xl:w-[596px] xl:w-[1137px] w-full bg-color-0 rounded-[22px] flex flex-col items-center overflow-x-scroll no-scrollbar relative">
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

      <div className="w-full h-full flex flex-col gap-2 overflow-x-scroll no-scrollbar pb-6 ">
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

        {!isLoading && matchesHistoryList?.length === 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
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
          matchesHistoryList.map((matchHistory: MatchHistoryProps) => (
            <MatchHistoryItem
              key={matchHistory.game.id}
              historyEntry={matchHistory}
            />
          ))}
      </div>
    </div>
  );
}
