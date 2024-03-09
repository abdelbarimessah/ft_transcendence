"use client";
import styles from "./ModeCard.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import animationData from "../../../public/assets/Animation.json";
import { useContext } from "react";
import { SocketContext } from "@/app/SocketContext";
import Link from "next/link";
import { toast } from "sonner";

import dynamic from "next/dynamic";
import axios from "axios";
import FriendCard from "../profilePage/FriendCard";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

function ModeCard(me: any) {
  const backendUrl = process.env.BACKEND_API || "http://localhost:3000";

  const socketClient = useContext(SocketContext);
  const [roomName, setRoomName] = useState("");
  const [playerPairingState, setPlayerPairingState] = useState(false);
  const router = useRouter();
  const [isRandomMode, setIsRandomMode] = useState(false);
  const [opponent, setOpponent] = useState(null);
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);

  //
  const [friends, setFriends] = useState<Friend[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const [inviteModal, setInviteModel] = useState(false);

  const [my, setMy] = useState<any>();
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/user/me`)
      .then((res) => {
        setMy(res.data);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${backendUrl}/user/friends`)
      .then((res) => {
        setIsloading(true);
        setFriends(res.data);
        setIsloading(false);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
        setIsloading(true);
      });
  }, []);
  const slideLeft = () => {
    var slider = document.getElementById("slider");
    if (slider) slider.scrollBy({ left: -300, behavior: "smooth" });
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    if (slider) slider.scrollBy({ left: 300, behavior: "smooth" });
  };

  const randomMode = () => {
    setIsRandomMode(true);
    socketClient.emit("joinRoomFromCard");
  };

  const removeRandomMode = () => {
    setIsRandomMode(false);
    socketClient.emit("handleRemoveFromQueue");
  };
  const removeInviteFriendModale = () => {
    setInviteModel(false);
  };

  useEffect(() => {
    const enterRoom = (data: any) => {
      setRoomName(data.roomName);
      if (!me) return;
      if (data.player1.providerId === me.me.providerId) {
        setPlayer1(data.player1);
        setPlayer2(data.player2);
      } else {
        setPlayer1(data.player2);
        setPlayer2(data.player1);
      }
      setPlayerPairingState(true);
      setIsRandomMode(false);
      setTimeout(() => {
        router.push(`/game/match?room=${data.roomName}`);
      }, 4000);
    };
    socketClient.on("enterRoomFromCard", enterRoom);

    return () => {
      socketClient.off("enterRoomFromCard", enterRoom);
    };
  }, [isRandomMode, router, socketClient, roomName, me]);

  useEffect(() => {
    const yourOpponent = (data: any) => {
      setOpponent(data);
    };
    socketClient.on("yourOpponent", yourOpponent);

    return () => {
      socketClient.off("yourOpponent", yourOpponent);
    };
  }, [socketClient]);

  useEffect(() => {
    socketClient.on("youAreInGameFromAntherPage", () => {
      toast.error("you are already in game");
      router.push("/profile");
    });
  });

  return (
    <>
      <div
        className={` ${isRandomMode || playerPairingState ? "blur" : ""} ${
          inviteModal ? "hidden" : ""
        } select-none   w-full max-h-full flex flex-wrap items-center justify-center gap-[24px] pb-10 pt-10 `}
      >
        <div
          className={` ${styles.playCard} cursor-pointer w-full max-w-[391px] h-[500px] rounded-[30px] overflow-hidden flex relative hover:opacity-90 hover:scale-[1.01] `}
        >
          <Image
            src="/../../assets/aiCoverImage.svg"
            alt="My Gallery Image"
            fill={true}
            sizes="(min-width: 480px) 445px, calc(90.63vw + 28px)"
            className="object-cover"
            priority={true}
            draggable={false}
          />
          <div className="bg-color-17/80 w-full h-[202px] absolute bottom-0 left-0 ">
            <div className="h-full flex flex-col gap-[16px] sm:gap-[30px] justify-center items-center ">
              <div className="w-full">
                <p className="text-[24px] sm:text-[32px] font-nico-moji text-color-3 text-center uppercase ">
                  AI mode
                </p>
              </div>
              <div className=" flex gap-[16px] sm:gap-[31px] items-center justify-center  flex-col  sm:flex-row  w-full">
                <div className="flex gap-[8px] items-center justify-center">
                  <div className="rounded-full bg-color-6 h-10 w-10 flex justify-center items-center">
                    <Image
                      src="../assets/AiAvatar.svg"
                      alt="AiAvatar"
                      height={32}
                      width={32}
                      priority={true}
                      draggable={false}
                    />
                  </div>
                  <div className="flex flex-col ">
                    <p className="text-[18px] text-color-3 font-poppins font-[400]">
                      ALPHA ZERO
                    </p>
                    <p className="text-[16px] text-color-16 font-poppins font-[300]">
                      AI
                    </p>
                  </div>
                </div>
                <div className="h-full flex items-center justify-center ">
                  <Link href="/game/aiMode">
                    <div
                      className={` ${styles.playCardButton} rounded-[14px] bg-color-6 w-[113px] h-[40px] font-nico-moji text-color-3 flex text-center items-center justify-center`}
                    >
                      play
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`${styles.playCard} cursor-pointer w-full max-w-[391px] h-[500px]  rounded-[30px] overflow-hidden flex relative hover:opacity-90  hover:scale-[1.01]`}
        >
          <Image
            src="/../../assets/randomCoverImage.svg"
            alt="My Gallery Image"
            fill={true}
            sizes="(min-width: 480px) 445px, calc(90.63vw + 28px)"
            className="object-cover"
            draggable={false}
          />
          <div className="bg-color-17/80 w-full h-[202px] absolute bottom-0 left-0 ">
            <div className="h-full flex flex-col gap-[16px] sm:gap-[30px] justify-center items-center ">
              <div className="w-full ">
                <p className="text-[24px] sm:text-[32px] font-nico-moji text-color-3 text-center uppercase ">
                  Random mode
                </p>
              </div>
              <div className=" flex gap-[16px] sm:gap-[31px] items-center justify-center  flex-col  sm:flex-row  w-full">
                <div className="flex gap-[8px] items-center justify-center">
                  <div className="rounded-full bg-color-6 h-10 w-10 flex justify-center items-center">
                    <div className="flex items-center justify-center h-[22px] w-[22px] object-cover relative">
                      <Image
                        src="../assets/randomModeIconCercl.svg"
                        alt="randomModeIconCercl"
                        fill={true}
                        priority={true}
                        sizes="(min-width: 480px) 445px, calc(90.63vw + 28px)"
                        draggable={false}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[18px] text-color-3 font-poppins font-[400]">
                      Play With Random{" "}
                    </p>
                    <p className="text-[16px] text-color-16 font-poppins font-[300]">
                      Players
                    </p>
                  </div>
                </div>
                <div className="h-full flex items-center">
                  <button
                    onClick={randomMode}
                    className={` ${styles.playCardButton} rounded-[14px] bg-color-6 w-[113px] h-[40px] font-nico-moji text-color-3`}
                  >
                    play
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${styles.playCard} cursor-pointer xl:mb-0 w-full max-w-[391px] h-[500px] rounded-[30px] overflow-hidden flex relative hover:opacity-90  hover:scale-[1.01]`}
        >
          <Image
            src="/../../assets/friendCoverImage.svg"
            alt="My Gallery Image"
            fill={true}
            sizes="(min-width: 480px) 445px, calc(90.63vw + 28px)"
            className="object-cover"
            draggable={false}
          />
          <div className="bg-color-17/80 w-full h-[202px] absolute bottom-0 left-0 ">
            <div className="h-full flex flex-col gap-[16px] sm:gap-[30px] justify-center items-center ">
              <div className="w-full ">
                <p className="text-[24px] sm:text-[32px] font-nico-moji text-color-3 text-center uppercase ">
                  FRIENDS MODE
                </p>
              </div>
              <div className=" flex gap-[16px] sm:gap-[31px] items-center justify-center  flex-col  sm:flex-row  w-full">
                <div className="flex gap-[8px] items-center justify-center">
                  <div className="rounded-3xl bg-color-6 h-10 w-10 flex justify-center items-center">
                    <div className="flex items-center justify-center h-[24px] w-[24px] object-cover relative">
                      <Image
                        src="../assets/Vector.svg"
                        alt="randomModeIconCercl"
                        fill={true}
                        priority={true}
                        sizes="(min-width: 480px) 445px, calc(90.63vw + 28px)"
                        draggable={false}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[18px] text-color-3 font-poppins font-[400]">
                      Play with your
                    </p>
                    <p className="text-[16px] text-color-16 font-poppins font-[300]">
                      Friend
                    </p>
                  </div>
                </div>
                <div className="h-full flex items-center">
                  <button
                    onClick={(e) => {
                      setInviteModel(true);
                    }}
                    className={` ${styles.playCardButton} rounded-[14px] bg-color-6 w-[113px] h-[40px] font-nico-moji text-color-3`}
                  >
                    play
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isRandomMode && (
        <div className="fixed ml-20 top-0 left-0 w-screen h-screen flex items-center justify-center z-[1000]">
          <Lottie
            autoPlay
            loop
            style={{ width: 300 }}
            animationData={animationData}
          />
          <div
            onClick={removeRandomMode}
            className=" cursor-pointer w-[50px] h-[50px] bg-white fixed top-32 right-32 flex items-center justify-center z-50 rounded-[17px] "
          >
            <Image
              src="../../assets/cross1.svg"
              alt="My Gallery Image"
              width={25}
              height={25}
              className="object-cover"
              draggable={false}
            />
          </div>
        </div>
      )}
      {playerPairingState && (
        <PlayerPairing player1={player1} player2={player2} />
      )}
      {inviteModal && (
        <div className="absolute z-[1000] w-full h-full px-28">
          <div className=" xl:w-[1073px] w-full h-[500px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-[22px] bg-[#E3E3E3]/10 relative flex flex-col items-center justify-between pt-10 pb-[100px] gap-[100px] overflow-hidden ">
            <div
              onClick={removeInviteFriendModale}
              className="absolute cursor-pointer w-[35px] h-[35px] bg-white flex items-center justify-center z-50 rounded-[12px] top-5 right-5"
            >
              <Image
                src="../../assets/cross1.svg"
                alt="My Gallery Image"
                width={18}
                height={18}
                className="object-cover"
                draggable={false}
              />
            </div>
            <div className="w-full flex items-center justify-center gap-[15px] pt-[18px]">
              <div className=" w-[37px] h-[28px] relative sm:flex hidden items-center justify-center pt-3 ">
                <Image
                  src="/../../assets/MatchHistoryIcon.svg"
                  alt="Leader Board Icon"
                  fill={true}
                  priority={true}
                  className="object-cover w-full h-full"
                  draggable={false}
                />
              </div>
              <div className="flex gap-[10px] ">
                <span className="font-nico-moji text-color-0 sm:text-[32px] text-[28px]">
                  Friends
                </span>
              </div>
            </div>
            <div className="flex  items-center justify-center w-full gap-3 px-2">
              <div
                className=" w-[32px] h-[32px] opacity-50 cursor-pointer hover:opacity-100 "
                onClick={slideLeft}
              >
                <Image
                  src="../../../../assets/leftSlider.svg"
                  alt="rightSlider"
                  height={31}
                  width={31}
                  draggable={false}
                  priority={true}
                />
              </div>
              <div
                id="slider"
                className="w-full overflow-x-scroll scroll whitespace-nowrap no-scrollbar flex flex-row overflow-hidden scroll-smooth scrollbar-hide gap-4"
              >
                {!isLoading &&
                  friends?.map((friend) => (
                    <div key={friend.id} className="w-64">
                      <FriendCard friend={friend} user={my} />
                    </div>
                  ))}
              </div>
              <div
                className=" w-[32px] h-[32px] opacity-50 cursor-pointer hover:opacity-100  "
                onClick={slideRight}
              >
                <Image
                  src="../../../../assets/rightSlider.svg"
                  alt="rightSlider"
                  height={31}
                  width={31}
                  draggable={false}
                  priority={true}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModeCard;

function PlayerPairing({ player1, player2 }: any) {
  return (
    <div className="select-none absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="w-[475px] h-[185px] bg-color-30 rounded-[22px] overflow-hidden relative ">
        <div className="absolute z-0 h-full w-[256px] rounded-s-[22px] flex items-center justify-center overflow-hidden left-0 ">
          <Image
            src="/../../assets/rectangleShape.svg"
            alt="My Gallery Image"
            fill={true}
            sizes="(min-width: 480px) 445px, calc(90.63vw + 28px)"
            className="object-cover"
            priority={true}
            draggable={false}
          />
        </div>
        <div className="w-full  z-1 absolute flex items-center justify-center gap-[45px] pt-5">
          <div className="w-[80px] h-[80px] bg-color-6 rounded-full relative overflow-hidden">
            <Image
              src={player1.avatar}
              alt="player 1 avatar"
              fill={true}
              className="object-cover"
              sizes="(min-width: 480px) 445px, calc(90.63vw + 28px)"
              priority={true}
              draggable={false}
            />
          </div>
          <div className="w-[42px] h-[35px] flex items-center justify-center overflow-hidden relative">
            <Image
              src="/../../assets/vsIcon.svg"
              alt="My Gallery Image"
              fill={true}
              className="object-cover"
              sizes="(min-width: 480px) 445px, calc(90.63vw + 28px)"
              priority={true}
              draggable={false}
            />
          </div>
          <div className="w-[80px] h-[80px] bg-color-30 rounded-full relative overflow-hidden ">
            <Image
              src={player2.avatar}
              alt="player 2 avatar"
              fill={true}
              className="object-cover"
              sizes="(min-width: 480px) 445px, calc(90.63vw + 28px)"
              priority={true}
              draggable={false}
            />
          </div>
        </div>
        <div className="z-10 absolute flex items-center justify-center top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-20">
          <div className="w-[150px] h-[50px] bg-color-30 rounded-[10px] flex items-center justify-center flex-col">
            <span className="font-nico-moji text-[#949494] text-[12px] capitalize">{` ${player1.firstName} ${player1.lastName}`}</span>
            <span className="font-nico-moji text-[#C7C7C7] text-[9px] -mt-1 capitalize ">
              @{`${player1.nickName}`}
            </span>
          </div>
          <div className="w-[150px] h-[50px] bg-color-6 rounded-[10px] flex items-center justify-center flex-col">
            <span className="font-nico-moji text-[#949494] text-[12px] capitalize">{` ${player2.firstName} ${player2.lastName}`}</span>
            <span className="font-nico-moji text-[#C7C7C7] text-[9px] -mt-1 capitalize ">
              @{`${player2.nickName}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export { PlayerPairing };

