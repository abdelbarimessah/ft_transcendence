'use client'
import LeaderBoard from "@/components/profilePage/LeaderBoard";
import { MatchesHistory } from "@/components/profilePage/MatchesHistory";
import UsersProfileCard from "@/components/profilePage/UsersProfileCard";
import ParticleBackground from "@/components/particles/Tsparticles";
import Header from "@/components/header/header";
import UsersAchievements from "@/components/profilePage/UsersAchievements";
import { QueryClient, QueryClientProvider } from "react-query";


const MatchesHistoryClient = new QueryClient();

function profile() {
    return (
        <div className="select-none w-full h-full flex flex-col bg-color-18  items-center justify-center ">
            <div className='w-full h-full absolute '>
                <ParticleBackground />
            </div>
            <div className="w-full z-[2000] pt-12 2xl:pt-0">
                <Header />
            </div>
            <div className="w-full flex flex-col items-center justify-center z-[1000]  py-[25px] gap-[25px]">
                <div className="w-full flex 2xl:flex-row flex-col  gap-[25px] items-center justify-center px-[25px] ">
                    <UsersProfileCard />
                    <LeaderBoard />
                </div>
                <div className="w-full flex 2xl:flex-row flex-col  gap-[25px] items-center justify-center px-[25px] ">
                    <UsersAchievements />
                    {/* <QueryClientProvider client={MatchesHistoryClient}> */}
                        {/* <MatchesHistory /> */}
                    {/* </QueryClientProvider>w */}
                </div>
            </div>
        </div>
    )
}

export default profile;


// Todo complute the decline of the game invite 
// Todo fixe the issue in the invite game in the modeCard 
// Todo add the icon to the three point settings in the profile page
