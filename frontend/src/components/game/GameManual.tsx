import { useState } from "react";
import AiModeManual from "./AiModeManual";
import FriendsModeManual from "./FriendsModeManual";
import RandomModeManual from "./RandomModeManual";
import Image from "next/image";
import img from "../../../public/assets/infoIconModeCard.svg";

const GameManual = () => {
  const [manual, setManual] = useState(0);
  const [isOpen, setIsOpen] = useState(false); // Manage open/close state internally

  const changeManual = (e: any) => {
    setManual(Number(e.target.value));
  };

  const toggleManual = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className="fixed bottom-5 right-5 z-50 w-[40px] h-[40px] rounded-[12px]  bg-color-6 text-white flex items-center justify-center shadow-lg hover:bg-color-5"
        onClick={toggleManual}
      >
        <div className="h-[20px] w-[20px] relative flex items-center justify-center object-cover ">
          <Image
            src="../../../../assets/infoIconModeCard.svg"
            alt="infoIconModeCard"
            fill={true}
            draggable={false}
            priority={true}
          ></Image>
        </div>
      </div>

      {isOpen && (
        <div
          className={`fixed bottom-14 right-14  z-50 w-[400px] h-[370px] p-3 bg-color-0 rounded-t-[22px]  rounded-bl-[22px] `}
        >
          <div
            onClick={toggleManual}
            className="absolute w-[26px] h-[26px] flex items-center justify-center -top-7 right-0 hover:scale-[1.03] cursor-pointer"
          >
            <Image
              src="../../../../assets/closeSettingModal.svg"
              alt="avatar"
              draggable={false}
              fill={true}
              priority={true}
              className="w-full h-full object-cover"
            ></Image>
          </div>
          <div className="w-full h-full flex py-3 justify-between flex-col">
            <div className="flex items-center justify-around  gap-1">
              <button
                className={` rounded-[12px] w-[100px] h-[40px]  ${
                  manual === 0
                    ? "bg-color-6 text-white shadow"
                    : "bg-slate-200 text-color-31 hover:bg-slate-300"
                }`}
                value={0}
                onClick={changeManual}
              >
                AI
              </button>
              <button
                className={`rounded-[12px] w-[100px] h-[40px]  ${
                  manual === 2
                    ? "bg-color-6 text-white shadow"
                    : "bg-slate-200 text-color-31 hover:bg-slate-300"
                }`}
                value={2}
                onClick={changeManual}
              >
                RANDOM
              </button>
              <button
                className={`rounded-[12px] w-[100px] h-[40px] ${
                  manual === 1
                    ? "bg-color-6 text-white shadow"
                    : "bg-slate-200 text-color-31 hover:bg-slate-300"
                }`}
                value={1}
                onClick={changeManual}
              >
                FRIEND
              </button>
            </div>
            <div className="w-full flex items-center justify-center">
              {manual === 0 && <AiModeManual />}
              {manual === 1 && <FriendsModeManual />}
              {manual === 2 && <RandomModeManual />}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GameManual;
