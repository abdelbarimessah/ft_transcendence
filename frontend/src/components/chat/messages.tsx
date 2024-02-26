import React from "react";
import { text } from "stream/consumers";


function Messages({msg, avatar, nickname, providerId, time, friendProviderId}){
    return(
        //container
        <div    className={`flex justify-center items-center p-3 my-3 rounded-[35px_35px_35px_0px] bg-[#FFE1B3] w-fit
                ${providerId !== friendProviderId ? "text-[#2A3E4D] ml-auto" : "text-[#5E0000BA] mr-auto"}`}> 
            <p className=" mr-3 "> {msg} </p> 
            <p className=" text-[12px] text-[#80674b]"> 12:20 </p> 
        </div>
    )
}

export default Messages
