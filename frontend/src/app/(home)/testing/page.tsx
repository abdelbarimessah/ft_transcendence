import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image";


export default function App() {
  return (
    <div className="flex w-full flex-col  items-center justify-center relative bg-color-18">
      <div className="w-[475px] h-[185px] bg-color-30 rounded-[22px] overflow-hidden relative">
        <div className="absolute z-0 h-full w-[256px] rounded-s-[22px] flex items-center justify-center overflow-hidden left-0 ">
          <Image
            src="/../../assets/rectangleShape.svg"
            alt="My Gallery Image"
            fill={true}
            sizes="(min-width: 480px) 445px, calc(90.63vw + 28px)"
            className='object-cover'
            priority={true}
          />
        </div>
        <div className="w-full  z-1 absolute flex items-center justify-center gap-[45px] pt-5">
          <div className="w-[80px] h-[80px] bg-color-2 rounded-full "></div>
          <div className="w-[42px] h-[35px] flex items-center justify-center overflow-hidden">
            <Image
              src="/../../assets/vsIcon.svg"
              alt="My Gallery Image"
              width={42}
              height={35}
              priority={true}
            />
          </div>
          <div className="w-[80px] h-[80px] bg-color-2 rounded-full "></div>
        </div>
        <div className="z-10 absolute flex items-center justify-center top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-20">
          <div className="w-[134px] h-[40px] bg-color-30 rounded-[10px] flex items-center justify-center flex-col">
            <span className="font-nico-moji text-[#949494] text-[14px] capitalize">abdelbari</span>
            <span className="font-nico-moji text-[#C7C7C7] text-[10px] -mt-1 capitalize ">@messah</span>
          </div>
          <div className="w-[134px] h-[40px] bg-color-6 rounded-[10px] flex items-center justify-center flex-col">
            <span className="font-nico-moji text-[#949494] text-[14px] capitalize">abdelbari</span>
            <span className="font-nico-moji text-[#C7C7C7] text-[10px] -mt-1 capitalize ">@messah</span>
          </div>
        </div>
      </div>
    </div>
  );
}

