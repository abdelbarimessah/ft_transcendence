import Image from "next/image";
import React from "react";



function ModeCard() {
    return (
        // <div className="cursor-pointer m-1 rounded-2xl flex flex-col justify-center items-center w-96 border-8 border-gradient-to-1 from-blue-300 via-white to-blue-300 bg-gradient-to-tr h-3/4 "> 

        // </div>
        <div className=" bg-cardBackground bg-cover bg-center  cursor-pointer m-1 rounded-3xl flex flex-col justify-center items-center w-96 h-3/4 "> 
            <div className="bg-[#263642] h-2/6 z-10 m-1 w-full rounded-b-3xl mt-auto mb-0 blur-md invert brightness-150 md:filter-none">
                <button className="rounded-3xl bg-[#17222A] pt-3 pb-3 pl-10 pr-10 text-2xl font-extralight mt-20 ml-20">play</button>
            </div>
        </div>
    )
}

export default ModeCard;