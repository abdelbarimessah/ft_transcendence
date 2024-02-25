

import { PlayerPairing } from '@/components/cards/ModeCard'
import Lottie from 'lottie-react'
import animationData from '../../../../../public/assets/Animation.json';


export default function Wiating() {

    const removeInvitemMode = () => {

    }

    return (
        <div className='ml-6 mr-5 h-full flex items-center justify-center w-10 flex-1 relative'>
            <div className='fixed ml-20 top-0 left-0 w-screen h-screen flex items-center justify-center z-[1000]'>
                <Lottie
                    autoPlay
                    loop
                    style={{ width: 300 }} animationData={animationData}
                />
                <div onClick={removeInvitemMode} className=' cursor-pointer w-[50px] h-[50px] bg-white fixed top-32 right-32 flex items-center justify-center z-50 rounded-[17px] '>
                    <img src="../../assets/cross1.svg" alt="" />
                </div>
            </div>
        </div>
    )
}