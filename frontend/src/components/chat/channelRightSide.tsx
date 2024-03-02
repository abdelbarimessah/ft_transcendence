import React, {useContext, useRef, useEffect} from 'react'
import Btns from './commun_component/btns'
import Link from 'next/link'
import { chatslistContext } from '../../app/(home)/chat/page'
import Image from 'next/image';
import Messages from './messages';
import Moment from 'react-moment';
import 'moment-timezone';
import axios from 'axios';
import { SocketContext } from '@/app/SocketContext';



function ChannelRightSide () {    

    const inputMessageRef = useRef(null);
    // const refToBottum = useRef(null);
    const UserData :any = useContext(chatslistContext);
    const socket = useContext(SocketContext);
    
    // useEffect(() => {
    //     refToBottum.current?.scrollIntoView({behavior: "smooth"})

    // },[UserData.channelChatConversation])
    
    console.log("UserData.chatClicked =>>> ", UserData.chatClicked.id);
    console.log("UserData.channelClicked =>>> ", UserData.channelClicked.id);
    
    //channelChatConversation
    if (UserData.channelClicked.id != undefined)
    {   
        console.log("UserData.channelClicked <<<=>>> ", UserData.channelClicked);
        // const friendSrcImg = UserData.myId.id !== UserData.chatClicked.members[0].id ? UserData.chatClicked.members[0].avatar : UserData.chatClicked.members[1].avatar;
        // const friendNickName = UserData.myId.id !== UserData.chatClicked.members[0].id ? UserData.chatClicked.members[0].nickName : UserData.chatClicked.members[1].nickName;
        // const friendId = UserData.myId.id !== UserData.chatClicked.members[0].id ? UserData.chatClicked.members[0].id : UserData.chatClicked.members[1].id;
        // const friendProviderId = UserData.myId.id !== UserData.chatClicked.members[0].id ? UserData.chatClicked.members[0].providerId : UserData.chatClicked.members[1].providerId;
        
        const handelSubmitrefrech = (e) =>{
            e.preventDefault();
        }
        
        const handelMessageInput = () => {
            inputMessageRef.current?.value.length === 0 ? UserData.setTyping(true) : UserData.setTyping(false);
        }
        const addMessageToChannel = (message) => {
            const newMessageArray = [...UserData.channelChatConversation, message];
            UserData.setChannelChatConversation(newMessageArray);
        }


        socket.on('newMessage', (data) => {
            addMessageToChannel(data);
        })

        const handelSubmit = async() => {
            try{
                const postMsgResponse = await axios.post("http://localhost:3000/chat/message",
                {
                    content: inputMessageRef.current?.value,
                    channelId: UserData.channelClicked.id,
                },
                {
                    withCredentials: true,
                }
                );
                // console.log("postMsgResponse.data = ", postMsgResponse.data);
                
                addMessageToChannel(postMsgResponse.data);
                inputMessageRef.current.value = "";
                UserData.setTyping(false);

            }
            catch (error)
            {
                console.error("chatch limaaak ==> ", error.message);
            }
        }
        const messages = UserData.channelChatConversation;

        // // console.log("messages = ", messages);
        return(
            //chat 
            <div className='flex flex-col bg-[#ffff] h-full'>
                {/* up nav */}
                <div className='flex justify-between  bg-black h-[130px] border-r border-b border-[#FFEFD9] p-5'>
                   <div className='flex items-center'>

                   {/* todo: channel avatar */}
                            
                        {/* info */}
                            <div className='felx flex-col p-3 text-white '>{UserData.channelClicked.name}</div>
        
                   </div>
                   <div className=' flex items-center justify-end w-[146px]'>
                        <Btns icon={"../../assets/addChannel.png"}/>
                   </div>
    
                </div>
    

                {/* messages */}
                <div className="h-full bg-[#FFF0D2] bg-[url('../../public/assets/chat-bg.png')] overflow-y-scroll p-[38px]">
                    
                    
                        {messages.map((msg) => (
                            <Messages key={msg.id}
                            msg={msg.content}
                            avatar={msg.author.avatar}
                            nickname={msg.author.nickName}
                            authorId={msg.authorId}
                            time={<Moment format="hh:mm A">{msg.createdAt}</Moment>}
                            friendId={friendId}/>
                        ))}
                        <div ref={refToBottum}/>


                </div>

                    {messages.map((chat) => {
						console.log(chat);
					})}

                {/* bott nav */}

                <form onSubmit={handelSubmitrefrech}>
                    <div className='flex items-center bg-[#FFE0B3] h-[90px] p-4 rounded-lg'>
                        <input  type="text"
                                className=' bg-[#eadec4] rounded-lg outline-none text-sm text-[#39362d] w-full h-[50px] m-3 p-3 placeholder:text-sm placeholder:text-[#f3b679] '
                                placeholder='type a message'
                                onChange={handelMessageInput}
                                ref={inputMessageRef}

                        />
                            <div className='flex items-center justify-end  ml-4 mr-3'>
                                {UserData.typing ? <Btns icon={"../../assets/addChannel.png"}/> : <Btns icon={"../../assets/ball.png"} onClick={handelSubmit}/>}
                                
                            </div>
                    </div>

                </form>
    
            </div>
        )

    }
}


export default ChannelRightSide