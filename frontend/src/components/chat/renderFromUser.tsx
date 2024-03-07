
import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { chatslistContext } from "../../app/(home)/chat/page";
import { SocketContext } from "@/app/SocketContext";

function RenderFromUser ({avatar, nickName, firstName, lastName, zIndex, userRef})
{
    console.log("hereeeeeee at render from admin");
    
    return (
        <div ref={userRef} className={`Chat_owner h-[60px] w-[370px] bg-color-32 flex items-center justify-between rounded-[22px] pl-2 pr-10 flex-shrink-0  hover:scale-[1.01] relative ${zIndex}`}>
          <div className="flex items-center justify-center">
            <div className="h-[43px] w-[43px] relative object-cover cursor-pointer">
              {/* <Link href={`/profile/${friendProviderId}`}> */}
              <Image
                src={avatar}
                alt={nickName}
                draggable={false}
                fill={true}
                priority={true}
                className="w-full h-full rounded-full object-cover"
              />
              {/* </Link> */}
            </div>
            <div className="Chat_names flex flex-col items-start justify-center pl-[10px]">
              <span className="text-color-6 text-[14px]">{firstName} {lastName}</span>
              <span className="text-color-23 text-[10px] -mt-1">{nickName}</span>
            </div>
          </div>
        </div>
      )

}

export default RenderFromUser