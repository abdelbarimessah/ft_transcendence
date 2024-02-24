"use client";
import { createContext } from "react";
import { io } from "socket.io-client";

export const socket = io("http://localhost:3000", {
  withCredentials: true,
});
export const SocketContext = createContext(socket);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
