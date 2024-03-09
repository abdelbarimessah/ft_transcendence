"use client";
import { SocketContext } from "@/app/SocketContext";
import CountDownTimer from "@/components/game/CountDowntimer";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
const DynamicComponentWithNoSSR = dynamic(() => import("./game"), {
  ssr: false,
});

axios.defaults.withCredentials = true;

export default function Home() {
  const [showFirstComponent, setShowFirstComponent] = useState(true);
  const socketClient = useContext(SocketContext);
  const route = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFirstComponent(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showFirstComponent]);

  const params = useSearchParams();
  const roomName: any = params.get("room");

  useEffect(() => {
    socketClient.emit("checkRoom", { roomName });
    socketClient.on("youAreNotinRoom", (data) => {
      route.push("/game");
    });
  }, [socketClient, roomName, route]);

  useEffect(() => {
    const enterRoom = (data: any) => {};
    socketClient.on("endGameClient", enterRoom);

    const handleUnload = () => {
      socketClient.emit("customDisconnectClient", { roomName });
    };
    return () => {
      handleUnload();
    };
  }, [roomName, socketClient]);

  return (
    <div className="ml-6 mr-5 h-full flex items-center justify-center w-10 flex-1 relative">
      <div className="w-full ">
        {showFirstComponent ? (
          <CountDownTimer />
        ) : (
          <DynamicComponentWithNoSSR />
        )}
      </div>
    </div>
  );
}
