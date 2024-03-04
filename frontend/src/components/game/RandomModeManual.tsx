import Image from "next/image";


const RandomModeManual = () => {
  return (
    <div className=" select-none flex bg-color-6 rounded-[10px] gap-[10px] w-full h-full flex-col py-2 ">
      <div className="flex w-full  items-center justify-center ">
        <span className="text-color-0">RANDOM MODE MANUAL</span>
      </div>
      <div className=" flex items-center flex-col justify-center px-1  w-full gap-1">
        <div className="flex items-center justify-start w-full h-[50px] gap-3 bg-color-30 rounded-[10px] px-2">
          <div className='rounded-full bg-color-6 h-[30px] w-[30px] flex justify-center items-center'>
            <div className='flex items-center justify-center h-[15px] w-[15px] object-cover relative'>
              <Image
                src="../assets/randomModeIconCercl.svg"
                alt="randomModeIconCercl"
                fill={true}
                priority={true}
                sizes='(min-width: 480px) 445px, calc(90.63vw + 28px)'
                draggable={false}
              >
              </Image>
            </div>
          </div>
          <span className="text-[12px] text-color-31">If You leave the game tab you lose!</span>
        </div>
        <div className="flex items-center justify-start w-full h-[50px] gap-3 bg-color-30 rounded-[10px] px-2">
          <div className='rounded-full bg-color-6 h-[30px] w-[30px] flex justify-center items-center'>
            <div className='flex items-center justify-center h-[15px] w-[15px] object-cover relative'>
              <Image
                src="../assets/randomModeIconCercl.svg"
                alt="randomModeIconCercl"
                fill={true}
                priority={true}
                sizes='(min-width: 480px) 445px, calc(90.63vw + 28px)'
                draggable={false}
              >
              </Image>
            </div>
          </div>
          <span className=" text-[12px] text-color-31">
            You use <span className="font-semibold">arrows</span> to play.{" "}
            <span role="img" aria-label="Arrow keys">
              ⬆️ ⬇️
            </span>
          </span>
        </div>
        <div className="flex items-center justify-start w-full h-[50px] gap-3 bg-color-30 rounded-[10px] px-2">
          <div className='rounded-full bg-color-6 h-[30px] w-[30px] flex justify-center items-center'>
            <div className='flex items-center justify-center h-[15px] w-[15px] object-cover relative'>
              <Image
                src="../assets/randomModeIconCercl.svg"
                alt="randomModeIconCercl"
                fill={true}
                priority={true}
                sizes='(min-width: 480px) 445px, calc(90.63vw + 28px)'
                draggable={false}
              >
              </Image>
            </div>
          </div>
          <span className="text-[12px] text-color-31"> You win when you reach{" "}
            <span className="font-semibold">5 points</span></span>
        </div>
        <div className="flex items-center justify-start w-full h-[50px] gap-3 bg-color-30 rounded-[10px] px-2">
          <div className='rounded-full bg-color-6 h-[30px] w-[30px] flex justify-center items-center'>
            <div className='flex items-center justify-center h-[15px] w-[15px] object-cover relative'>
              <Image
                src="../assets/randomModeIconCercl.svg"
                alt="randomModeIconCercl"
                fill={true}
                priority={true}
                sizes='(min-width: 480px) 445px, calc(90.63vw + 28px)'
                draggable={false}
              >
              </Image>
            </div>
          </div>
          <span className="text-[12px] text-color-31">The game start after 3 seconds</span>
        </div>

      </div>
    </div>
  );
};

export default RandomModeManual;
0