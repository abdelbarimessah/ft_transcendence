'use client'
import { Skeleton } from '@nextui-org/react';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';


interface Achievement {
    id: number;
    name: string;
    locked: boolean;
    userId: number;
}

function Achievements() {

    const [ach1, setAch1] = useState<Achievement>();
    const [ach2, setAch2] = useState<Achievement>();
    const [ach3, setAch3] = useState<Achievement>();
    const [ach4, setAch4] = useState<Achievement>();
    const [ach5, setAch5] = useState<Achievement>();
    const [ach6, setAch6] = useState<Achievement>();
    const [ach7, setAch7] = useState<Achievement>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getAchievements = async () => {
            try {
                setIsLoading(true);
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/achievements`, {withCredentials: true});
                setAch1(res.data.achievements.find((ach: { name: string; }) => ach.name === 'ach1'))
                setAch2(res.data.achievements.find((ach: { name: string; }) => ach.name === 'ach2'));
                setAch3(res.data.achievements.find((ach: { name: string; }) => ach.name === 'ach3'));
                setAch4(res.data.achievements.find((ach: { name: string; }) => ach.name === 'ach4'));
                setAch5(res.data.achievements.find((ach: { name: string; }) => ach.name === 'ach5'));
                setAch6(res.data.achievements.find((ach: { name: string; }) => ach.name === 'ach6'));
                setAch7(res.data.achievements.find((ach: { name: string; }) => ach.name === 'ach7'));
                setIsLoading(false);
            } catch (err) {
                setIsLoading(false);
                console.error(err);
            }
        }
        getAchievements();
    }, []);


    return (

        <div className="h-[619px] 2xl:w-[557px] xl:w-[1137px] w-full bg-color-0 rounded-[22px] flex flex-col gap-[40px]">
            <div className="w-full flex items-center justify-center gap-[15px] pt-[18px]">
                <div className=' w-[25px] h-[29px] relative sm:flex hidden items-center justify-center pt-3 '>
                    <Image
                        src="/../../assets/acheivementImageIcon.svg"
                        alt='Leader Board Icon'
                        fill={true}
                        priority={true}
                        className='object-cover w-full h-full'
                        draggable={false}
                    />
                </div>
                <div className='flex gap-[10px] '>
                    <span className='font-nico-moji text-color-6 sm:text-[32px] text-[28px]'>Acheivement</span>
                </div>
            </div>
            {isLoading ? (
                <div className="flex w-full h-full items-center justify-center ">
                    <span className="font-nico-moji text-[25px] text-color-6 capitalize text-center">
                        Loading...
                    </span>
                </div>
            )
                : (
                    <div className='groupache flex flex-col gap-[20px] relative '>
                        <div className="w-full flex gap-[50px]  justify-center">
                            <div className="relative w-[97px] h-[125px] overflow-hidden   mt-[73px]  hover:scale-110">
                                <Image
                                    src="/../../assets/lockIcon.svg"
                                    alt='Leader Board Icon'
                                    height={19}
                                    width={18}
                                    priority={true}
                                    className={`${ach5?.locked ? 'hidden' : 'block'}  w-[18px] h-[19px] absolute top-[75px] z-[2000] left-1/2 transform -translate-x-1/2 -translate-y-1/2 `}
                                    draggable={false}
                                />
                                <div className='w-[58px] h-[58px] absolute z-[1000]  top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                                    <div className='relative w-[58px] h-[58px] overflow-hidden'>
                                        {ach5?.locked ?
                                            <Image
                                                src="/../../assets/ach5-st.svg"
                                                alt='Leader Board Icon'
                                                fill={true}
                                                priority={true}
                                                className='object-cover w-full h-full'
                                                draggable={false}
                                            />
                                            :
                                            <Image
                                                src="/../../assets/ach5-s.svg"
                                                alt='Leader Board Icon'
                                                fill={true}
                                                priority={true}
                                                className='object-cover w-full h-full'
                                                draggable={false}
                                            />
                                        }
                                    </div>
                                </div>
                                <div className={`relative w-full h-[97px] overflow-hidden mt-[28px] ${ach5?.locked ? '' : 'blur-[1px]'} `}>
                                    {ach5?.locked ?

                                        <Image
                                            src="/../../assets/ach5-mt.svg"
                                            alt='Leader Board Icon'
                                            fill={true}
                                            priority={true}
                                            className='object-cover w-full h-full'
                                            draggable={false}
                                        />
                                        :
                                        <Image
                                            src="/../../assets/ach5-m1.svg"
                                            alt='Leader Board Icon'
                                            fill={true}
                                            priority={true}
                                            className='object-cover w-full h-full'
                                            draggable={false}
                                        />
                                    }
                                </div>
                            </div>
                            <div className="relative w-[97px] h-[125px] overflow-hidden   hover:scale-110 ">
                                <Image
                                    src="/../../assets/lockIcon.svg"
                                    alt='Leader Board Icon'
                                    height={19}
                                    width={18}
                                    priority={true}
                                    className={`${ach6?.locked ? 'hidden' : 'block'} w-[18px] h-[19px] absolute top-[75px] z-[2000] left-1/2 transform -translate-x-1/2 -translate-y-1/2 `}
                                    draggable={false}
                                />
                                <div className='w-[58px] h-[58px] absolute z-[1000]  top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                                    <div className='relative w-[58px] h-[58px] overflow-hidden'>
                                        {ach6?.locked ?
                                            <Image
                                                src="/../../assets/ach6-st.svg"
                                                alt='Leader Board Icon'
                                                fill={true}
                                                priority={true}
                                                className='object-cover w-full h-full'
                                                draggable={false}
                                            />
                                            :
                                            <Image
                                                src="/../../assets/ach6-s.svg"
                                                alt='Leader Board Icon'
                                                fill={true}
                                                priority={true}
                                                className='object-cover w-full h-full'
                                                draggable={false}
                                            />
                                        }
                                    </div>
                                </div>
                                <div className={`relative w-full h-[97px] overflow-hidden mt-[28px] ${ach6?.locked ? '' : 'blur-[1px]'} `}>
                                    {ach6?.locked ?

                                        <Image
                                            src="/../../assets/ach6-mt.svg"
                                            alt='Leader Board Icon'
                                            fill={true}
                                            priority={true}
                                            className='object-cover w-full h-full'
                                            draggable={false}
                                        />

                                        :
                                        <Image
                                            src="/../../assets/ach6-m1.svg"
                                            alt='Leader Board Icon'
                                            fill={true}
                                            priority={true}
                                            className='object-cover w-full h-full'
                                            draggable={false}
                                        />
                                    }
                                </div>
                            </div>
                            <div className="relative w-[97px] h-[125px] overflow-hidden   mt-[73px]  hover:scale-110">
                                <Image
                                    src="/../../assets/lockIcon.svg"
                                    alt='Leader Board Icon'
                                    height={19}
                                    width={18}
                                    priority={true}
                                    className={`${ach1?.locked ? 'hidden' : 'block'} w-[18px] h-[19px] absolute top-[75px] z-[2000] left-1/2 transform -translate-x-1/2 -translate-y-1/2 `}
                                    draggable={false}
                                />
                                <div className='w-[58px] h-[58px] absolute z-[1000]  top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                                    <div className='relative w-[58px] h-[58px] overflow-hidden'>
                                        {ach1?.locked ?
                                            <Image
                                                src="/../../assets/ach1-st.svg"
                                                alt='Leader Board Icon'
                                                fill={true}
                                                priority={true}
                                                className='object-cover w-full h-full'
                                                draggable={false}
                                            />
                                            :
                                            <Image
                                                src="/../../assets/ach1-s.svg"
                                                alt='Leader Board Icon'
                                                fill={true}
                                                priority={true}
                                                className='object-cover w-full h-full'
                                                draggable={false}
                                            />
                                        }
                                    </div>
                                </div>
                                <div className={`relative w-full h-[97px] overflow-hidden mt-[28px] ${ach1?.locked ? '' : 'blur-[1px]'} `}>
                                    {ach1?.locked ?

                                        <Image
                                            src="/../../assets/ach1-mt.svg"
                                            alt='Leader Board Icon'
                                            fill={true}
                                            priority={true}
                                            className='object-cover w-full h-full'
                                            draggable={false}
                                        />

                                        :
                                        <Image
                                            src="/../../assets/ach1-m1.svg"
                                            alt='Leader Board Icon'
                                            fill={true}
                                            priority={true}
                                            className='object-cover w-full h-full'
                                            draggable={false}
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                        <div className=" w-[97px] h-[125px] overflow-hidden   absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  hover:scale-110">
                            <Image
                                src="/../../assets/lockIcon.svg"
                                alt='Leader Board Icon'
                                height={19}
                                width={18}
                                priority={true}
                                className={`${ach7?.locked ? 'hidden' : 'block'} w-[18px] h-[19px] absolute top-[75px] z-[2000] left-1/2 transform -translate-x-1/2 -translate-y-1/2 `}
                                draggable={false}
                            />
                            <div className='w-[58px] h-[58px] absolute z-[1000]  top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                                <div className='relative w-[58px] h-[58px] overflow-hidden'>
                                    {ach7?.locked ?
                                        <Image
                                            src="/../../assets/ach7-st.svg"
                                            alt='Leader Board Icon'
                                            fill={true}
                                            priority={true}
                                            className='object-cover w-full h-full'
                                            draggable={false}
                                        />
                                        :
                                        <Image
                                            src="/../../assets/ach7-s.svg"
                                            alt='Leader Board Icon'
                                            fill={true}
                                            priority={true}
                                            className='object-cover w-full h-full'
                                            draggable={false}
                                        />
                                    }
                                </div>
                            </div>
                            <div className={`relative w-full h-[97px] overflow-hidden mt-[28px] ${ach7?.locked ? '' : 'blur-[1px]'} `}>
                                {ach7?.locked ?
                                    <Image
                                        src="/../../assets/ach7-mt.svg"
                                        alt='Leader Board Icon'
                                        fill={true}
                                        priority={true}
                                        className='object-cover w-full h-full'
                                        draggable={false}
                                    />

                                    :
                                    <Image
                                        src="/../../assets/ach7-m.svg"
                                        alt='Leader Board Icon'
                                        fill={true}
                                        priority={true}
                                        className='object-cover w-full h-full'
                                        draggable={false}
                                    />
                                }
                            </div>
                        </div>
                        <div className="w-full flex gap-[50px]  justify-center ">
                            <div className="relative w-[97px] h-[125px] overflow-hidden   hover:scale-110 ">
                                <Image
                                    src="/../../assets/lockIcon.svg"
                                    alt='Leader Board Icon'
                                    height={19}
                                    width={18}
                                    priority={true}
                                    className={`${ach4?.locked ? 'hidden' : 'block'} w-[18px] h-[19px] absolute top-[75px] z-[2000] left-1/2 transform -translate-x-1/2 -translate-y-1/2 `}
                                    draggable={false}
                                />
                                <div className='w-[58px] h-[58px] absolute z-[1000]  top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                                    <div className='relative w-[58px] h-[58px] overflow-hidden'>
                                        {ach4?.locked ?
                                            <Image
                                                src="/../../assets/ach4-st.svg"
                                                alt='Leader Board Icon'
                                                fill={true}
                                                priority={true}
                                                className='object-cover w-full h-full'
                                                draggable={false}
                                            />
                                            :
                                            <Image
                                                src="/../../assets/ach4-s.svg"
                                                alt='Leader Board Icon'
                                                fill={true}
                                                priority={true}
                                                className='object-cover w-full h-full'
                                                draggable={false}
                                            />
                                        }
                                    </div>
                                </div>
                                <div className={`relative w-full h-[97px] overflow-hidden mt-[28px]  ${ach4?.locked ? '' : 'blur-[1px]'} `}>
                                    {ach4?.locked ?

                                        <Image
                                            src="/../../assets/ach4-mt.svg"
                                            alt='Leader Board Icon'
                                            fill={true}
                                            priority={true}
                                            className='object-cover w-full h-full'
                                            draggable={false}
                                        />

                                        :
                                        <Image
                                            src="/../../assets/ach4-m1.svg"
                                            alt='Leader Board Icon'
                                            fill={true}
                                            priority={true}
                                            className='object-cover w-full h-full'
                                            draggable={false}
                                        />
                                    }
                                </div>
                            </div>
                            <div className="relative w-[97px] h-[125px] overflow-hidden   hover:scale-110 mt-[73px]">
                                <Image
                                    src="/../../assets/lockIcon.svg"
                                    alt='Leader Board Icon'
                                    height={19}
                                    width={18}
                                    priority={true}
                                    className={`${ach3?.locked ? 'hidden' : 'block'} w-[18px] h-[19px] absolute top-[75px] z-[2000] left-1/2 transform -translate-x-1/2 -translate-y-1/2 `}
                                    draggable={false}
                                />
                                <div className='w-[58px] h-[58px] absolute z-[1000]  top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                                    <div className='relative w-[58px] h-[58px] overflow-hidden'>
                                        {ach3?.locked ?
                                            <Image
                                                src="/../../assets/ach3-st.svg"
                                                alt='Leader Board Icon'
                                                fill={true}
                                                priority={true}
                                                className='object-cover w-full h-full'
                                                draggable={false}
                                            />
                                            :
                                            <Image
                                                src="/../../assets/ach3-s.svg"
                                                alt='Leader Board Icon'
                                                fill={true}
                                                priority={true}
                                                className='object-cover w-full h-full'
                                                draggable={false}
                                            />
                                        }
                                    </div>
                                </div>
                                <div className={`relative w-full h-[97px] overflow-hidden mt-[28px]  ${ach3?.locked ? '' : 'blur-[1px]'} `}>
                                    {ach3?.locked ?

                                        <Image
                                            src="/../../assets/ach3-mt.svg"
                                            alt='Leader Board Icon'
                                            fill={true}
                                            priority={true}
                                            className='object-cover w-full h-full'
                                            draggable={false}
                                        />

                                        :
                                        <Image
                                            src="/../../assets/ach3-m1.svg"
                                            alt='Leader Board Icon'
                                            fill={true}
                                            priority={true}
                                            className='object-cover w-full h-full'
                                            draggable={false}
                                        />
                                    }
                                </div>
                            </div>
                            <div className="relative w-[97px] h-[125px] overflow-hidden   hover:scale-110 ">
                                <Image
                                    src="/../../assets/lockIcon.svg"
                                    alt='Leader Board Icon'
                                    height={19}
                                    width={18}
                                    priority={true}
                                    className={`${ach2?.locked ? 'hidden' : 'block'} w-[18px] h-[19px] absolute top-[75px] z-[2000] left-1/2 transform -translate-x-1/2 -translate-y-1/2 `}
                                    draggable={false}
                                />
                                <div className='w-[58px] h-[58px] absolute z-[1000]  top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                                    <div className='relative w-[58px] h-[58px] overflow-hidden'>
                                        {ach2?.locked ?
                                            <Image
                                                src="/../../assets/ach2-st.svg"
                                                alt='Leader Board Icon'
                                                fill={true}
                                                priority={true}
                                                className='object-cover w-full h-full'
                                                draggable={false}
                                            />
                                            :
                                            <Image
                                                src="/../../assets/ach2-s.svg"
                                                alt='Leader Board Icon'
                                                fill={true}
                                                priority={true}
                                                className='object-cover w-full h-full'
                                                draggable={false}
                                            />
                                        }
                                    </div>
                                </div>
                                <div className={`relative w-full h-[97px] overflow-hidden mt-[28px]  ${ach2?.locked ? '' : 'blur-[1px]'} `}>
                                    {ach2?.locked ?

                                        <Image
                                            src="/../../assets/ach2-mt.svg"
                                            alt='Leader Board Icon'
                                            fill={true}
                                            priority={true}
                                            className='object-cover w-full h-full'
                                            draggable={false}
                                        />

                                        :
                                        <Image
                                            src="/../../assets/ach2-m1.svg"
                                            alt='Leader Board Icon'
                                            fill={true}
                                            priority={true}
                                            className='object-cover w-full h-full'
                                            draggable={false}
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    )
    // }
}


export default Achievements;   