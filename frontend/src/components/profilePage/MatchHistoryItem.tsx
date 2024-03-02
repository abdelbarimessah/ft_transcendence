"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export type MatchHistoryProps = {
  id: number;
  userId: string;
  userFirstName: string;
  userLastName: string;
  userNickName: string;
  userScore: number;
  opponentId: string;
  opponentFirstName: string;
  opponentLastName: string;
  opponentNickName: string;
  opponentScore: number;
  opponentScore: number;
};
// export type MatchHistoryProps = {
//   id: number;
//   userId: string;
//   userScore: number;
//   opponentId: string;
//   opponentScore: number;
// };

type MatchHistoryItemProps = {
  firstName: string;
  lastName: string;
  nickName: string;
  avatar: string;
};

const getUserToDisplay = async (user: string) => {
  const userData = await axios.get<MatchHistoryItemProps>(
    `http://localhost:3000/user/${user}`
  );
  console.log("USER DATAAAAAA -======>", userData.data);
  return userData.data;
};

export default function MatchHistoryItem({
  historyEntry,
}: {
  historyEntry: MatchHistoryProps;
}) {
  const [user1, setUser1] = useState<MatchHistoryItemProps | null>(null);
  const [user2, setUser2] = useState<MatchHistoryItemProps | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUser1 = await getUserToDisplay(historyEntry.userId);
      setUser1(fetchedUser1);
      const fetchedUser2 = await getUserToDisplay(historyEntry.opponentId);
      setUser2(fetchedUser2);
    };

    fetchData();
  }, [historyEntry]);

  if (!user1 || !user2) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full p-2 flex items-center justify-center gap-2">
      {/* Player 1 */}

      <div className="sm:py-1 p-2 sm:pr-1 h-[55px] w-full flex items-center justify-end text-end bg-color-30 rounded-[209px]">
        <div className="w-full sm:flex flex-col items-end justify-center mr-2 hidden">
          <h2 className="text-[12px] text-color-5">
            {user1.firstName + " " + user1.lastName}
          </h2>
          <span className="text-[12px] text-right text-color-29">
            {user1.nickName}
          </span>
        </div>
        <Image
          alt="User"
          src={user1.avatar}
          width={35}
          height={35}
          className="rounded-full sm:w-[70px]"
        />
      </div>

      {/* Score */}

      <div className="rounded-[22px] bg-color-30 py-1 px-3 flex justify-center items-center gap-4">
        <span className="text-[20px] text-color-6">
          {historyEntry.userScore}
        </span>
        <span className="text-[20px] text-color-6">/</span>
        <span className="text-[20px] text-color-6">
          {historyEntry.opponentScore}
        </span>
      </div>

      {/* Player 2 */}

      <div className="sm:py-1 p-2 sm:pl-1 h-[55px] w-full flex items-center bg-color-30 rounded-[209px]">
        <Image
          alt="User"
          src={user2.avatar}
          width={35}
          height={35}
          className="rounded-full sm:w-[70px]"
        />
        <div className="w-full sm:flex flex-col justify-center ml-2 hidden">
          <h2 className="text-[12px] text-color-5">
            {user2.firstName + " " + user2.lastName}
          </h2>
          <span className="text-[12px] text-color-29">{user2.nickName}</span>
        </div>
      </div>
    </div>
  );
}
