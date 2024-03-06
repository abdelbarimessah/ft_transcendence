"use client";
import { SocketContext } from "@/app/SocketContext";
import styles from "./Prompt.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext } from "react";

axios.defaults.withCredentials = true;

function LogoutPrompt(props: any) {
  const router = useRouter();
  const socketClient = useContext(SocketContext);
  const handleCancelClick = () => {
    props.setShowLogoutPrompt(props.showLogoutPrompt);
  };
  async function handleLogoutClick() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        {
          withCredentials: true,
        }
      );
      socketClient.emit("customLogout");
      if (response.data.success) {
        router.push("/");
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  }

  return (
    <div
      className={` ${styles.playCard} fixed left-36 bottom-28 w-[388px] h-[132px] z-[1000] bg-color-0 rounded-[22px] flex flex-col gap-[25px] overflow-hidden`}
    >
      <div className=" w-full flex items-center justify-center pt-[10px]">
        <p className="text-[24px] text-color-6 font-nico-moji">Logout</p>
      </div>
      <div className=" flex w-full items-center justify-center gap-[36px]">
        <div
          onClick={() => handleCancelClick}
          className="w-[120px] h-[35px] bg-color-25 rounded-[22px] flex items-center justify-center cursor-pointer"
        >
          <p className="text-[14px] text-color-0 font-nico-moji">Cancel</p>
        </div>
        <div
          onClick={handleLogoutClick}
          className="w-[120px] h-[35px] bg-color-6 rounded-[22px] flex items-center justify-center cursor-pointer"
        >
          <p className="text-[14px] text-color-0 font-nico-moji">Confirm</p>
        </div>
      </div>
    </div>
  );
}

export default LogoutPrompt;
