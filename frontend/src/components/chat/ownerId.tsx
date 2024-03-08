import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { chatslistContext } from "../../app/(home)/chat/page";
import { SocketContext } from "@/app/SocketContext";
import { toast } from "sonner";
import Link from "next/link";


function Owner({userId, ownerId, avatar, nickName, firstName, lastName, admin})
{
    return (
        <div className="Chat_owner h-[60px] w-[370px] bg-color-32 flex items-center justify-between rounded-[22px] pl-2 pr-10 flex-shrink-0  hover:scale-[1.01]">
          <div className="flex items-center justify-center">
            <div className="h-[43px] w-[43px] relative object-cover cursor-pointer">
              
              <Image
                src={avatar}
                alt={nickName}
                draggable={false}
                fill={true}
                priority={true}
                className="w-full h-full rounded-full object-cover"
              />
    
            </div>
            <div className="Chat_names flex flex-col items-start justify-center pl-[10px]">
              <span className="text-color-6 text-[14px]">{firstName} {lastName}</span>
              <span className="text-color-23 text-[10px] -mt-1">@{nickName}</span>
            </div>
          </div>
          <div className="Chat_role">
            <span className="text-[#325176]/50 text-[14px]">Owner</span>
          </div>
        </div>
      )
}

export default Owner
