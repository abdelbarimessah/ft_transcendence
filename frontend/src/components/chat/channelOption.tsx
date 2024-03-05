import React from "react";
import { useState, useContext } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { chatslistContext } from '../../app/(home)/chat/page'
import CreatChannel from "./creatChannel";
import JoinChannel from "./joinChannel";
import EnterPassword from "./enterPassword";
import CreatPrivate from "./creatPrivate";


function ChannelOption() {
  const UserData :any = useContext(chatslistContext);
  
  if (UserData.popUpOn == false) {
    UserData.inputPassRef = "";

    return;  
  }
  return (
    <>
      <div className=" bg-opacity-25 bg-black  flex justify-center items-center fixed w-screen h-screen">
          <Tabs defaultValue="joinChanenl" className=" flex mt-0 w-[400px] items-center justify-center flex-col">

            <TabsList>
              <TabsTrigger value="joinChanenl"  > joinChanenl</TabsTrigger>
              <TabsTrigger value="creatChannel">  creatChannel</TabsTrigger>
            </TabsList>

            <TabsContent value="joinChanenl" className="flex justify-center items-center m-0">
             <JoinChannel />            
            </TabsContent>

            <TabsContent value="creatChannel" className="flex justify-center items-center m-0">
              <CreatChannel />
            </TabsContent>

          </Tabs>
          <EnterPassword />
      </div>
    </>
  );
}


export default ChannelOption