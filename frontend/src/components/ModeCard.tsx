'use client'
import styles from './ModeCard.module.css'
import Lottie from 'lottie-react';
import animationData from '../../public/assets/animation.json'
import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';


import {io} from 'socket.io-client'
import { useRouter } from 'next/navigation'
 



var socketClient = io('http://localhost:3000');

function ModeCard(props: any) {
  const router = useRouter()
  // const router = useRouter();
  const [isRandomMode, setIsRandomMode] = useState(false)
  
  const randomMode = () => {
    setIsRandomMode(true)
    socketClient.emit('joinRoomFromCard');
  };
  
  useEffect(() => {
    socketClient.on('enterRoomFromCard', (data) => {
        console.log('socket is called for random mode');
        router.push('/game/match', { scroll: false })
      });
  }, [isRandomMode])
  
  const removeRandomMode = () => {
    setIsRandomMode(false)
    socketClient.emit('customDisconnectClient');
  }


  return (
    <>
      <div className={` ${isRandomMode ? 'blur' : ''}  flex flex-wrap justify-around ` }>
        <div className={`${styles.playCardButton}  cursor-pointer bg-color-13 ml-10 mr-10 rounded-3xl h-full max-w-xs order-first w-80 opacity-1 transition-opacity duration-100 ease-in-out hover:opacity-90 mt-10`} >
          <div>
            <img src="../../assets/cardBackground.jpeg" alt="Abstract Design" className="w-full sm:h-80 object-cover rounded-t-3xl"></img>
          </div>
          <div className='bg-color-13 rounded-3xl h-32 mt-2 '>
            <h2 className={`${styles.NicoM} text-white uppercase font-nico-moji text-2xl flex items-center justify-center`}>AI mode</h2>
            <div className=" ml-7 mt-6 flex flex-wrap">
              <div className="rounded-3xl bg-color-8 h-10 w-10 flex justify-center items-center mb-4">
                <img src="../assets/AiAvatar.svg" className="h-8 w-8 text-white m-auto" alt="Vector" />
              </div>
              <div className='ml-2 flex flex-col gap-[6px]'>
                <p className="text-white font-poppins text-base leading-5 " >ALPHA ZERO</p>
                <p className="text-gray-500 leading-3 text-sm" >AI</p>
              </div>
              <button
                className={`${styles.playCardButton} font-poppins rounded-3xl capitalize bg-[#17222A] pl-6 pr-6 text-lg font-extralight text-white ml-9 mb-4`}
              >
                play
              </button>
            </div>
          </div>
        </div>

        <div className={`${styles.playCardButton} cursor-pointer bg-color-13 ml-10 mr-10 rounded-3xl h-full max-w-xs order-first w-80 opacity-1 transition-opacity duration-100 ease-in-out hover:opacity-90 mt-10`} >
          <div>
            <img src="../../assets/cardBackground.jpeg" alt="Abstract Design" className="w-full sm:h-80 object-cover rounded-t-3xl"></img>
          </div>
          <div className='bg-color-13 rounded-3xl h-32 mt-2 '>
            <h2 className={`${styles.NicoM} text-white uppercase font-nico-moji text-2xl flex items-center justify-center`}>friend mode</h2>
            <div className=" ml-7 mt-6 flex flex-wrap">
              <div className="rounded-3xl bg-color-8 h-10 w-10 flex justify-center items-center mb-4">
                <img src="../assets/Vector.svg" className="h-6 w-6 text-white m-auto" alt="Vector" />
              </div>
              <div className='ml-2 flex flex-col gap-[6px]'>
                <p className="text-white font-poppins text-base leading-5 " >play with your</p>
                <p className="text-gray-500 leading-3 text-sm" >friends</p>
              </div>
              <button className={`${styles.playCardButton} font-poppins rounded-3xl capitalize bg-[#17222A] pl-6 pr-6 text-lg font-extralight text-white ml-9 mb-4 `} >play</button>
            </div>
          </div>
        </div>
        

        <div className={`${styles.playCardButton}  cursor-pointer bg-color-13 ml-10 mr-10 rounded-3xl h-full max-w-xs order-first w-80 opacity-1 transition-opacity duration-100 ease-in-out hover:opacity-90 mt-10`} >
          <div >
            <img  src="../../assets/cardBackground.jpeg"alt="Abstract Design" className="w-full sm:h-80 object-cover rounded-t-3xl "></img>
          </div>
          <div className='bg-color-13 rounded-3xl h-32 mt-2 '>
            <h2 className={`${styles.NicoM} text-white uppercase font-nico-moji text-2xl flex items-center justify-center`}>random mode</h2>
            <div className=" ml-7 mt-6 flex flex-wrap">
              <ul className="flex flex-wrap ">
                <li >
                  <div className=''>
                    <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&crop=faces&fit=crop&h=200&w=200" alt="Face" className="rounded-full w-10 h-10 object-cover border-1 border-wihte"></img>
                  </div>
                </li>
                <li>
                  <div className='-ml-7'>
                    <img src="https://images.pexels.com/photos/458718/pexels-photo-458718.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb" alt="Face" className="rounded-full w-10 h-10 object-cover border-1  border-white"></img>
                  </div>
                </li>
                <li>
                  <div className='-ml-7'>
                    <img src="https://images.pexels.com/photos/458766/pexels-photo-458766.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb" alt="Face" className="rounded-full w-10 h-10 object-cover border-1  border-white"></img>
                  </div>
                </li>
              </ul>
              <div className={` ml-2 flex flex-col gap-[6px]`}>
                <p className="text-white font-poppins text-base leading-5 " >100 player</p>
                <p className="text-gray-500 leading-3 text-sm" >online</p>
              </div>

              <button
                onClick={randomMode}
                className={`${styles.playCardButton} font-poppins rounded-3xl capitalize bg-[#17222A] pl-6 pr-6 text-lg font-extralight text-white ml-10  `} >
                play
              </button>
            </div>
          </div>
        </div>
      </div>
      {isRandomMode && (
          <div className='fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50'>
            <Lottie
              autoPlay
              loop
              style={{ width: 300 }} animationData={animationData}
              />
              <div onClick={removeRandomMode}  className=' cursor-pointer w-[50px] h-[50px] bg-white fixed top-10 right-10 flex items-center justify-center z-50 rounded-[17px] '>
                  <img src="../../assets/cross1.svg" alt="" />
              </div>
            <button className=''></button>
          </div>
      )}
    </>
  );
}

export default ModeCard;

function redirectToPage(arg0: string) {
  throw new Error('Function not implemented.');
}
