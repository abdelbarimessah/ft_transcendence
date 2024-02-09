import LeaderBoard from "@/components/profilePage/LeaderBoard";
import { MatchesHistory } from "@/components/profilePage/MatchesHistory";
import ProfileCard from "@/components/profilePage/ProfileCard";

function profile() {

    return (
        <>
            <div className="w-full gap-10 min-h-screen flex bg-color-18  items-center justify-center ">
                <div className="w-full h-full flex gap-[25px] flex-col items-center justify-center">
                    <div className="flex flex-row gap-[25px]">
                        <ProfileCard />
                        <LeaderBoard />
                    </div>
                    <div className="flex flex-row gap-[25px]">
                        <div className="h-[619px] w-[1139px] rounded-[22px] bg-color-0"></div>
                        <MatchesHistory/>   
                    </div>
                </div>
            </div>
        </>
    )
}

export default profile;