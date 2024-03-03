import React from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function App() {
  return (
    <div className="flex top-0 left-0  bg-color-18">
      <Tabs defaultValue="account" className="w-[400px]">

        <TabsList>
          <TabsTrigger value="joinChanenl " className="">Account</TabsTrigger>
          <TabsTrigger value="creatChannel">Password</TabsTrigger>
        </TabsList>

        <TabsContent value="joinChanenl">
        </TabsContent>

        <TabsContent value="creatChannel">
        </TabsContent>
      
      </Tabs>
    </div>
  );
}
