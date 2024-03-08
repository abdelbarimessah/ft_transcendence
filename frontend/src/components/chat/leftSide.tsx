import React, { useState, useEffect, createContext, useContext } from 'react'
import Btns from './commun_component/btns'
import Link from 'next/link'
import axios from 'axios'
import Friend from './friend'
import Channels from './channels'
import { chatslistContext } from '../../app/(home)/chat/page'
import FriendConversation from './friendConversation'
import ChannelConversation from './channelConversation'

// import { chatsData } from './data'
// import { error } from 'console'

function LeftSide() {

	const UserData: any = useContext(chatslistContext);


	return (
		//container
		// userConte
		
		<div className='flex flex-col border-r-[4px] border-[#F3FAFF] w-full h-full '>
			{/* profile */}
			<div className='flex  justify-between items-center h-[130px]  border-b-[3px] border-[#F3FAFF] p-5'>
				{/* image */}
				<Link href="/profile">
					<img	src={UserData.myId.avatar}
							alt={UserData.myId.nickName}
							className=' rounded-full object-center w-[86px] h-[86px] ' />
				</Link>
				{/* icons */}
				<div className='flex justify-between items-center w-[146px]'>
					<Btns icon={"../../assets/channel_icon.png"} onClick={() => { UserData.setWhatIcon('channel') ; UserData.setShowFriendMenu(false);UserData.setChatClicked([]) }} />
					<img src="../../assets/separator_icon.png" alt="separator" />
					<Btns icon={"../../assets/friend_icon.png"} onClick={() => { UserData.setWhatIcon('friend') ; UserData.setShowChannelMenu(false); UserData.setChannelClicked([]) }} />
				</div>
			</div>
			{/* search bar */}

			{/* chat */}
			<FriendConversation/>
			<ChannelConversation/>

		</div>
	)
}

export default LeftSide