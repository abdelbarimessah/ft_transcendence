
import Image from 'next/image';


export default function LeaderBoard() {

    return (
        <div className="w-[596px] h-[386px] rounded-[22px] bg-color-0 overflow-hidden flex flex-col gap-[40px]">
            <div className="w-full flex items-center justify-center gap-[15px] pt-[18px]">
                <div className=' w-[37px] h-[37px] relative flex items-center justify-center  '>
                    <Image
                        src="/../../assets/LeaderboardIcon.svg"
                        alt='Leader Board Icon'
                        fill={true}
                        priority={true}
                        className='object-cover w-full h-full'
                    />
                </div>
                <div className='flex gap-[10px] pt-3'>
                    <span className='font-nico-moji text-color-6 text-[32px] '>Leader</span>
                    <span className='font-nico-moji text-color-29 text-[32px] '>Board</span>
                </div>
            </div>
            <div className=' w-full gap-[25px] flex flex-col '>
                <div className=' w-full flex gap-[35px]  items-center justify-center '>
                    <div className='w-[69px] h-[59px] relative'>
                        <Image
                            src="/../../assets/FirstPlace.svg"
                            alt='First Place Icon'
                            fill={true}
                            priority={true}
                            className='object-cover w-full h-full '
                        />
                        <span className='font-nico-moji text-[32px] text-[#F6CB61] absolute top-[20px] left-[35px] transform -translate-x-1/2 -translate-y-1/2 '>1</span>
                    </div>
                    <div className='w-[345px] h-[58px] cursor-pointer bg-color-30 rounded-[209px] flex items-center justify-between pr-[5px] pl-[15px]' >
                        <div className='flex flex-col'>
                            <span className='font-nico-moji text-[14px] text-color-6'>Abdelbari Messah</span>
                            <span className='font-nico-moji text-[12px] text-color-29'>LEVEl 2</span>
                        </div>
                        <div className='w-[48px] h-[48px] rounded-full bg-color-28 relative overflow-hidden'>
                            <Image
                                src="/../../assets/ProfileHeaderImage.svg"
                                alt='First Place Icon'
                                fill={true}
                                priority={true}
                                className='object-cover w-full h-full ' />
                        </div>
                    </div>
                </div>
                <div className=' w-full flex gap-[35px] items-center justify-center '>
                    <div className='w-[69px] h-[59px] relative'>
                        <Image
                            src="/../../assets/Secondplace.svg"
                            alt='First Place Icon'
                            fill={true}
                            priority={true}
                            className='object-cover w-full h-full '
                        />
                        <span className='font-nico-moji text-[32px] text-[#BDBDBD] absolute top-[20px] left-[35px] transform -translate-x-1/2 -translate-y-1/2 '>2</span>
                    </div>
                    <div className='w-[345px] h-[58px]'>
                        <div className='w-[290px] h-[58px] cursor-pointer bg-color-30 rounded-[209px] flex items-center justify-between pr-[5px] pl-[15px]' >
                            <div className='flex flex-col'>
                                <span className='font-nico-moji text-[14px] text-color-6'>Abdelbari Messah</span>
                                <span className='font-nico-moji text-[12px] text-color-29'>LEVEl 2</span>
                            </div>
                            <div className='w-[48px] h-[48px] rounded-full bg-color-28 relative overflow-hidden' >
                                <Image
                                    src="/../../assets/ProfileHeaderImage.svg"
                                    alt='First Place Icon'
                                    fill={true}
                                    priority={true}
                                    className='object-cover w-full h-full ' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className=' w-full flex gap-[35px] items-center justify-center '>
                    <div className='w-[69px] h-[59px] relative'>
                        <Image
                            src="/../../assets/thirdPlace.svg"
                            alt='First Place Icon'
                            fill={true}
                            priority={true}
                            className='object-cover w-full h-full '
                        />
                        <span className='font-nico-moji text-[32px] text-[#D7936C] absolute top-[20px] left-[35px] transform -translate-x-1/2 -translate-y-1/2 '>3</span>
                    </div>
                    <div className='w-[345px] h-[58px]'>
                        <div className='w-[235px] h-[58px] cursor-pointer bg-color-30 rounded-[209px] flex items-center justify-between pr-[5px] pl-[15px]' >
                            <div className='flex flex-col'>
                                <span className='font-nico-moji text-[14px] text-color-6'>Abdelbari Messah</span>
                                <span className='font-nico-moji text-[12px] text-color-29'>LEVEl 2</span>
                            </div>
                            <div className='w-[48px] h-[48px] rounded-full bg-color-28 relative overflow-hidden'>
                                <Image
                                    src="/../../assets/ProfileHeaderImage.svg"
                                    alt='First Place Icon'
                                    fill={true}
                                    priority={true}
                                    className='object-cover w-full h-full ' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}