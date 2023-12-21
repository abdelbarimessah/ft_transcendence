import ModeCard from "@/components/ModeCard";
import { useEffect } from "react";

function Home() {
    // useEffect(() => {
    //     Socket.on("connect", (uid) => {
    //     //  =  console.log("Connected to server with uid: " + uid);
    //     Router.push("/game/match/" + uid);
    //     }
    // }, []);
    return (
        <>
            <head>
                <title>Game Mode</title>
            </head>
            <body>
                <div className="bg-color-6 h-screen w-screen bg-cover bg-fixed flex justify-center items-center"> 
                    <ModeCard />    
                </div>
            </body>
        </>
    )
}

export default Home;