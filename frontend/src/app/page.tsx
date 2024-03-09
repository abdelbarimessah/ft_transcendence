"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./Home.module.css";
import Footer from "@/components/landingPage/Footer";
import MemberCard from "@/components/landingPage/MemberCard";
import LoginModal from "@/components/landingPage/LoginModal";
import StackItem from "@/components/landingPage/StackItem";
import Link from "next/link";
import { Tailwind } from "@/components/landingPage/StackItem";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const stackItems = [
    "nestjs",
    "postgresql",
    "prisma",
    "docker",
    "42",
    "nextjs",
    "reactjs",
  ];

  return (
    <div className={`${styles.card} h-full flex flex-col container mx-auto`}>
      <nav className="w-full flex justify-between items-center text-color-1 py-6">
        <Link href="/">
          <Image
            alt="PongGame"
            src={"/assets/logo.svg"}
            width={48}
            height={48}
            priority={true}
            className="animate-pulse"
            draggable={false}
          />
        </Link>
        <button
          className="w-[7rem] h-[3rem] text-[16px] rounded-[22px]  bg-color-31 shadow-sm hover:scale-[1.01] hover:opacity-95 "
          onClick={() => setShowModal(!showModal)}
        >
          <span className="text-color-0 text-[12px]">Sign In</span>
        </button>
      </nav>

      {showModal && <LoginModal closeModal={toggleModal} />}

      <hr className="opacity-30" />

      <div className="w-full my-8 md:my-10 md:py-4 flex flex-col md:flex-row justify-center items-center ">
        <div className="w-full h-[18rem] sm:h-[32rem] flex flex-col items-center justify-around sm:justify-center text-center sm:gap-10">
          <h2 className="select-none text-[17px] sm:text-[22px] text-color-29">
            Welcome to the ultimate
          </h2>
          <h1 className="select-none text-[24px] sm:text-[40px] md:text-[50px] bg-gradient-to-tr from-color-31 to-color-6 bg-clip-text text-transparent animate-pulse">
            {"CHAMPION'S CHALLENGE"}
          </h1>
          <h2 className="select-none text-[17px] sm:text-[22px] text-color-29">
            Conquer the Table, Rule the Game!
          </h2>
        </div>
        <div className="h-full flex flex-col justify-center gap-20 sm:gap-10 items-center">
          <Image
            alt="PongGame"
            src="/assets/gameImageLandingPage.svg"
            width={550}
            height={200}
            priority={true}
            className="rounded-[15px]"
            draggable={false}
          />
          <button
            className="select-none w-3/4 h-16 sm:text-[18px] text-[22px] rounded-[22px]  bg-color-31  hover:scale-[1.01] animate-bounce"
            onClick={() => setShowModal(!showModal)}
          >
            <span className="text-color-0">Play Now</span>
          </button>
        </div>
      </div>

      <hr className="opacity-30" />

      <div className="w-full flex flex-col items-center justify-center text-color-3 p-6">
        <h1 className="select-none py-8 text-[40px] sm:text-[50px] md:text-[60px] bg-gradient-to-br from-color-11 to-color-16 bg-clip-text text-transparent">
          TEAM
        </h1>
        <div className="flex flex-wrap w-full justify-center items-center sm:p-4 sm:gap-5 gap-1">
          <MemberCard
            name="Mustapha Jlem"
            login="mjlem"
            avatar="https://cdn.intra.42.fr/users/aaa8996491ed14f9f160b9d2b4d35331/mjlem.jpg"
          />
          <MemberCard
            name="Abdelbari Messah"
            login="amessah"
            avatar="https://cdn.intra.42.fr/users/0c352e349c934e624f264ba8cac2398a/amessah.jpg"
          />
          <MemberCard
            name="Ismail Mittous"
            login="imittous"
            avatar="https://cdn.intra.42.fr/users/aaf6846387f1dfca758132ebf22f9c42/imittous.jpg"
          />
          <MemberCard
            name="Abdel Hamid Ziouziou"
            login="abziouzi"
            avatar="https://cdn.intra.42.fr/users/9e1ca2e516ae09da7301b880ee3d7edc/abziouzi.jpg"
          />
        </div>
      </div>

      <hr className="opacity-30" />

      <div className="w-full h-full flex flex-col items-center justify-center p-6">
        <h1 className=" select-none py-8 text-[40px] sm:text-[50px] md:text-[60px] bg-gradient-to-br from-color-11 to-color-16 bg-clip-text text-transparent">
          STACK
        </h1>
        <div className="w-full h-fit py-10 flex flex-col flex-wrap sm:flex-row gap-5 justify-between items-center sm:px-4 bg-color-0 rounded-[18px] border-[3px] border-color-0 bg-opacity-70 ">
          {stackItems.map((item, index: number) => (
            <StackItem key={index} logo={item} />
          ))}
          <Tailwind />
        </div>
      </div>

      <Footer />
    </div>
  );
}
