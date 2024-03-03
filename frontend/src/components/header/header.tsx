import NotificationIcon from "./NotificationIcon";
import ProfileHeader from "./ProfileHeader";
import SearchBareHeader from "./SearchHeader";
import '../../../src/app/globals.css'
import { QueryClient, QueryClientProvider } from "react-query";

const notificiationQueryClient = new QueryClient();


function Header() {
    return (
        <div className="w-full gap-1 h-[66px] flex justify-between px-[25px] xl:px-[25px] 2xl:px-40 items-center z-50 ">
            <div className='w-7/12'>
                <SearchBareHeader />
            </div>
            <div className=" flex gap-1 ">
                <QueryClientProvider client={notificiationQueryClient}>
                    <NotificationIcon />
                </QueryClientProvider>
                <ProfileHeader />
            </div>
        </div>
    )
}

export default Header;
