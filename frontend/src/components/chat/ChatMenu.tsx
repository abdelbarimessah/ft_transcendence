import axios from "axios";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

interface User {
  id: string;
  providerId: string;
  email: string;
  nickName?: string;
  firstName?: string;
  lastName?: string;
  provider?: string;
  avatar?: string;
  secretOpt?: string;
  otpIsEnabled: boolean;
  level: number;
  cover?: string;
}
const ChatMenu = ({}) => {
  const backendUrl = process.env.BACKEND_URL || "http://localhost:3000";

  useEffect(() => {
    const res = axios
      .get(`${backendUrl}/user/me`, { withCredentials: true })
      .then((res) => {
        // console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => {
        // console.log("error in fetch user: ", err.message);
      });
  }, []);

  function handleClick() {
    console.log("you blocked the mother fucker");
  }
  const [user, setUser] = useState({
    nickName: "user image",
    avatar: "/assets/1.png",
  } as any);
  const firstName = "test";
  const lastName = "bo 9lwa";
  console.log("updated");
  return (
    <div className="bg-white flex flex-col items-center gap-4 h-full px-8 py-8 text-[#325876] text-lg w-full">
      <div className="w-full px-8">
        <Image
          className="rounded-full min-w-[220px]"
          src={user?.avatar}
          alt="alt-img"
          sizes="(min-width: 480px) 445px, calc(90.63vw + 28px)"
          width={400}
          height={400}
        />
      </div>
      <div className="w-full">
        <p className="cursor-default text-center">
          {user.firstName} {user.lastName}
        </p>
      </div>
      <div
        className="flex justify-between w-full cursor-pointer py-4 hover:bg-slate-50 rounded-xl active:bg-slate-100"
        onClick={handleClick}
      >
        <span className="uppercase text-[#6D8CA3] pl-2">
          block {user.nickName}
        </span>
        <svg
          className="w-7 h-7 pr-2"
          viewBox="0 0 46 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.0002 3.83398C12.4202 3.83398 3.8335 12.4207 3.8335 23.0007C3.8335 33.5807 12.4202 42.1673 23.0002 42.1673C33.5802 42.1673 42.1668 33.5807 42.1668 23.0007C42.1668 12.4207 33.5802 3.83398 23.0002 3.83398ZM7.66683 23.0007C7.66683 14.529 14.5285 7.66732 23.0002 7.66732C26.546 7.66732 29.8043 8.87482 32.3918 10.9065L10.906 32.3923C8.80105 29.715 7.65991 26.4064 7.66683 23.0007ZM23.0002 38.334C19.4543 38.334 16.196 37.1265 13.6085 35.0948L35.0943 13.609C37.1993 16.2863 38.3404 19.5949 38.3335 23.0007C38.3335 31.4723 31.4718 38.334 23.0002 38.334Z"
            fill="#506779"
          />
        </svg>
      </div>
    </div>
  );
};

export default ChatMenu;
