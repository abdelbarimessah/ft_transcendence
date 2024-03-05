"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { Skeleton } from "@nextui-org/react";
import Link from "next/link";
import { SocketContext } from "@/app/SocketContext";

axios.defaults.withCredentials = true;
const ProfileHeader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>();
  const socketClient = useContext(SocketContext);

  const backendUrl = process.env.BACKEND_URL || "http://localhost:3000";

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${backendUrl}/user/me`);

        setUser(res.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    socketClient.on("updateInfo", async (data) => {
      if (user && data.providerId === user.providerId) {
        try {
          setIsLoading(true);
          const res = await axios.get(`${backendUrl}/user/me`);

          setUser(res.data);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          console.error(error);
        }
      }
    });
  });

  return (
    <Link href="/profile">
      <div className="w-[66px] h-[66px] bg-color-0 rounded-[22px] flex items-center xl:pl-5 pl-0 justify-center  xl:justify-start gap-[8px] cursor-pointer xl:w-[280px]">
        <div className=" relative">
          {isLoading ? (
            <Skeleton className="w-[50px] h-[50px] rounded-full bg-color-25" />
          ) : (
            <div className="w-[50px] h-[50px] bg-color-15 rounded-full relative overflow-hiddenr">
              <Image
                src={user.avatar}
                alt="My Gallery Image"
                fill={true}
                sizes="(min-width: 480px) 445px, calc(90.63vw + 28px)"
                className="object-cover  rounded-full  w-[50px] h-[50px]"
              />
            </div>
          )}
          <div className="w-[10px] h-[10px] rounded-full bg-color-21 absolute bottom-1 right-[2px] z-50"></div>
        </div>

        <div className="xl:flex flex-col  hidden">
          {isLoading ? (
            <Skeleton className="w-[165px] h-[20px] rounded-full bg-color-25" />
          ) : (
            // <span className='font-nico-moji text-color-6 text-[16px] capitalize'>{`${user.firstName} ${user.lastName}`}</span>
            <span className="font-nico-moji text-color-6 text-[16px] capitalize">
              {`${user.firstName.substring(0, 5)}${
                user.firstName.length > 5 ? ".." : ""
              } ${user.lastName.substring(0, 5)}${
                user.lastName.length > 5 ? ".." : ""
              }`}
            </span>
          )}
          {isLoading ? (
            <Skeleton className="w-[86px] h-[16px] rounded-full mt-1 bg-color-25" />
          ) : (
            <span className="font-nico-moji -mt-1 text-[12px] text-color-29 capitalize">
              {user.nickName.substring(0, 10)}
              {user.nickName.length > 10 ? ".." : ""}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProfileHeader;
