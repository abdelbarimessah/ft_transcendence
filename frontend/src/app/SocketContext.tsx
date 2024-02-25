"use client";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const socket = io("http://localhost:3000", { withCredentials: true });
export const SocketContext = createContext(socket);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/user/me`)
      .then((res) => {
        socket.emit("firstTime", res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
