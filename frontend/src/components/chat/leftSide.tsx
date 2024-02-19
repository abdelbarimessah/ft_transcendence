import React, { useState } from 'react'
import Btns from './commun_component/btns'
import Link from 'next/link'
import Chats from './chats'
import { chatsData } from './data'

function LeftSide() {

    // Set waht icon
    const [whatIcon, setWhatIcon] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [chats, setChats] = useState(chatsData);
    const [newChat, setNewChat] = useState("");



    function handelAddNewChat (e)
    {
        return (<> <div className=''> heelooo</div></>)
    }




    const renderChat = () => {
        switch (whatIcon) {
            case 'channel':
                return (
                    <>
                        {/* creat channel container*/}
                        <div className='flex justify-between items-center px-3 min-h-[60px] bg[#FEE7C5]' onClick={handelAddNewChat}>
                            {/* text */}
                            <div type='button' className=' text-color-13 ' >Add channel</div>
                            {/* icon */}
                            <Btns icon={"../../assets/addChannel.png"}/>
                        </div>
                        {chats.map(chat => {
                            return <Chats {...chats} icon={whatIcon}/>;
                        })}
                    </>
                )
            case 'friend':
                return (
                    <>
                        {/* <div className='flex justify-center center-item w-[460px] h-[897px] bg-white border border-color[#FFEFD9]' ></div> */}
                        {chats.map(chat => {
                            return <Chats {...chats} icon={whatIcon} />
                        })}
                    </>
                )
        }
    }


    return (
        //container
        <div className='flex flex-col border-r border-[#FFEFD9] w-full h-full '>
            {/* profile */}
            <div className='flex justify-between h-[130px] border-r border-b border-[#FFEFD9] p-5'>
                {/* image */}
                <Link href="/profile">
                    <img src="../../assets/1.png" alt="user_profile" className=' rounded-full object-center w-[86px] h-[86px] ' />
                </Link>
                {/* icons */}
                <div className='flex justify-between items-center w-[146px]'>
                    <Btns icon={"../../assets/channel_icon.png"} onClick={() => { setWhatIcon('channel') }} />
                    <img src="../../assets/separator_icon.png" alt="separator" />
                    <Btns icon={"../../assets/friend_icon.png"} onClick={() => { setWhatIcon('friend') }} />
                </div>
            </div>
            {/* search bar */}

            <div className='flex justify-center items-center h-[57px] bg-[#f8c75b]'>
                <input type="text"
                    placeholder='Search for chat'
                    className='rounded-lg bg-[#e4d3a1] text-[#8b877a] text-sm font-light outline-none px-4 py-2 w-[400px] h-[40px] placeholder:text-[#536672] placeholder:text-sm placeholder:font-light'
                    value={searchInput}
                    onChange={e => setSearchInput(e.target.value)}
                />
            </div>

            {console.log(searchInput)}


            {/* chat */}
            {renderChat()}
        </div>
    )
}

export default LeftSide






{/* {
    friendOrChannel == 'channel' ?
    (
        <div></div>

    )
    : friendOrChannel == 'friend' &&
    (
        <div></div>

    )

} */}