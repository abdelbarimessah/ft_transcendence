
import { channel } from 'diagnostics_channel'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {createContext, useContext } from 'react'

import { chatslistContext } from '../../app/(home)/chat/page'


// [
//     {
//         "id": "59299932-a049-4211-ae77-f28de983d3fb",
//         "members": [
//             {
//                 "id": "22aa53be-4b0a-4dff-a897-54817c13c18f",
//                 "providerId": "107369042129154344124",
//                 "email": "issmaimit123@gmail.com",
//                 "nickName": "Issmail Mittous",
//                 "firstName": "Issmail",
//                 "lastName": "Mittous",
//                 "provider": "google",
//                 "avatar": "https://lh3.googleusercontent.com/a/ACg8ocJas89t8OR8c1fmSRIBb3-Z7iVTXnBe3vxqT3HCxEaI=s96-c",
//                 "secretOpt": "CUKEUFDFBYQWQU3H",
//                 "otpIsEnabled": false,
//                 "level": 10,
//                 "cover": "http://localhost:3000/uploads/DefaultCover.svg",
//                 "sockets": []
//             },
//             {
//                 "id": "cd36c1fa-01fc-456a-8c45-f58f7948b5da",
//                 "providerId": "94215",
//                 "email": "imabid@student.1337.ma",
//                 "nickName": "imabid",
//                 "firstName": "Imad",
//                 "lastName": "Abid",
//                 "provider": "intra",
//                 "avatar": "https://cdn.intra.42.fr/users/ef32885097fea11f32a7cb7f268a2507/imabid.jpg",
//                 "secretOpt": "JVJH2CLMDFFGMTJM",
//                 "otpIsEnabled": false,
//                 "level": 10,
//                 "cover": "http://localhost:3000/uploads/DefaultCover.svg",
//                 "sockets": []
//             }
//         ]
//     }
// ]



// avatar : "https://lh3.googleusercontent.com/a/ACg8ocJas89t8OR8c1fmSRIBb3-Z7iVTXnBe3vxqT3HCxEaI=s96-c"
// cover : "http://localhost:3000/uploads/DefaultCover.svg"
// firstName : "Issmail"
// id : "7f07f92b-03fc-482a-91e5-986ab1beca3b"
// lastName : "Mittous"
// level : 10
// nickName : "Issmail Mittous"
// provider : "google"
// providerId : "107369042129154344124"



function Friend ({chat, EventTriger}: any) {
    // console.log("index = ", index);
    console.log("chat == ", chat);
    // console.log("icon", icon);
    
    
    
    
    // const [chatId, setChatId] = useState("");
    // const fetchConversationDta = async () =>{
    //     try {
    //         console.log("chatId = ", chatId);   
	// 		const response = await axios.get(`http://localhost:3000/chat/${chatId}`);
	// 		setChatConversation(response.data);
	// 		console.log(response.data);
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
    // };

    // useEffect(() => {
    //     if (chatId != "")
    //         fetchConversationDta();
    // }, [chatId]);

    const UserData	 = useContext(chatslistContext);

    


    function handelChahtConv (chatClicked: any){
        EventTriger(chatClicked);
    }
    /* console.log("UserData.myId = ",UserData.myId);
    console.log("chat.members[1].id = ", chat.members[1].id);
    console.log("chat.members[0].id = ", chat.members[0].id); */
    
    return(            
            <div    className='flex justify-between items-center border-t border-[#070401] p-3 min-h-[68px]'
                    onClick={e  => {handelChahtConv(chat)}}>
                
                <img    src={UserData.myId.id != chat.members[0].id ? chat.members[0].avatar: chat.members[1].avatar}
                        alt={UserData.myId.id != chat.members[0].id ? chat.members[0].nickName: chat.members[1].nickName}
                        className=' rounded-full w-[60px] ' />
                
                    <h1 className=' font-medium '>{UserData.myId.id != chat.members[0].id ? chat.members[0].nickName: chat.members[1].nickName}</h1>
        
            </div>
    )
}

export default Friend