type Friend = {
  firstName: string;
  lastName: string;
  nickName: string;
  providerId: string;
  id: number;
  avatar: string;
  cover: string;
};

function InivteModeCard() {
  const backendUrl = process.env.BACKEND_API || "http://localhost:3000";

  const [friends, setFriends] = useState<Friend[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const [my, setMy] = useState<any>();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/user/me`)
      .then((res) => {
        setMy(res.data);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${backendUrl}/user/friends`)
      .then((res) => {
        setIsloading(true);
        setFriends(res.data);
        setIsloading(false);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
        setIsloading(true);
      });
  }, [friends]);
  const slideLeft = () => {
    var slider = document.getElementById("slider");
    if (slider) slider.scrollBy({ left: -500, behavior: "smooth" });
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    if (slider) slider.scrollBy({ left: 500, behavior: "smooth" });
  };

  return (
    <div className=" xl:w-[1073px] w-full h-[500px] rounded-[22px] bg-[#E3E3E3]/10 relative flex flex-col items-center justify-between pt-10 pb-[100px] gap-[100px] overflow-hidden ">
      <div className="w-full flex items-center justify-center gap-[15px] pt-[18px]">
        <div className=" w-[37px] h-[28px] relative sm:flex hidden items-center justify-center pt-3 ">
          <Image
            src="/../../assets/MatchHistoryIcon.svg"
            alt="Leader Board Icon"
            fill={true}
            priority={true}
            className="object-cover w-full h-full"
            draggable={false}
          />
        </div>
        <div className="flex gap-[10px] ">
          <span className="font-nico-moji text-color-0 sm:text-[32px] text-[28px]">
            Friends
          </span>
        </div>
      </div>
      <div className="flex  items-center justify-center w-full gap-3 px-2">
        <div
          className=" w-[32px] h-[32px] opacity-50 cursor-pointer hover:opacity-100 "
          onClick={slideLeft}
        >
          <Image
            src="../../../../assets/leftSlider.svg"
            alt="rightSlider"
            height={31}
            width={31}
            draggable={false}
            priority={true}
          />
        </div>
        <div
          id="slider"
          className="w-full overflow-x-scroll scroll whitespace-nowrap no-scrollbar flex flex-row overflow-hidden scroll-smooth scrollbar-hide gap-4"
        >
          {!isLoading &&
            friends?.map((friend) => (
              <div key={friend.id} className="w-64">
                <FriendCard friend={friend} user={my} />
              </div>
            ))}
        </div>
        <div
          className=" w-[32px] h-[32px] opacity-50 cursor-pointer hover:opacity-100  "
          onClick={slideRight}
        >
          <Image
            src="../../../../assets/rightSlider.svg"
            alt="rightSlider"
            height={31}
            width={31}
            draggable={false}
            priority={true}
          />
        </div>
      </div>
    </div>
  );
}

export { InivteModeCard };
