import React from "react";
import { text } from "stream/consumers";


function Messages({msg, avatar, nickname, authorId, time, friendProviderId}){

    
    {/* <div    className={`flex justify-center items-center p-3 my-3  bg-[#FFE1B3] w-fit
            ${authorId !== friendProviderId ? "text-[#2A3E4D] ml-auto rounded-[35px_35px_0px_35px]" : "text-[#5E0000BA] mr-auto rounded-[35px_35px_35px_0px]"}`}> 
            <p>imittous</p>
            <p  className=" mr-3 "> {msg} </p> 
            <p  className=" text-[10px] text-[#80674b]"> {time} </p>
    </div> */}
    nickname = "imittous";
    return(
        //container
        
            
        <div    className={`flex justify-center items-center p-3 my-3 bg-[#FFE1B3] w-fit
                ${authorId !== friendProviderId ? "text-[#2A3E4D] mr-auto rounded-[0px_35px_35px_35px]" : "text-[#5E0000BA] ml-auto rounded-[35px_0px_35px_35px] "}`}>
                {authorId !== friendProviderId && <img src="../../assets/addChannel.png" alt={nickname} className="w-[40px] h-[40px] rounded-full mr-4" />}
                <div>
                    <p>{nickname}</p> {/* Display author's name */}
                    <p className="mr-3">{msg}</p> {/* Display message */}
                    <p className="text-[10px] text-[#80674b]">{time}</p> {/* Display time */}
                </div>
        </div>

    )
}

export default Messages
