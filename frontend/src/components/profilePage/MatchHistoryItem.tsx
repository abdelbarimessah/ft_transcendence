"use client";

import { user } from "@nextui-org/react";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MatchHistoryProps } from "./MatchesHistory";

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
          <h2 className="text-[12px] text-color-5">
            {historyEntry.user.firstName + " " + historyEntry.user.lastName}
          </h2>
          <span className="text-[12px] text-right text-color-29">
            {historyEntry.user.nickName}
          </span>
        </div>
        <Image
          alt="User"
          src={historyEntry.user.avatar}
          width={35}
          height={35}
          className="rounded-full sm:w-[70px]"
        />
      </div>

      {/* Score */}

      <div className="rounded-[22px] bg-color-30 py-1 px-3 flex justify-center items-center gap-4">
        <span className="text-[20px] text-color-6">
          {historyEntry.game.userScore}
        </span>
        <span className="text-[20px] text-color-6">/</span>
        <span className="text-[20px] text-color-6">
          {historyEntry.game.opponentScore}
        </span>
      </div>

      {/* Player 2 */}

      <div className="sm:py-1 p-2 sm:pl-1 h-[55px] w-full flex items-center bg-color-30 rounded-[209px]">
        <Image
          alt="User"
          src={historyEntry.opponent.avatar}
          width={35}
          height={35}
          className="rounded-full sm:w-[70px]"
        />
        <div className="w-full sm:flex flex-col justify-center ml-2 hidden">
          <h2 className="text-[12px] text-color-5">
            {historyEntry.opponent.firstName +
              " " +
              historyEntry.opponent.lastName}
          </h2>
          <span className="text-[12px] text-color-29">
            {historyEntry.opponent.nickName}
          </span>
        </div>
      </div>
    </div>
  );
}
