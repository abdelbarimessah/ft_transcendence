'use client'
import LeaderBoard from "@/components/profilePage/LeaderBoard";
import { MatchesHistory } from "@/components/profilePage/MatchesHistory";
import ProfileCard from "@/components/profilePage/ProfileCard";
import ParticleBackground from "@/components/particles/Tsparticles";
import Achievements from "@/components/profilePage/Achievements";
import Header from "@/components/header/header";
import FriendsList from "@/components/profilePage/FriendsList";
import { QueryClient, QueryClientProvider } from "react-query";

const friendsQueryClient = new QueryClient();

function profile() {

    return (
        // <div className=" w-full h-full bg-color-2 flex flex-col items-center justify-center">
        <div className=" select-none w-full h-full flex flex-col bg-color-18  items-center justify-center ">
            <div className="w-full z-[2000] pt-12 2xl:pt-0">
                <Header />
            </div>
            <div className='w-full h-full absolute '>
                <ParticleBackground />
            </div>
            <div className="w-full flex flex-col items-center justify-center z-[1000]  py-[25px] gap-[25px]">
                <div className="w-full flex 2xl:flex-row flex-col  gap-[25px] items-center justify-center px-[25px] ">
                    <ProfileCard />
                    <LeaderBoard />
                </div>
                <div className="w-full flex 2xl:flex-row flex-col  gap-[25px] items-center justify-center px-[25px] ">
                    <QueryClientProvider client={friendsQueryClient}>
                        <FriendsList />
                    </QueryClientProvider>
                    <Achievements />
                    <MatchesHistory />
                </div>
            </div>
        </div>
        // </div>
    )
}

export default profile;