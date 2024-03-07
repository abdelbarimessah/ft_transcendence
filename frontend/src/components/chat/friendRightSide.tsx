
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
import FriendMenu from './friendMenu';
import { toast } from 'sonner';


function FriendRightSide () {
    
    const inputMessageRef = useRef(null);
    const refToBottum = useRef(null);
    const UserData :any = useContext(chatslistContext);
    const socket = useContext(SocketContext);

    useEffect(() => {
        refToBottum.current?.scrollIntoView({behavior: "smooth"})

    },[UserData.friendChatConversation])
    
    const addMessageToChat = (message) => {
        if (UserData.chatClicked.id === message.chatId)
        {
            const newMessageArray = [...UserData.friendChatConversation, message];
            UserData.setFriendChatConversation(newMessageArray);
        }
    }
    
    useEffect(() => {
        socket.on("newMessage", (data) => {
            addMessageToChat(data);
        });
        return (() => {
            socket.off("newMessage")
        })
      }), [];

    if (UserData.chatClicked.id != undefined)
    {
        const friendSrcImg = UserData.myId.id !== UserData.chatClicked.members[0].id ? UserData.chatClicked.members[0].avatar : UserData.chatClicked.members[1].avatar;
        const friendNickName = UserData.myId.id !== UserData.chatClicked.members[0].id ? UserData.chatClicked.members[0].nickName : UserData.chatClicked.members[1].nickName;
        const friendId = UserData.myId.id !== UserData.chatClicked.members[0].id ? UserData.chatClicked.members[0].id : UserData.chatClicked.members[1].id;
        const friendProviderId = UserData.myId.id !== UserData.chatClicked.members[0].id ? UserData.chatClicked.members[0].providerId : UserData.chatClicked.members[1].providerId;
        const firstName = UserData.myId.id !== UserData.chatClicked.members[0].id ? UserData.chatClicked.members[0].firstName : UserData.chatClicked.members[1].firstName;
        const lastName = UserData.myId.id !== UserData.chatClicked.members[0].id ? UserData.chatClicked.members[0].lastName : UserData.chatClicked.members[1].lastName;
        

        const handelSubmitrefrech = (e) =>{
            e.preventDefault();
        }

        const handelMessageInput = () => {
            inputMessageRef.current.value.length === 0 ? UserData.setTyping(true) : UserData.setTyping(false);
        }



        const handelSubmit = async() => {
            try{
                const postMsgResponse = await axios.post("http://localhost:3000/chat/message",
                {
                    content: inputMessageRef.current?.value,
                    chatId: UserData.chatClicked.id,
                },
                {
                    withCredentials: true,
                }
                );
                // console.log("postMsgResponse.data = ", postMsgResponse.data);
                
                addMessageToChat(postMsgResponse.data);
                inputMessageRef.current.value = "";
                UserData.setTyping(false);

            } catch (error: any) {
                if (error.response) {
                  toast.error(error.response.data.message);
                }
              }

        }
        const messages = UserData.friendChatConversation;
        
        return(
            //chat
            <div className='flex flex-row w-full h-full'>

                <div className='flex flex-col h-full w-full'>
                    {/* up nav */}
                    <div className='flex justify-between w-full  bg-[#ffff] h-[130px] border-b-[3px] border-[#F3FAFF] p-5'>
                    <div className='flex items-center'>

                    {/* todo: profile need to redirect to: /profile/friend */}
                            <Link href={`/profile/${friendProviderId}`}>
                                <Image    
                                        src={friendSrcImg}
                                        alt={friendNickName}
                                        width={1024}
                                        height={1080}
                                        className=' rounded-full object-center w-[86px] h-[86px] p-1' />
                            </Link>

                            {/* info */}
                            <div className='felx flex-col p-3'>
                                <div className=' text-white '>{friendNickName}</div>
                                <div className=' text-xs text-white'>online</div>
                            </div>

                    </div>
                    <div className=' flex items-center justify-end w-[146px]'>
                            <Btns icon={"../../assets/addChannel.png"} onClick={() => {UserData.showFriendMenu == true ? UserData.setShowFriendMenu(false) : UserData.setShowFriendMenu(true)}}/>
                    </div>
        
                    </div>
        

                    {/* messages */}
                    <div className="h-full w-full bg-[#F3FAFF] bg-[url('../../public/assets/chat-bg.png')] overflow-y-scroll p-[38px]">
                        
                        
                            {messages.map((msg) => (
                                <Messages key={msg.id}
                                msg={msg.content}
                                avatar={msg.author.avatar}
                                nickname={msg.author.nickName}
                                authorId={msg.authorId}
                                time={<Moment format="hh:mm A">{msg.createdAt}</Moment>}
                                myId={UserData.myId.id}/>
                            ))}
                            <div ref={refToBottum}/>
                    


                    </div>


                    {/* bott nav */}

                    <form onSubmit={handelSubmitrefrech}>
                        <div className='flex items-center bg-[#FFE0B3] w-full h-[90px] p-4 rounded-lg'>
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
                <div>
                    <FriendMenu avatar={friendSrcImg}
                                nickName={friendNickName}
                                firstName={firstName}
                                lastName={lastName}
                                friendProviderId={friendProviderId}
                                friendId={friendId}
                                />
                </div>
            </div>
        )

    }
}


export default FriendRightSide