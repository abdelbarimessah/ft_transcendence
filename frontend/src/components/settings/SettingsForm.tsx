'use client'
import Image from "next/image";
import styles from './Settings.module.css'
import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton"

axios.defaults.withCredentials = true;



function SettingPrompt() {
    const [id, setId] = useState("");
    const [avatar, setAvatar] = useState<File | null>(null);
    const [changeAvatar, setChangeAvatar] = useState(false);
    const [photoPath, setPhotoPath] = useState<any>();
    const [isLoading, setIsLoading] = useState(true);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [nickName, setNickName] = useState("");
    const [nickNameError, setNickNameError] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true);
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/me`);
                setId(res.data.providerId);
                setAvatar(res.data.avatar)
                setFirstName(res.data.firstName);
                setLastName(res.data.lastName);
                setNickName(res.data.nickName);
                setIsLoading(false);
            }
            catch (error) {
                setIsLoading(false);
                console.error(error);
            }
        }
        setPhotoPath(`${process.env.NEXT_PUBLIC_API_URL}/uploads/${id}.png`)
        getData();
    }, [id]);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setChangeAvatar(true);
        const file = event.target.files?.[0];
        if (file) {
            setPhotoPath(URL.createObjectURL(file));
            setAvatar(file);
        }
    };
    async function handleSubmit() {
        if (avatar && changeAvatar === true) {
            const formData = new FormData();
            formData.append('avatar', avatar);
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/updateAvatar`, formData)
        }
        const userData = {
            firstName,
            lastName,
            nickName,
        };
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/updateInfo`, userData);
            setNickNameError(false);
        } catch (error) {
            setNickNameError(true);
        }
    }

    return (

        <div className="flex items-center justify-center relative w-8/12 2xl:w-[650px]">
            <div className={` ${styles.playCard} w-full max-w-[900px] bg-color-0 rounded-[40px]  overflow-hidden flex flex-col gap-12  relative `}>
                <div className="absolute -top-8 rounded-[22px]">
                    <Image
                        src='/../../assets/wave-haikei.svg'
                        priority={true}
                        width={960}
                        height={540}
                        alt="My Gallery Image"
                    />
                </div>
                <div className=" flex items-center justify-center w-full pt-10   ">
                    {isLoading ? (
                        <Skeleton className="w-[134px] h-[134px] rounded-full bg-color-23" />
                    )
                        : (
                            <div className='w-[134px] h-[134px] bg-color-6 rounded-full relative border border-color-0 group cursor-pointer'>
                                {id && (
                                    <div className="w-full h-full absolute rounded-full overflow-hidden">
                                        <img src={photoPath} alt="my image" className="object-cover w-full h-full" />
                                    </div>
                                )}
                                <div className="h-[23px] w-[23px]  absolute bottom-2 right-2 bg-color-24 flex items-center justify-center rounded-full ">
                                    <Image
                                        src={'/../../assets/addImageIcon.svg'}
                                        alt="Add image icon"
                                        height={14}
                                        width={14}
                                    />
                                </div>
                                <div className='h-full w-full rounded-full absolute hidden group-hover:flex  bg-black items-center justify-center text-center bg-slate-600/50 text-white tracking-wider'>Change Profile</div>
                                <input className='h-full w-full rounded-full absolute opacity-0 z-10 cursor-pointer' onChange={handleFileChange} type="file" />
                            </div>
                        )}
                </div>
                <div className="flex flex-col px-10 z-10 gap-4 ">
                    <div className="flex md:flex-row  flex-col justify-center gap-3 ">
                        <div className="w-full ">
                            <label htmlFor="" className="font-nico-moji pl-4 text-color-6 text-[16px] "> First name</label>
                            {isLoading ? (
                                <Skeleton className="w-full rounded-[22px] h-[50px]  bg-color-23" />
                            )
                                : (
                                    <div className='w-full h-[50px]  rounded-[22px] border-color-6 flex items-center justify-center'>
                                        <input type="text" defaultValue={firstName} onChange={(event) => setFirstName(event.target.value)} className='bg-color-26 w-full h-full px-4 tracking-wider placeholder:text-color-0 placeholder:font-light font-poppins font-[400] rounded-[22px] text-  text-[17px] focus:outline-none' />
                                    </div>
                                )}
                        </div>
                        <div className="w-full ">
                            <label htmlFor="" className="font-nico-moji pl-4 text-color-6 text-[16px] "> Last name</label>
                            {isLoading ? (
                                <Skeleton className="w-full rounded-[22px] h-[50px]  bg-color-23" />
                            )
                                : (
                                    <div className='w-full h-[50px]  rounded-[22px] border-color-6 flex items-center justify-center '>
                                        <input type="text" defaultValue={lastName} onChange={(event) => setLastName(event.target.value)} className='bg-color-26 w-full h-full px-4 tracking-wider placeholder:text-color-0 placeholder:font-light font-poppins font-[400] rounded-[22px] text-  text-[17px] focus:outline-none' />
                                    </div>
                                )}
                        </div>
                    </div>
                    <div className="w-full flex md:justify-start  justify-center relative  ">
                        {nickNameError ?(
                        <div className="absolute left-4 top-[75px]">
                            <p className="text-color-22 text-[14px] font-poppins">Nickname is already in use</p>
                        </div>):null
                        }
                        <div className="w-full ">
                            <label htmlFor="" className="font-nico-moji pl-4 text-color-6 text-[16px] "> Nick name</label>
                            {isLoading ? (
                                <Skeleton className="md:w-[49%] w-full h-[50px]  rounded-[22px]  bg-color-23" />
                            )
                                : (
                                    <div className=' md:w-[49%] w-full h-[50px]  rounded-[22px] border-color-6 flex items-center justify-center'>
                                        <input type="text" defaultValue={nickName} onChange={(event) => setNickName(event.target.value)} className='bg-color-26 w-full h-full px-4  tracking-wider placeholder:text-color-25 placeholder:font-light font-poppins font-[400] rounded-[22px] text-  text-[17px] focus:outline-none' />
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
                <div className="w-full  flex items-center justify-center pb-10  z-[1000] ">
                    <div className="h-full w-full flex justify-center  md:justify-end md:pr-10 ">
                        <div className="h-[50px] w-[167px]  flex justify-center items-center">
                            <div onClick={handleSubmit} className="w-[141px] h-[35px] bg-color-6 rounded-[22px] flex items-center justify-center cursor-pointer">
                                <p className="text-[14px] text-color-0 font-nico-moji" >Save Change</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SettingPrompt;