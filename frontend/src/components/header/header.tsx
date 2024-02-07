import NotificationIcon from "./NotificationIcon";
import ProfileHeader from "./ProfileHeader";
import SearchBareHeader from "./SearchHeader";
import '../../../src/app/globals.css'



function Header() 
{
    return (
        <div className="w-full gap-1 h-[66px] flex justify-around items-center z-50 px-3 mt-6">
            <div className='w-7/12'>
                <SearchBareHeader/>
            </div>
            <div className=" flex gap-1 ">
                <NotificationIcon/>
                <ProfileHeader/>
            </div>
        </div>
    )
}

export default Header;
