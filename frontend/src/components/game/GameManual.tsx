import { useState } from "react";
import AiModeManual from "./AiModeManual";
import FriendsModeManual from "./FriendsModeManual";
import RandomModeManual from "./RandomModeManual";

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
      <button
        className="fixed bottom-5 right-5 md:bottom-10 md:right-10 z-50 w-14 h-14 md:w-20 md:h-20 md:text-2xl rounded-full bg-color-6 text-white flex items-center justify-center shadow-lg hover:bg-[#587e99]"
        onClick={toggleManual}
      >
        ?
      </button>

      {isOpen && (
        <div
          className={`fixed bottom-5 right-5 md:bottom-10 md:right-10 z-50 w-64 md:w-96 bg-white rounded-lg shadow-xl p-4`}
        >
          <div>
            <button
              className="absolute right-2 top-2 text-color-6 hover:text-color-5"
              onClick={toggleManual}
            >
              ✖️
            </button>
            <div className="flex items-center justify-around mb-4">
              <button
                className={`text-sm md:text-base border rounded p-1 md:p-2  ${
                  manual === 0
                    ? "bg-color-6 text-white shadow"
                    : "bg-slate-200 hover:bg-slate-300"
                }`}
                value={0}
                onClick={changeManual}
              >
                AI
              </button>
              <button
                className={`text-sm md:text-base border rounded p-1 md:p-2  ${
                  manual === 2
                    ? "bg-color-6 text-white shadow"
                    : "bg-slate-200 hover:bg-slate-300"
                }`}
                value={2}
                onClick={changeManual}
              >
                RANDOM
              </button>
              <button
                className={`text-sm md:text-base border rounded p-1 md:p-2  ${
                  manual === 1
                    ? "bg-color-6 text-white shadow"
                    : "bg-slate-200 hover:bg-slate-300"
                }`}
                value={1}
                onClick={changeManual}
              >
                FRIEND
              </button>
            </div>
            <div className="text-xs md:text-sm overflow-auto max-h-60">
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
