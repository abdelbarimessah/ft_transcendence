"use client";
import axios from "axios";
import { createContext, useEffect } from "react";
import { io } from "socket.io-client";

const backendUrl = process.env.BACKEND_URL || "http://localhost:3000";
export const socket = io(backendUrl, { withCredentials: true });
export const SocketContext = createContext(socket);

axios.defaults.withCredentials = true;
export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
        withCredentials: true,
      })
      .then((res) => {
        socket.emit("firstTime", res.data);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err.message);
      });
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
