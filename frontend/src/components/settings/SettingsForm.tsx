'use client'
import Image from "next/image";
import styles from './Settings.module.css'
import Lottie from "lottie-react";
import animationData from '../../../public/assets/animation.json';

function SettingPrompt() {


    return (
        <div>

            <div  className='fixed top-10 right-10 z-50 cursor-pointer w-[50px] h-[50px] bg-white   flex items-center justify-center  rounded-[17px] '>
                <img src="../../assets/cross1.svg" alt="" />
            </div>
        <div className={` ${styles.playCard} w-[700px] h-[522px] bg-color-0 rounded-[22px]  `}>
            <div className="w-full h-[80%] flex flex-col gap-[20%] ">
                <div className="w-full h-[35%] flex items-center justify-center  ">
                    <div className="h-full w-[150px]  flex items-center justify-center relative cursor-pointer">
                        <div className='w-[134px] h-[134px] bg-color-15 rounded-full relative '>
                            <Image
                                src="/../../assets/ProfileHeaderImage.svg"
                                alt="My Gallery Image"
                                fill={true}
                                sizes="(min-width: 480px) 445px, calc(90.63vw + 28px)"
                                className='object-cover  rounded-full  w-[50px] h-[50px]'
                                />
                        </div>
                        <div className="h-[23px] w-[23px]  absolute bottom-4 right-4">
                            <Image
                                src={'/../../assets/editImage.svg'}
                                alt="My Gallery Image"
                                height={23}
                                width={23}
                                />
                        </div>
                    </div>
                </div>
                <div className="w-full h-[40%] ">
                    <div className="h-[70%] w-full  flex flex-col gap-2">
                        <div className="flex gap-[10px] w-full items-center justify-center ">
                            <div className="">
                                <label htmlFor="" className="font-nico-moji pl-4 text-color-6 text-[16px] "> First name</label>
                                <div className='w-[320px]  h-[50px] rounded-[22px] border-color-6 '>
                                    <input type="text" className='bg-color-23 w-full h-full px-4 tracking-wider placeholder:font-light font-poppins font-[400] rounded-[22px] text-white/80 text-[20px] focus:outline-none' />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="" className="font-nico-moji pl-4 text-color-6 text-[16px] "> First name</label>
                                <div className='w-[320px]  h-[50px] rounded-[22px] border-color-6'>
                                    <input type="text" className='bg-color-23 w-full h-full px-4 tracking-wider placeholder:font-light font-poppins font-[400] rounded-[22px] text-white/80 text-[20px] focus:outline-none' />
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex justify-start ">

                            <div className="pl-6">
                                <label htmlFor="" className="font-nico-moji pl-4 text-color-6 text-[16px] "> First name</label>
                                <div className='w-[320px]  h-[50px] rounded-[22px] border-color-6'>
                                    <input type="text" className='bg-color-23 w-full h-full px-4 tracking-wider placeholder:font-light font-poppins font-[400] rounded-[22px] text-white/80 text-[20px] focus:outline-none' />
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
            <div className="w-full  h-[20%] ">
                <div className="h-full w-full flex justify-end pr-10 ">
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