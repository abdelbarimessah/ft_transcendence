import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function App() {
  return (
    <div className="flex w-full flex-col  items-center justify-center relative bg-color-0">
      <Tabs defaultValue="account" className="w-[300px] absolute top-0 right-0">
        <TabsList>
          <TabsTrigger value="random" className="bg-color-0 font-nico-moji ">Random Mode</TabsTrigger>
          <TabsTrigger value="ai" className="bg-color-0 font-nico-moji ">Ai Mode</TabsTrigger>
          <TabsTrigger value="friends" className="bg-color-0 font-nico-moji">Friends Mode</TabsTrigger>
        </TabsList>
        <TabsContent value="random">
          <div className="w-[380px] h-[300px] bg-color-0 rounded-[10px]">

          </div>
        </TabsContent>
        <TabsContent value="ai">

          <div className="w-[380px] h-[300px] bg-color-0 rounded-[10px]">

          </div>
        </TabsContent>
        <TabsContent value="friends">

          <div className="w-[380px] h-[300px] bg-color-0 rounded-[10px]">

          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

