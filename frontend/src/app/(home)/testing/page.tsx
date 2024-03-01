'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import FriendCard from "@/components/profilePage/FriendCard";



axios.defaults.withCredentials = true;

export default function App() {


  return (
    <div className="flex w-full flex-col  items-center justify-center relative bg-color-18">
      <InivteModeCard />
    </div>
  );
}


type Friend = {
  firstName: string
  lastName: string
  nickName: string
  providerId: string
  id: number
  avatar: string
  cover: string
}

function InivteModeCard() {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [isLoading, setIsloading] = useState(false)

  const [me, setMe] = useState<any>();
  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/me`).then(res => {
      setMe(res.data);
    }).catch(err => {
      console.error(err);
    })
  }, [])

  useEffect(() => {
    axios.get('http://localhost:3000/user/friends').then((res) => {
      setIsloading(true)
      console.log({ response: res.data });
      setFriends(res.data);
      setIsloading(false)
    }).catch((error) => {
      console.error(error)
      setIsloading(true)
    })
  }, [])
  const slideLeft = () => {
    var slider = document.getElementById('slider');
    if (slider)
      slider.scrollBy({ left: -500, behavior: 'smooth' }); // Use scrollBy for a smoother scroll
  };
  
  const slideRight = () => {
    var slider = document.getElementById('slider');
    if (slider)
      slider.scrollBy({ left: 500, behavior: 'smooth' }); // Use scrollBy for a smoother scroll
  };


  return (

    <div className=" w-[1073px] h-[500px] rounded-[22px] bg-[#E3E3E3]/10 relative flex flex-col items-center justify-between pt-10 pb-[100px] gap-[100px] overflow-hidden ">
      <div className="w-full flex items-center justify-center gap-[15px] pt-[18px]">
        <div className=" w-[37px] h-[28px] relative sm:flex hidden items-center justify-center pt-3 ">
          <Image
            src="/../../assets/MatchHistoryIcon.svg"
            alt="Leader Board Icon"
            fill={true}
            priority={true}
            className="object-cover w-full h-full"
            draggable={false}
          />
        </div>
        <div className="flex gap-[10px] ">
          <span className="font-nico-moji text-color-0 sm:text-[32px] text-[28px]">
            Friends
          </span>
        </div>
      </div>
      <div className="flex  items-center justify-center w-full gap-3 px-2">

        <div className=' w-[32px] h-[32px] opacity-50 cursor-pointer hover:opacity-100 ' onClick={slideLeft} >
          <Image
            src='../../../../assets/leftSlider.svg'
            alt="rightSlider"
            height={31} 
            width={31} 
            draggable={false}
            priority={true}
          >
          </Image>
        </div>
        <div id='slider'
          className='w-full overflow-x-scroll scroll whitespace-nowrap no-scrollbar flex flex-row overflow-hidden scroll-smooth scrollbar-hide gap-4'>
          {!isLoading &&
            friends?.map((friend) => (
              <div key={friend.id} className="w-64">
              <FriendCard friend={friend} user={me} />
              </div>
            ))
          }
        </div>
        <div className=' w-[32px] h-[32px] opacity-50 cursor-pointer hover:opacity-100  ' onClick={slideRight} >
          <Image
            src='../../../../assets/rightSlider.svg'
            alt="rightSlider"
            height={31} 
            width={31} 
            draggable={false}
            priority={true}
          >

          </Image>

        </div>
      </div>
    </div>
  )
}

export { InivteModeCard }