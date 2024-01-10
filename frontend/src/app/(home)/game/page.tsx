// import ModeCard from "@/components/ModeCard";
import ModeCard from "@/components/ModeCardComponent";
import ParticleBackground from "@/components/Tsparticles";


function Home() {
    return (
        <>
            {/* <div className="bg-color-18 min-h-screen w-screen bg-cover bg-fixed flex flex-wrap justify-center overflow-x-hidden">  */}
                <div className=" w-screen min-h-screen bg-color-18 flex justify-center items-center">

                    <ParticleBackground />
                    <ModeCard />
                </div>
                {/* <SideBare/> */}   
            {/* </div> */}
        </>
    )
}

export default Home;