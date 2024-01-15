import NotificationIcon from "@/components/NotificationIcon";
import ProfileHeader from "@/components/ProfileHeader";
import SearchBareHeader from "@/components/SearchHeader";


function chat() {
    return (
        <>
            <div className="w-full gap-10 max-h-screen h-screen bg-color-18 flex flex-wrap justify-center items-center relative  overflow-auto  scrollbar-hide">
                <SearchBareHeader/>
                <ProfileHeader/>
                <NotificationIcon/>
            </div>
        </>
    )
}

export default chat;