import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export default function App() {
  return (
    <div className="flex w-full flex-col  items-center justify-center relative bg-color-0">
          <div className={`  w-[282px] h-[195px] bg-color-30 rounded-[22px] flex flex-col items-center justify-center`}>
            <span className='font-nico-moji text-[64px] text-color-6'>you</span>
            <span className='font-nico-moji text-[64px] text-color-6 -mt-7'> win</span>
          </div>
    </div>
  );
}

