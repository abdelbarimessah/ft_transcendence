
import { channel } from 'diagnostics_channel'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {createContext, useContext } from 'react'

import { chatslistContext } from '../../app/(home)/chat/page'




function Friend ({chat}: any) {
    
    const UserData: any	 = useContext(chatslistContext);
    
    
    
    
    function handelChahtConv (chatClicked: any){
        UserData.setChatClicked(chatClicked);
        UserData.setChannelClicked([]);
    }
    
    return(
        <div    className='flex justify-between items-center border-t-[2px] border-[#cdd7dd] p-3 min-h-[68px]'
        onClick={e  => {handelChahtConv(chat)}}>

                <img    src={UserData.myId.id != chat.members[0].id ? chat.members[0].avatar: chat.members[1].avatar}
                        alt={UserData.myId.id != chat.members[0].id ? chat.members[0].nickName: chat.members[1].nickName}
                        className=' rounded-full w-[60px] ' />
                
                    <h1 className=' font-medium text-[#325876]'>{UserData.myId.id != chat.members[0].id ? chat.members[0].nickName: chat.members[1].nickName}</h1>
            </div>
    )
}


export default Friend

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

