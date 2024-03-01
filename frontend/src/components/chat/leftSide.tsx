import React, { useState, useEffect, createContext, useContext } from 'react'
import Btns from './commun_component/btns'
import Link from 'next/link'
import axios from 'axios'
import Friend from './friend'
import Channels from './channels'
import { chatslistContext } from '../../app/(home)/chat/page'

// import { chatsData } from './data'
// import { error } from 'console'

function LeftSide() {

	const [whatIcon, setWhatIcon] = useState("");
	const [newIcon, setNewIcon] = useState("");
	const [searchInput, setSearchInput] = useState("");
	const [newChat, setNewChat] = useState("");



	const UserData: any = useContext(chatslistContext);

	function handelAddNewConversation(icon : string) {
		UserData.setPopUpOn(true);

	}
 

	const renderAddNewConv = () => {
		
		
		return (<>
			<div className= 'flex justify-between items-center  px-3 min-h-[60px] bg[#FEE7C5] cursor-pointer hover:bg-[#635b4d]'>

								

			</div>
		</>)
	}


	const renderConversations = () => {

		

		if (whatIcon == 'channel') {

			return (
				<>
					<div className='flex justify-between items-center  px-3 min-h-[60px] bg-[#FEE7C5] cursor-pointer hover:bg-[#635b4d]' onClick={e => {handelAddNewConversation('channel')}}>

						<h1 className=' text-color-2 text-lg' >  Add New Channel </h1>
						<Btns icon={"../../assets/addChannel.png"} />
						

					</div>
						<div className=''>
							{UserData.channelsList.map((chat) => {
								return <Channels key={chat.id} chat={chat}/>;
							})}
						</div>

				</>
			)
		}
		else if (whatIcon == 'friend' && UserData.friendsList?.length > 0) {
			return (
				<>
					<div className='flex justify-between items-center  px-3 min-h-[60px] bg-[#FEE7C5] cursor-pointer hover:bg-[#635b4d]' onClick={() => {handelAddNewConversation('friend')}}>

						<h1 className=' text-color-2 text-lg' >  Find New Friend</h1>
						<Btns icon={"../../assets/addChannel.png"} onClick={undefined} />

					</div>
						<div className='felx justify-between items-center cursor-pointer w-full h-[85px] px-3 hover:bg-orange-600'>
                         	{UserData.friendsList.map((chat) => {								
                            	return <Friend key={chat.id} chat={chat}/>;
                        	})}
                        </div>

				</>
			)
		}
	}





	const handlChatList = (icon) => {
		setWhatIcon(icon);
	};



		


	return (
		//container
		// userConte
		
		<div className='flex flex-col border-r border-[#FFEFD9] w-full h-full '>
			{/* profile */}
			<div className='flex justify-between h-[130px] border-r border-b border-[#FFEFD9] p-5'>
				{/* image */}
				<Link href="/profile">
					<img	src={UserData.myId.avatar}
							alt={UserData.myId.nickName}
							className=' rounded-full object-center w-[86px] h-[86px] ' />
				</Link>
				{/* icons */}
				<div className='flex justify-between items-center w-[146px]'>
					<Btns icon={"../../assets/channel_icon.png"} onClick={() => { handlChatList('channel') }} />
					<img src="../../assets/separator_icon.png" alt="separator" />
					<Btns icon={"../../assets/friend_icon.png"} onClick={() => { handlChatList('friend') }} />
				</div>
			</div>
			{/* search bar */}

			{/* chat */}
			{renderConversations()}
			{renderAddNewConv()}
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