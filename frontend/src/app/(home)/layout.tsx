"use client";
import "../globals.css";
import SideNav from "@/components/sidebare/SideBare";
import { useContext, useEffect, useState } from "react";
import { SocketContext, SocketProvider } from "../SocketContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import AuthWrapper from "../authToken";

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
  const [win, setWin] = useState(false);
  const [lose, setLose] = useState(false);

  const [user, setUser] = useState<any>();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user/me`
        );
        setUser(res.data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    if (user) {
      const intervalId = setInterval(() => {
        socketClient.emit("User-status", {
          status: "online",
          providerId: user.providerId,
        });
      }, 2000);

      return () => clearInterval(intervalId);
    }
  }, [socketClient]);

  useEffect(() => {
    const enterRoom = (data: any) => {
      setGameEnded(true);
      const gameData = {
        userId: data.user.providerId,
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
          // eslint-disable-next-line no-console
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
  }, [socketClient, lose, route]);

  useEffect(() => {
    if (gameEnded) {
      return;
    }
    socketClient.on("OnePlayerLeaveTheRoom", async (data) => {
      if (socketClient.id !== data.socketId) return;
      const gameData = {
        userId: data.user.providerId,
        opponentId: data.oponent.providerId,
        userScore: 5,
        opponentScore: 0,
        status: "win",
        gameName: data.roomName,
        gameType: "randomMode",
      };

      const gameDataOpponent = {
        userId: data.oponent.providerId,
        opponentId: data.user.providerId,
        userScore: 0,
        opponentScore: 5,
        status: "lose",
        gameName: data.roomName,
        gameType: "randomMode",
      };
      try {
        const url = process.env.NEXT_PUBLIC_API_URL;
        await axios.post(`${url}/game/gameData`, gameData);
        await axios.post(`${url}/game/gameData`, gameDataOpponent);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    });
  }, [socketClient]);

  useEffect(() => {
    socketClient.on("OnePlayerLeaveTheRoomCallback", (data) => {
      if (socketClient.id === data.socketId) {
        setLose(true);
        return;
      } else {
        setWin(true);
        return;
      }
    });
    return () => {
      socketClient.off("OnePlayerLeaveTheRoomCallback");
    };
  }, [socketClient]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (win || lose) {
      timeoutId = setTimeout(() => {
        setWin(false);
        setLose(false);
      }, 5000);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [win, lose]);

  return (
    <AuthWrapper>
      <div className="flex  w-screen min-h-screen ">
        <SideNav setShow={setShow} />
        <div className="flex items-center justify-center flex-1 w-10 ">
          <SocketProvider>{children}</SocketProvider>
          {win && (
            <div className=" w-[282px] h-[195px] bg-color-30 rounded-[22px] flex flex-col items-center justify-center absolute top-1/2 left-[50%] ml-[70px] transform -translate-x-1/2 -translate-y-1/2 z-[1000]">
              <span className="font-nico-moji text-[64px] text-color-6">
                you
              </span>
              <span className="font-nico-moji text-[64px] text-color-6 -mt-7">
                {" "}
                win
              </span>
            </div>
          )}
          {lose && (
            <div className=" w-[282px] h-[195px] bg-color-30 rounded-[22px] flex flex-col items-center justify-center absolute top-1/2 left-[50%] ml-[7´0px] transform -translate-x-1/2 -translate-y-1/2 z-[1000]">
              <span className="font-nico-moji text-[64px] text-color-6">
                you
              </span>
              <span className="font-nico-moji text-[64px] text-color-6 -mt-7">
                lose
              </span>
            </div>
          )}
        </div>
      </div>
    </AuthWrapper>
  );
}
