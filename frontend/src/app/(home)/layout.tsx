"use client";
import "../globals.css";
import SideNav from "@/components/sidebare/SideBare";
import { useContext, useEffect, useRef, useState } from "react";
import { Providers } from "../providers";
import { SocketContext, SocketProvider } from "../SocketContext";
import axios from "axios";
import { useRouter } from "next/navigation";

axios.defaults.withCredentials = true;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [gameEnded, setGameEnded] = useState(false);
  const [Show, setShow] = useState(true);
  const route = useRouter();
  const socketClient = useContext(SocketContext);
  socketClient.on("notification", (data) => {
    console.log(data);
  });
  useEffect(() => {
    const enterRoom = (data: any) => {
      setGameEnded(true);
      const gameData = {
        opponentId: data.oponent.providerId,
        userScore: data.game.userScore,
        opponentScore: data.game.opponentScore,
        status: data.game.status,
        gameName: data.roomName,
        gameType: "randomMode",
      };
      if (data.roomName.startsWith("InviteRoom")) {
        gameData.gameType = "friendMode";
      }
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/game/gameData`, gameData, {
          withCredentials: true,
        })
        .then((res) => {})
        .catch((err) => {
          console.error(err.message);
        });
      setTimeout(() => {
        route.push("/game");
      }, 3000);
    };
    socketClient.on("endGameClient", enterRoom);

    return () => {
      socketClient.off("endGameClient");
    };
  }, [socketClient]);

  useEffect(() => {
    if (gameEnded) {
      return;
    }
    socketClient.on("OnePlayerLeaveTheRoom", async (data) => {
      if (data.socketId !== socketClient.id) return;
      const gameData = {
        opponentId: data.oponent.providerId,
        userScore: 0,
        opponentScore: 5,
        status: "lose",
        gameName: data.roomName,
        gameType: "randomMode",
      };

      try {
        const url = process.env.NEXT_PUBLIC_API_URL;
        await axios.post(`${url}/game/gameData`, gameData, {
          withCredentials: true,
        });
      } catch (error) {
        console.error(error);
      }
      setTimeout(() => route.push("/game"), 3000);
    });
    return () => {
      socketClient.off("OnePlayerLeaveTheRoom");
    };
  }, [socketClient]);

  useEffect(() => {
    if (gameEnded) {
      return;
    }
    socketClient.on("OnePlayerLeaveTheRoom", async (data) => {
      if (data.socketId === socketClient.id) return;
      const gameData = {
        opponentId: data.user.providerId,
        userScore: 5,
        opponentScore: 0,
        status: "win",
        gameName: data.roomName,
        gameType: "randomMode",
      };

      try {
        const url = process.env.NEXT_PUBLIC_API_URL;
        await axios.post(`${url}/game/gameData`, gameData, {
          withCredentials: true,
        });
      } catch (error) {
        console.error(error);
      }
      setTimeout(() => route.push("/game"), 3000);
    });
    return () => {
      socketClient.off("OnePlayerLeaveTheRoom");
    };
  }, [socketClient]);

  return (
    <div className="flex  w-screen min-h-screen ">
      <SideNav setShow={setShow} />
      <div className="flex items-center justify-center flex-1 w-10 ">
        <SocketProvider>{children}</SocketProvider>
      </div>
    </div>
  );
}
