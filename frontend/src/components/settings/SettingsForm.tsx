'use client'
import Image from "next/image";
import styles from './Settings.module.css'
import Lottie from "lottie-react";
import animationData from '../../../public/assets/animation.json';
import { use } from "matter";
import { useEffect } from "react";
import axios from "axios";

function SettingPrompt() {


    
    useEffect(() => {
        
    async function handleToken() {
        
        console.log('hello');
        try{
            const res =  await axios.get('http://localhost:3000/auth/google');
            console.log(res);
        }
        catch(err){
            console.log(err);
        }

    }
    handleToken();
    }, [])

    return (

        <div className="flex items-center justify-center  w-8/12">
            <div className={` ${styles.playCard}  w-full   max-w-[900px] bg-color-0 rounded-[22px]  flex flex-col gap-12  relative `}>
                <div className=' absolute cursor-pointer w-[30px] h-[30px] bg-color-6  flex items-center justify-center rounded-[10px] top-2 right-2 '>
                    <Image
                        src="../../assets/whiteCross.svg"
                        width={15}
                        height={15}
                        alt={""}
                    >
                    </Image>
                </div>
                <div className=" flex items-center justify-center w-full pt-10 ">
                    <div className='w-[134px] h-[134px] bg-color-15 rounded-full relative' >
                        <Image
                            src="/../../assets/ProfileHeaderImage.svg"
                            priority={true}
                            alt="My Gallery Image"
                            fill={true}
                            sizes="(min-width: 480px) 445px, calc(90.63vw + 28px)"
                            className='object-cover  rounded-full  w-[50px] h-[50px]'
                        />
                        <div className="h-[23px] w-[23px]  absolute bottom-2 right-2 bg-color-24 flex items-center justify-center rounded-full ">
                            <Image
                                src={'/../../assets/addImageIcon.svg'}
                                alt="My Gallery Image"
                                height={14}
                                width={14}
                            />
                        </div>
                    </div>
                </div>
                <div className="   flex flex-col px-3 ">
                    <div className="flex md:flex-row  flex-col justify-center gap-3 ">
                        <div className="w-full ">
                            <label htmlFor="" className="font-nico-moji pl-4 text-color-6 text-[16px] "> First name</label>
                            <div className='w-full h-[50px]  rounded-[22px] border-color-6 '>
                                <input type="text" className='bg-color-23 w-full h-full px-4 tracking-wider placeholder:font-light font-poppins font-[400] rounded-[22px] text-white/80 text-[20px] focus:outline-none' />
                            </div>
                        </div>
                        <div className="w-full">
                            <label htmlFor="" className="font-nico-moji pl-4 text-color-6 text-[16px] "> Last name</label>
                            <div className='w-full h-[50px]  rounded-[22px] border-color-6'>
                                <input type="text" className='bg-color-23 w-full h-full px-4 tracking-wider placeholder:font-light font-poppins font-[400] rounded-[22px] text-white/80 text-[20px] focus:outline-none' />
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex md:justify-start  justify-center  ">
                        <div className="w-full ">
                            <label htmlFor="" className="font-nico-moji pl-4 text-color-6 text-[16px] "> Nick name</label>
                            <div className=' md:w-[49%] w-full h-[50px]  rounded-[22px] border-color-6'>
                                <input type="text" className='bg-color-23 w-full h-full px-4 tracking-wider placeholder:font-light font-poppins font-[400] rounded-[22px] text-white/80 text-[20px] focus:outline-none' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full  flex items-center justify-center pb-10">
                    <div className="h-full w-full flex justify-center  md:justify-end md:pr-10 ">
                        <div className="h-[50px] w-[167px] cursor-pointer bg-color-6 rounded-[22px] flex justify-center items-center">
                            <p className="font-nico-moji text-color-0 text-[16px]">submit</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default SettingPrompt;