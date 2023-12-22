import ModeCard from "@/components/ModeCard";


function Home() {
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