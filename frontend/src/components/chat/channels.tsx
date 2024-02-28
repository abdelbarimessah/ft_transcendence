
import React, { useState } from 'react'


function channels ({chat}) {
    // console.log("index = ", index);
    // console.log("chat == ", chat);
    // console.log("icon", icon);

    return(

        <div className='felx  cursor-pointer w-full h-[80px] px-3 hover:bg-orange-600 justify-between items-center border-t border-[#070401] p-3 min-h-[68px]'>
            <img    src={chat.members[1].avatar} 
                    alt={chat.members[1].nickName}
                    className=' rounded-full w-[60px] ' />
            <h1 className=' font-medium '>{chat.members[1].nickName}</h1>
        </div>
      
    )
}

export default channels














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



