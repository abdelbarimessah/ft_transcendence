import React from "react";
import { text } from "stream/consumers";
/* const socket.on('newChat', (data)=> {
    //add to chat array
}) */

function Messages({msg, avatar, nickname, authorId, time, friendProviderId}){

    
    {/* <div    className={`flex justify-center items-center p-3 my-3  bg-[#FFE1B3] w-fit
            ${authorId !== friendProviderId ? "text-[#2A3E4D] ml-auto rounded-[35px_35px_0px_35px]" : "text-[#5E0000BA] mr-auto rounded-[35px_35px_35px_0px]"}`}> 
            <p>imittous</p>
            <p  className=" mr-3 "> {msg} </p> 
            <p  className=" text-[10px] text-[#80674b]"> {time} </p>
    </div> */}
    // nickname = "imittous";
    return(
        //container
        
            
        <div    className={`flex justify-center items-center p-3 my-3 bg-[#FFE1B3] w-fit
                ${authorId !== friendProviderId ? "text-[#2A3E4D] mr-auto rounded-[0px_30px_30px_30px]" : "text-[#5E0000BA] ml-auto rounded-[30px_0px_30px_30px] "}`}>
                {authorId !== friendProviderId && <img src={avatar} alt={nickname} className="w-[40px] h-[40px] rounded-full mr-4" />}
                <div>
                    <p className="text-[#0d0202ba] text-[13px]">{nickname}</p> {/* Display author's name */}
                    <p className="mr-3">{msg}</p> {/* Display message */}
                    <p className=" flex  justify-end  min-w-[50px]  text-[10px] text-[#0c0906] ">{time}</p> {/* Display time */}
                </div>
        </div>

    )
}

export default Messages
