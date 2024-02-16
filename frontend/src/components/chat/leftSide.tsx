import React from 'react'
import Btns from './commun_component/btns'


function LeftSide () {
    return(
        //container
        <div className='flex flex-col border-r border-[#FFEFD9] w-full h-full'>
            {/* profile */}
            <div className='flex justify-between items-center bg-[#f99a0a] h-[130px] p-5'>
                {/* image */}
                <img src="../../assets/1.png" alt="user_profile" className=' rounded-full object-center w-[86px] h-[86px] ' />
                <div className='flex justify-between items-center w-[58px] h-[41px]'>
                    <Btns icon={"../../assets/friend_icon.png"} />
                </div>
            </div>
            {/* search bar */}
            {/* chat */}
        </div>
    )
}

export default LeftSide