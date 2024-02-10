import LeaderBoard from "@/components/profilePage/LeaderBoard";
import { MatchesHistory } from "@/components/profilePage/MatchesHistory";
import ProfileCard from "@/components/profilePage/ProfileCard";

function profile() {

    return (
        <>
            <div className="w-full gap-10 h-full flex bg-color-18  items-center justify-center ">
                <div className="w-full h-full flex gap-[25px] flex-col items-center justify-center">
                    <div className="w-full flex flex-row gap-[25px] items-center justify-center bg-blue-500 px-10">
                        <ProfileCard />
                        <LeaderBoard />
                    </div>
                    <div className="w-full flex flex-row gap-[25px] items-center justify-center bg-red-300 px-10">
                        <div className="h-[619px] w-[1139px] rounded-[22px] bg-color-0"></div>
                        <MatchesHistory/>   
                    </div>
                </div>
            </div>
        </>
    )
}

export default profile;