import LeaderBoard from "@/components/profilePage/LeaderBoard";
import { MatchesHistory } from "@/components/profilePage/MatchesHistory";
import ProfileCard from "@/components/profilePage/ProfileCard";
import ParticleBackground from "@/components/particles/Tsparticles";
import Achievements from "@/components/profilePage/Achievements";
import Header from "@/components/header/header";
import FriendsList from "@/components/profilePage/FriendsList";

function profile() {

    return (
        <div className="w-full h-full flex flex-col bg-color-18  items-center justify-center ">
                <div className="w-full z-[1000]">
                    <Header/>
                </div>
                <div className='w-full h-full absolute '>
                    <ParticleBackground />
                </div>
                <div className="w-full flex flex-col items-center justify-center z-[1000]  pb-[25px]">
                    <div className="w-full flex 2xl:flex-row flex-col  gap-[25px] items-center justify-center px-[25px] pt-[25px]">
                        <ProfileCard />
                        <LeaderBoard />
                    </div>
                    <div className="w-full flex 2xl:flex-row flex-col  gap-[25px] items-center justify-center ">
                        <Achievements />
                        <MatchesHistory/>
                    </div>
                </div>
            </div>
    )
}

export default profile;