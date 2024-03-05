"use client";
import LeaderBoard from "@/components/profilePage/LeaderBoard";
import { MatchesHistory } from "@/components/profilePage/MatchesHistory";
import UsersProfileCard from "@/components/profilePage/UsersProfileCard";
import ParticleBackground from "@/components/particles/Tsparticles";
import Header from "@/components/header/header";
import UsersAchievements from "@/components/profilePage/UsersAchievements";
import { QueryClient, QueryClientProvider } from "react-query";

const MatchesHistoryClient = new QueryClient();

function profile() {
  return (
    <div className="select-none w-full h-full flex flex-col bg-color-18  items-center justify-center ">
      <div className="w-full h-full absolute ">
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
          <QueryClientProvider client={MatchesHistoryClient}>
            <MatchesHistory />
          </QueryClientProvider>
        </div>
      </div>
    </div>
  );
}

export default profile;

// Todo limit the lenght of the nickName firsName lastName in each display of them  ++
// Todo add the socket when the user change some info (avatar/cover && names) ++
// Todo change the random mode card (100 player online ) ++
// Todo add the invite to play in the page of other users  ++
// Todo make solution for the invite of the game in the modeCard ++
// TODO visite my profile from leaderBoard ++
// Todo fixe the error in the ai mode (the game doesnt finish) ++
// Todo make the add/remove friend real time ++
// Todo add the responsive to the search result modale  ++
// Todo add the channels property design/UI ++
// Todo make the front of the channels modal
// Todo add the responsive to the friend list modale in the modeCard
// Todo complute the decline of the game invite
// Todo fixe the issue in the invite game in the modeCard
// Todo change some color in the landing page
