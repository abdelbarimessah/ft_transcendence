import React from "react";

function Messages({msg, avatar, nickname, authorId, time, friendId}){

    

    // nickname = "imittous";
    return(
        //container
        
            
        <div    className={`flex justify-center items-center p-3 my-3 bg-[#FFE1B3] w-fit
                ${authorId !== friendId ? "text-[#2A3E4D] ml-auto rounded-[30px_0px_30px_30px]" : "text-[#5E0000BA] mr-auto rounded-[0px_30px_30px_30px] "}`}>
                {authorId === friendId && <img src={avatar} alt={nickname} className="w-[40px] h-[40px] rounded-full mr-4" />}
                <div className="">
                    <p className="text-[#0d0202ba] text-[13px]">{nickname}</p>
                    <p className="text-wrap break-words max-w-[350px] mr-3">{msg}</p>
                    <p className=" flex  justify-end  min-w-[50px]   text-[10px] text-[#0c0906] ">{time}</p>
                </div>
        </div>

    )
}

export default Messages
