import Header from "@/components/header/header";
import ProfileCard from "@/components/profilePage/ProfileCard";

function profile() {

    return (
        <>
            <div className="w-full gap-10 min-h-screen flex bg-color-18  items-center justify-center ">
                <div className="w-full h-full flex  items-center justify-center">
                    <div className="flex flex-col ">
                        <ProfileCard />
                        <div className="h-[619px] w-[1139px] bg-color-0 rounded-[22px] mr-[22px] my-[22px]"></div>
                    </div>
                    <div className="h-[1030px] w-[596px] bg-color-0 rounded-[22px] mr-[22px] my-[22px]"></div>
                </div>
            </div>
        </>
    )
}

export default profile;