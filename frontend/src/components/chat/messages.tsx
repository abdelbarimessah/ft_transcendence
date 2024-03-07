import React from "react";

function Messages({msg, avatar, nickname, authorId, time, myId}){

    
    
    return(

        <div    className={`flex justify-center items-center p-3 my-3 bg-[#FFFFFF] w-fit text-[#496D8B]
                ${authorId === myId ? " ml-auto rounded-[30px_0px_30px_30px]" : " mr-auto rounded-[0px_30px_30px_30px] "}`}>
                {authorId !== myId && <img src={avatar} alt={nickname} className="w-[40px] h-[40px] rounded-full mr-4" />}
                <div className="">
                    <p className="text-[#0d0202ba] text-[13px]">{nickname}</p>
                    <p className="text-wrap break-words max-w-[350px] mr-3">{msg}</p>
                    <p className=" flex  justify-end  min-w-[50px]   text-[10px] text-[#0c0906] ">{time}</p>
                </div>
        </div>

    )
}

export default Messages
