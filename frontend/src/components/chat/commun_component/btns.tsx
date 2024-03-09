"use client";
import React from "react";
import Image from "next/image";

function Btns({ icon, onClick }: any) {
  return (
    <>
      <div
        className=" rounded-full w-[36px] h-[36px] p-[2px] relative cursor-pointer object-cover hover:scale-[1.01] hover:opacity-95"
        onClick={onClick}
      >
        <Image
          src={icon}
          alt="icon"
          fill={true}
          draggable={false}
          priority={true}
        ></Image>
      </div>
    </>
  );
}

export default Btns;
