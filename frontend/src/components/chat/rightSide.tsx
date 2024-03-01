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
import FriendRightSide from './friendRightSide';
import ChannelRightSide from './channelRightSide';


function RightSide () {
    return(
        <>
            <FriendRightSide />
            <ChannelRightSide />
        </>
    )
    
}

export default RightSide



