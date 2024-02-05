'use client'
import Image from 'next/image'
import styles from './Otp.module.css'
import OtpPrompt from '../prompt/OtpPrompt'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Skeleton } from "@/components/ui/skeleton"

axios.defaults.withCredentials = true;

function OtpCard() {
    const [isVerifying, setIsVerifying] = useState(false);
    const [qrcode, setQrcode] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [otpDisable, setOtpDisable] = useState(true);
    const [otp, setOtp] = useState('');

    const handleEnableClick = () => {
        try
        {
            axios.
            patch('http://localhost:3000/auth/enable/Otp', {otp})
            .then((res) => {
                console.log(res)
                setOtpDisable(false);
            })
        }
        catch (error)
        {
            console.error(error);
        }
    }
    
    const handleDisableClick = () => {
        try
        {
            axios.
            patch('http://localhost:3000/auth/disable/Otp')
            .then((res) => {
                console.log(res)
                setOtpDisable(true);
            })
        }
        catch (error)
        {
            console.error(error);
        }
    }


    
    useEffect(() => {
        setIsLoading(true);
        console.log('sending request')
        axios.
        patch('http://localhost:3000/auth/generate/Otp')
        .then((res) => {
            setQrcode(res.data.qr_code)
            setIsLoading(false);
            console.log(res)
        })
        .catch((error) => {
            console.error(error);
            setIsLoading(false);
    });
    }, []);
     
    return (
    <>
        <div className={`2xl:w-[385px] w-8/12 relative`}>
            <div className={`${isVerifying ? 'blur-sm' : ''} ${styles.playCard}  overflow-hidden h-[522px] w-full  max-w-[900px] 2xl:w-[385px] bg-color-0 rounded-[40px] flex flex-col items-center justify-center gap-[22px]`}>
                <div className="h-[36px] w-[36px] flex items-center justify-center bg-color-0 border border-color-6 rounded-[10px]">
                
                    <Image
                        src="/../../assets/ScanIcon.svg"
                        alt="Scan Icon"
                        width={24}
                        height={20}
                        >
                    </Image>
                </div>
                <div className='flex items-center justify-center flex-col'>
                    <p className='font-nico-moji text-[10px] md:text-[14px] tracking-[0px]'>Turn on 2-Step Verification</p>
                    <p className='font-nico-moji text-color-25 text-[8px] md:text-[10px] tracking-[0px] text-center'>open authenticator and chose scan barcode.</p>
                </div>
                <div  className={`w-[200px] h-[200px] bg-color-26 rounded-[10px] relative object-cover flex items-center justify-center border-[0.5px] border-color-6 ${otpDisable ? '' : 'mt-5'}`}>
                {isLoading ? <Skeleton className="w-[200px] h-[200px]  rounded-[10px]  bg-color-23" /> :
                    <Image
                        src={qrcode}
                        alt="Qr Code"
                        fill={true}
                        className='px-2 py-2'
                        >
                    </Image>
                }
                </div>
                {!otpDisable ? (
                    <div className=" flex w-full items-center justify-center gap-[10px] md:gap-[36px] md:flex-row flex-col pt-[36px]">
                        <div onClick={handleDisableClick} className="w-[141px] h-[35px] bg-color-6 rounded-[22px] flex items-center justify-center cursor-pointer">
                            <p className="text-[14px] text-color-0 font-nico-moji" >Disable</p>
                        </div>
                    </div>
                ) : (
                    <>
                <div className='flex items-center justify-center w-[200px] h-[30px] bg-color-26 rounded-[10px]'>
                    <input
                        type="text"
                        placeholder="Enter 6-digit code"
                        maxLength={6}
                        className='placeholder-color-6 h-full tracking-[18px] placeholder:font-light placeholder:text-[12px] placeholder:tracking-[4px] bg-color-26 placeholder:text-start ml-[18px] font-poppins font-medium rounded-[10px] text-color-6 text-[22px] w-full focus:outline-none'
                        style={{ caretColor: "transparent" }}
                        // value={otp}
                        onChange={(event) => setOtp(event.target.value.replace(/[^0-9]/g, ''))}
                        onInput={(event) => {
                            event.currentTarget.value = event.currentTarget.value.replace(/[^0-9]/g, '');
                        }}
                        />
                </div>
                <div className=" flex w-full items-center justify-center gap-[10px] md:gap-[36px] md:flex-row flex-col ">
                    <div onClick={handleEnableClick} className="w-[141px] h-[35px] bg-color-6 rounded-[22px] flex items-center justify-center cursor-pointer">
                        <p className="text-[14px] text-color-0 font-nico-moji" >Enable</p>
                    </div>
                </div>
                </>
                )}
            </div>
            {/* {isVerifying && <div
                onClick={() => setIsVerifying(false)}
                 className='bg-color-6 w-6 h-6 flex items-center justify-center rounded-[8px] cursor-pointer absolute top-5 right-5'>
                    <Image
                        src={"/../../assets/smallCross.svg"}
                        alt='cros icon'
                        width={10}
                        height={10}
                    >

                    </Image>
            </div> } */}
            {/* <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                {isVerifying && <OtpPrompt/>}
            </div> */}
        </div>
    </>
    )
}
export default OtpCard;