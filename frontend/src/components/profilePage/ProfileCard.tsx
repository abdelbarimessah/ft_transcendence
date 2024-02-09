"use client"
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"
import Image from 'next/image';
import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from 'next/navigation'

axios.defaults.withCredentials = true;

function ProfileCard() {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<any>();
    const [isSettingsVisible, setIsSettingsVisible] = useState(false);
    const [changeAvatar, setChangeAvatar] = useState(false);
    const [photoPath, setPhotoPath] = useState<any>();
    const [avatar, setAvatar] = useState<File | null>(null);

    const handleSettingsClick = () => {
        setIsSettingsVisible(!isSettingsVisible);
    };
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setChangeAvatar(true);
        const file = event.target.files?.[0];
        if (file) {
            setPhotoPath(URL.createObjectURL(file));
            setAvatar(file);
        }
    };

    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true);
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/me`);
                setUser(res.data);
                console.log('user ===>', res.data);
                setIsLoading(false);
            }
            catch (error) {
                setIsLoading(false);
                console.error(error);
            }
        }
        if(changeAvatar)
        {
            const formData = new FormData();
            formData.append('cover', avatar);
            try {
                console.log('formData in the cover', formData);
                const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/updateCover`, formData)
                console.log("photo uploaded", res.data.uploadPath);
                
            }
            catch (error) {
                console.error(error);
            }
        }
        getData();
    }, []);

    return (
        <div className="w-[1139px] h-[386px] bg-color-0 rounded-[22px] mt-[25px] relative overflow-hidden">

            <div className='w-full h-[150px] bg-color-6  relative group cursor-pointer  overflow-hidden'>
                {user && (
                    <div className="w-full h-full absolute  overflow-hidden">
                        <Image
                            src={changeAvatar ? photoPath : user.cover}
                            alt='profile image'
                            fill={true}
                            sizes="100%"
                            className="object-cover w-full h-full "
                        />
                    </div>
                )}
                <div className='h-full w-full  absolute hidden group-hover:flex  bg-black items-center justify-center text-center bg-slate-600/50 text-white tracking-wider font-nico-moji'>Change Cover Image</div>
                <input className='h-full w-full  absolute opacity-0 z-10 cursor-pointer' onChange={handleFileChange} type="file" />
            </div>
            <div className='w-full flex justify-between items-center px-[85px] absolute top-[111px]'>
                <div className='flex items-center gap-3'>
                    {isLoading ? (
                        <Skeleton className="w-[120px] h-[120px] rounded-full bg-color-25" />
                    )
                        : (
                            <div className="w-[120px] h-[120px] relative z-50 rounded-full overflow-hidden bg-black border-[2px] border-color-0">
                                <Image
                                    src={user.avatar}
                                    alt='profile image'
                                    fill={true}
                                    sizes="100%"
                                    priority={true}
                                    className="object-cover w-full h-full "
                                />
                            </div>
                        )}
                    <div className='flex flex-col  pt-[15px] '>
                        {isLoading ? (
                            <Skeleton className="w-[264px] h-[24px] rounded-full bg-color-25" />
                        )
                            : (
                                <span className='font-nico-moji text-black text-[24px]'>{`${user.firstName} ${user.lastName}`}</span>
                            )}
                        {isLoading ? (
                            <Skeleton className="w-[86px] h-[16px] rounded-full mt-1 bg-color-25" />
                        )
                            : (
                                <span className='font-nico-moji -mt-1 text-[16px] text-color-6'>Amessah</span>
                            )}
                    </div>
                </div>
                <div onClick={handleSettingsClick} className='h-[21px] w-[6px] bg-color-0 flex items-center justify-center  pt-[15px] cursor-pointer'>
                    <Image
                        src="/../../assets/SettingsPoints.svg"
                        alt='profile image'
                        width={6}
                        height={21}
                    />
                </div>
                {isSettingsVisible && <SettingsPoint />}
            </div>
            <div className='w-full flex items-center justify-center absolute bottom-[40px]'>
                <div className='h-[82px] w-[867px] bg-color-0 border-[1px] border-[#DDD] rounded-[22px] flex flex-col gap-[4px]'>
                    <div className='flex justify-between  px-[28px] pt-[14px]'>
                        <div className='flex '>
                            <span className='font-nico-moji text-[20px] text-color-6'>
                                {user ? `LEVEL ${user.level}` : 'Loading...'}
                            </span>
                        </div>
                        <div className=''>
                            <span className='font-nico-moji text-[16px] text-color-6'>250 / 500</span>
                        </div>
                    </div>
                    <div className='px-[28px]'>
                        {user ? <Progress value={user.level} /> :
                            <Skeleton className="w-full h-4 rounded-[22px]  bg-color-25" />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard;


const SettingsPoint = () => {
    const router = useRouter()
    async function handleLogoutClick() {

        try {
            console.log("logout clicked1");
            await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
            router.push('/login');
            console.log("logout clicked");
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="w-[130px] h-[59px] bg-color-0 border border-[#DDD] rounded-[10px] flex flex-col items-center justify-center absolute top-12 right-[100px]">
            <Link href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/setting`}>
                <div className="w-full flex items-center justify-center border-b border-[#DDD]">
                    <span className="font-nico-moji text-[12px] text-color-6 pb-[5px] cursor-pointer">Settings</span>
                </div>
            </Link>
            <div onClick={handleLogoutClick} className="w-full flex items-center justify-center ">
                <span className=" font-nico-moji text-[12px] text-color-6 pt-[4px] cursor-pointer">Logout</span>
            </div>
        </div>
    )
}
export { SettingsPoint }



const Progress = React.forwardRef<
    React.ElementRef<typeof ProgressPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
    <ProgressPrimitive.Root
        ref={ref}
        className={cn(
            "relative h-4 w-full overflow-hidden rounded-full bg-color-28/30 border-[0.5px] border-[#DDD]",
            className
        )}
        {...props}
    >
        <ProgressPrimitive.Indicator
            className="h-full w-full flex-1  transition-all rounded-[22px] bg-[#52768F]"
            style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
    </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
