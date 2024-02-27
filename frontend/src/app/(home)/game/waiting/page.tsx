'use client'
import Lottie from 'lottie-react'
import animationData from '../../../../../public/assets/Animation.json';
import { useEffect, useState } from 'react';
import { PlayerPairing } from '../../../../components/cards/ModeCard'
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

axios.defaults.withCredentials = true;


export default function Wiating() {
    const [isRandomMode, setIsRandomMode] = useState(true)
    const params = useSearchParams();
    const roomName: any = params.get("room");
    const players = roomName.split('-');
    const player1Id = players[1];
    const player2Id = players[2];
    const [player1, setPlayer1] = useState<any>();
    const [player2, setplayer2] = useState<any>();

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/${player1Id}`).then(res => {
            console.log(player1Id, 'the data in the player 1 [ppppp]', res.data);
            
            setPlayer1(res.data);
        }).catch(err => {
            console.error(err);
        })
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/${player2Id}`).then(res => {
            setplayer2(res.data);
        }).catch(err => {
            console.error(err);
        })

    }, [])

    console.log('the two player in this room is 1', player1);
    console.log('the two player in this room is 2', player2);
    

    const removeInvitemMode = () => {
        setIsRandomMode(false)
    }

    return (
        <div className='ml-6 mr-5 h-full flex items-center justify-center w-10 flex-1 relative'>
            {isRandomMode && (
                <div className='fixed ml-20 top-0 left-0 w-screen h-screen flex items-center justify-center z-[1000]'>
                    <Lottie
                        autoPlay
                        loop
                        style={{ width: 300 }} animationData={animationData}
                    />
                    <div onClick={removeInvitemMode} className=' cursor-pointer w-[50px] h-[50px] bg-white fixed top-32 right-32 flex items-center justify-center z-50 rounded-[17px] '>
                        <img src="../../assets/cross1.svg" alt="" />
                    </div>
                    {/* <PlayerPairing player1={player1} player2={player2}/> */}
                </div>

            )}
        </div>
    )
}