import React, { useState, useEffect, createContext, useContext } from 'react'
import Btns from './commun_component/btns'
import Link from 'next/link'
import axios from 'axios'
import Friend from './friend'
import Channels from './channels'
import { chatslistContext } from '../../app/(home)/chat/page'

// import { chatsData } from './data'
// import { error } from 'console'

function LeftSide({ParentEventTriger}) {

	const [whatIcon, setWhatIcon] = useState("");
	const [newIcon, setNewIcon] = useState("");
	const [searchInput, setSearchInput] = useState("");
	const [newChat, setNewChat] = useState("");



	const UserData = useContext(chatslistContext);

	function handelAddNewConversation(icon) {
		setNewIcon(icon)
		console.log("add new chat")

	}


	const renderAddNewConv = () => {
		if (newIcon == 'channel')
		{
			return (<>
				<div className= 'flex justify-between items-center  px-3 min-h-[60px] bg[#FEE7C5] cursor-pointer hover:bg-[#635b4d]'>
					
					<h1 className=' text-color-2 text-lg' >  list of new channels</h1>
					<Btns icon={"../../assets/addChannel.png"}/>

				</div>
			</>)
		}
		else if (newIcon == 'friend')
		{
			return (<>
				<div className= 'flex justify-between items-center  px-3 min-h-[60px] bg[#FEE7C5] cursor-pointer hover:bg-[#635b4d]'>
					
					<h1 className=' text-color-2 text-lg' >  list of new friend</h1>
					<Btns icon={"../../assets/addChannel.png"}/>

				</div>
			</>)
		}
	}


	const renderConversations = () => {

		

		if (whatIcon == 'channel') {

			return (
				<>
					<div className='flex justify-between items-center  px-3 min-h-[60px] bg-[#FEE7C5] cursor-pointer hover:bg-[#635b4d]' onClick={e => {handelAddNewConversation('channel')}}>

						<h1 className=' text-color-2 text-lg' >  Add New Channel</h1>
						<Btns icon={"../../assets/addChannel.png"} />
						

					</div>
						<div className='felx justify-between items-center cursor-pointer w-full h-[80px] px-3 hover:bg-orange-600'>
							{UserData.channelsList.map((chat) => {
								return <Channels key={chat.id} chat={chat}/>;
							})}
						</div>

				</>
			)
		}
		else if (whatIcon == 'friend') {
			return (
				<>
					<div className='flex justify-between items-center  px-3 min-h-[60px] bg-[#FEE7C5] cursor-pointer hover:bg-[#635b4d]' onClick={e => {handelAddNewConversation('friend')}}>

						<h1 className=' text-color-2 text-lg' >  Find New Friend</h1>
						<Btns icon={"../../assets/addChannel.png"} onClick={undefined} />

					</div>
						<div className='felx justify-between items-center cursor-pointer w-full h-[85px] px-3 hover:bg-orange-600'>
                         	{UserData.friendsList.map((chat) => {								
                            	return <Friend key={chat.id} chat={chat} EventTriger={ParentEventTriger}/>;
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

			<div className='flex justify-center items-center h-[57px] bg-[#f8c75b] py-2'>
				<input type="text"
					placeholder='Search for chat'
					className='rounded-lg bg-[#e4d3a1] text-[#8b877a] text-sm font-light outline-none px-4 py-2 w-[400px] h-[40px] placeholder:text-[#536672] placeholder:text-sm placeholder:font-light'
					value={searchInput}
					onChange={e => setSearchInput(e.target.value)}
				/>
			</div>

			{/* {console.log(searchInput)} */}


			{/* chat */}
			{renderAddNewConv()}
			{renderConversations()}
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