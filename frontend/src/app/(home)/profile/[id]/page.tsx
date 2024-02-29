import LeaderBoard from "@/components/profilePage/LeaderBoard";
import { MatchesHistory } from "@/components/profilePage/MatchesHistory";
import UsersProfileCard from "@/components/profilePage/UsersProfileCard";
import ParticleBackground from "@/components/particles/Tsparticles";
import Achievements from "@/components/profilePage/Achievements";
import Header from "@/components/header/header";
import FriendsList from "@/components/profilePage/FriendsList";
import UsersAchievements from "@/components/profilePage/UsersAchievements";

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
                    <MatchesHistory />
                </div>
            </div>
        </div>
    )
}

export default profile;


// Todo limit the lenght of the nickName firsName lastName in each display of them  ++
// Todo add the socket when the user change some info (avatar/cover && names) ++
// Todo change the random mode card (100 player online ) ++
// Todo complute the decline of the game invite  
// Todo add the invite to play in the page of other users
// Todo add the message button in the profile of other users
// Todo make solution for the invite of the game in the modeCard