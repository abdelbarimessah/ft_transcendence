import Image from "next/image";
import FriendCard from "./FriendCard";
const backendUrl = process.env.BACKEND_URL || "http://localhost:3000";
const friend1 = {
  id: 1,
  nickname: "abziouzi",
  firstName: "Abdel Hamid",
  lastName: "Ziouziou",
  avatar:
    "https://cdn.intra.42.fr/users/9e1ca2e516ae09da7301b880ee3d7edc/abziouzi.jpg",
  cover: `${backendUrl}/uploads/DefaultCover.svg`,
};

function FriendsList() {
  return (
    <div className="h-[619px] 2xl:w-[557px] xl:w-[1137px] w-full bg-color-0 rounded-[22px] flex flex-col gap-[40px]">
      <div className="w-full flex items-center justify-center gap-[15px] pt-[18px]">
        <div className=" w-[37px] h-[28px] relative sm:flex hidden items-center justify-center pt-3 ">
          <Image
            src="/../../assets/MatchHistoryIcon.svg"
            alt="Leader Board Icon"
            fill={true}
            priority={true}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex gap-[10px] ">
          <span className="font-nico-moji text-color-6 sm:text-[32px] text-[28px]">
            Friends
          </span>
        </div>
      </div>

      <div className="w-full flex items-center justify-center ">
        <div className=" w-[200px] h-[200px] bg-color-30 rounded-[22px] relative overflow-hidden flex  flex-col gap-[40px] hover:opacity-90 hover:scale-[1.01]">
          <div className="w-full h-[69px] relative overflow-hidden ">
            <Image
              src="/../../assets/DefaultCover.svg"
              alt="Leader Board Icon"
              fill={true}
              priority={true}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="w-full flex items-center justify-center absolute top-[35px]">
            <div className="w-[70px] h-[70px] rounded-full relative border border-color-0 overflow-hidden cursor-pointer">
              <Image
                src="/../../assets/ProfileHeaderImage.svg"
                alt="Leader Board Icon"
                fill={true}
                priority={true}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <div className="w-full flex gap-[10px] flex-col">
            <div className="w-full flex flex-col items-center justify-center">
              <span className="font-nico-moji text-[14px] text-color-6">
                Abdelbari Messah
              </span>
              <span className="-mt-1 font-nico-moji text-[13px] text-color-29">
                Amessah
              </span>
            </div>
            <div className="w-full flex items-center justify-center gap-[18px]">
              <div className="w-[80px] h-[28px] bg-color-6 rounded-[10px] cursor-pointer flex items-center justify-center gap-[5px]">
                <div className="w-[12px] h-[12px] relative overflow-hidden ">
                  <Image
                    src="/../../assets/playWithIcon.svg"
                    alt="Leader Board Icon"
                    fill={true}
                    priority={true}
                    className="object-cover w-full h-full"
                  />
                </div>
                <span className="font-nico-moji text-[8px] text-color-0">
                  Play With
                </span>
              </div>
              <div className="w-[80px] h-[28px] bg-color-6 rounded-[10px] cursor-pointer flex items-center justify-center gap-[5px]">
                <div className="w-[12px] h-[12px] relative overflow-hidden ">
                  <Image
                    src="/../../assets/sendMessageIcon.svg"
                    alt="Leader Board Icon"
                    fill={true}
                    priority={true}
                    className="object-cover w-full h-full"
                  />
                </div>
                <span className="font-nico-moji text-[8px] text-color-0">
                  Message
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FriendCard friend={friend1} />
    </div>
  );
}

export default FriendsList;
