import React from "react";
import { useContext } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreatChannel from "./creatChannel";
import JoinChannel from "./joinChannel";
import EnterPassword from "./enterPassword";
import { chatslistContext } from "@/app/ChatContext";

function ChannelOption() {
  const UserData: any = useContext(chatslistContext);

  if (UserData.popUpOn === false) {
    UserData.inputPassRef = "";

    return;
  }
  return (
    <>
      <div className="z-50 bg-opacity-25 bg-black  flex justify-center items-center fixed w-screen h-screen">
        <Tabs
          defaultValue="joinChannel"
          className=" flex mt-0 w-[400px] items-center justify-center flex-col"
        >
          <TabsList>
            <TabsTrigger value="joinChannel"> join Channel</TabsTrigger>
            <TabsTrigger value="creatChannel"> create Channel</TabsTrigger>
          </TabsList>

          <TabsContent
            value="joinChannel"
            className="flex justify-center items-center m-0"
          >
            <JoinChannel />
          </TabsContent>

          <TabsContent
            value="creatChannel"
            className="flex justify-center items-center m-0"
          >
            <CreatChannel />
          </TabsContent>
        </Tabs>
        <EnterPassword />
      </div>
    </>
  );
}

export default ChannelOption;
