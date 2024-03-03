"use client";

import axios from "axios";
import Image from "next/image";

export type MatchHistoryProps = {
  id: number;
  userId: string;
  userScore: number;
  opponentId: string;
  opponentScore: number;
};

export default function MatchHistoryItem({
  historyEntry,
}: {
  historyEntry: MatchHistoryProps;
}) {

  return (
    <div className="w-full p-2 flex items-center justify-center gap-2">
      {/* Player 1 */}

      <div className="sm:py-1 p-2 sm:pr-1 h-[55px] w-full flex items-center justify-end text-end bg-color-30 rounded-[209px]">
        <div className="w-full sm:flex flex-col items-end justify-center mr-2 hidden">
          <h2 className="text-[12px] text-color-5">{historyEntry.userId}</h2>
          <span className="text-[12px] text-right text-color-29">
            {historyEntry.userId}
          </span>
        </div>
        <Image
          alt="User"
          src="/assets/ProfileHeaderImage.svg"
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
          src="/assets/ProfileHeaderImage.svg"
          width={35}
          height={35}
          className="rounded-full sm:w-[70px]"
        />
        <div className="w-full sm:flex flex-col justify-center ml-2 hidden">
          <h2 className="text-[12px] text-color-5">
            {historyEntry.opponentId}
          </h2>
          <span className="text-[12px] text-color-29">
            {historyEntry.opponentId}
          </span>
        </div>
      </div>
    </div>
  );
}