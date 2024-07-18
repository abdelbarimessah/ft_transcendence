"use client";
import React from "react";
import Image from "next/image";

function Btns({ icon, onClick }: any) {
  return (
    <>
      <div
        className=" rounded-full  p-[2px]  cursor-pointer  hover:scale-[1.01] hover:opacity-95"
        onClick={onClick}
      >
        <Image
          src={icon}
          alt="icon"
          width={32}
          height={32}
          
        ></Image>
      </div>
    </>
  );
}

export default Btns;
