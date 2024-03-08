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

      <div className="sm:py-1 p-2 sm:pr-1 h-[55px] w-full flex items-center justify-end text-end bg-color-30 rounded-[209px] cursor-pointer hover:scale-[1.01] hover:opacity-95">
        <div className="w-full sm:flex flex-col items-end justify-center mr-2 hidden">
          <span className="text-[12px] text-color-5">
            {`${historyEntry.user.firstName.substring(0, 8)}${
              historyEntry.user.firstName.length > 8 ? ".." : ""
            } ${historyEntry.user.lastName.substring(0, 8)}${
              historyEntry.user.lastName.length > 8 ? ".." : ""
            } `}
          </span>
          <span className="text-[10px] text-right text-color-29">
            {`${historyEntry.user.nickName.substring(0, 8)}${
              historyEntry.user.nickName.length > 8 ? ".." : ""
            }`}
          </span>
        </div>
        <Image
          alt="User"
          src={historyEntry.user.avatar}
          width={35}
          height={35}
          className="rounded-full sm:w-[70px]"
          draggable={false}
        />
      </div>

      {/* Score */}

      {/* <div className="rounded-[22px] bg-[#fef1f1] py-1 px-3 flex justify-center items-center gap-4"> */}

      <div
        className={`rounded-[22px]  ${
          historyEntry.game.status === "win" ? "bg-[#eefbef]" : "bg-[#fdeaeb]"
        } py-1 px-3 flex justify-center items-center gap-4`}
      >
        <span className="text-[20px] text-color-6">
          {historyEntry.game.userScore}
        </span>
        <span className="text-[20px] text-color-6">:</span>
        <span className="text-[20px] text-color-6">
          {historyEntry.game.opponentScore}
        </span>
      </div>

      {/* Player 2 */}

      <div className="sm:py-1 p-2 sm:pl-1 h-[55px] w-full flex items-center bg-color-30 rounded-[209px] cursor-pointer hover:scale-[1.01] hover:opacity-95">
        <Image
          alt="User"
          src={historyEntry.opponent.avatar}
          width={35}
          height={35}
          className="rounded-full sm:w-[70px]"
          draggable={false}
        />
        <div className="w-full sm:flex flex-col justify-center ml-2 hidden">
          <span className="text-[12px] text-color-5">
            {`${historyEntry.opponent.firstName.substring(0, 8)}${
              historyEntry.opponent.firstName.length > 8 ? ".." : ""
            } ${historyEntry.opponent.lastName.substring(0, 8)}${
              historyEntry.opponent.lastName.length > 8 ? ".." : ""
            } `}
          </span>
          <span className="text-[10px] text-color-29">
            {`${historyEntry.opponent.nickName.substring(0, 8)}${
              historyEntry.opponent.nickName.length > 8 ? ".." : ""
            }`}
          </span>
        </div>
      </div>
    </div>
  );
}
