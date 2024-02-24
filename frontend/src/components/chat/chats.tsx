import { channel } from 'diagnostics_channel'
import React, { useState } from 'react'

function Chats ({avatar ,nickName ,msg ,time ,unreadMsgs, icon}) {
    console.log(nickName)
    return(
        icon == "channel" ?
        (
            //container
            <div className=' '>
                {/* avatar */}
                <div>
                    <img src={"../../assets/_MG_0027.jpg"} alt="" />
                </div>
                {/* nickname */}
                <div>{nickName} hh</div>
                {/* last msg */}
                <div>qqw</div>
                {/* time */}
                <div>qwqw</div>

            </div>
        ):
        icon == "friend" &&
        (
            //container
            <div>
                {/* avatar */}
                <div>scsc</div>
                {/* nickname */}
                <div>scsc</div>
                {/* last msg */}
                <div>scsc</div>
                {/* time */}
                <div>scsc</div>

            </div>
        )
    )
}

export default Chats