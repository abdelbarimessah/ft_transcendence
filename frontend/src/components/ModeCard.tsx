import {Button} from '@nextui-org/button';
import styles from './ModeCard.module.css'


function ModeCard(props: any) {
  return (
    <>
    {/* <p className=>hhh</p> */}
    {/* <div className="min-h-screen max-w-5xl mx-auto place-content-center justify-center justify-items-center grid md:grid-cols-2 lg:grid-cols-3 gap-x-14 gap-y-5"> */}
      <div className="flex flex-wrap justify-around">
      
      
      
      
      
    <div className={`${styles.playCardButton } cursor-pointer bg-color-13 ml-10 mr-10 rounded-3xl h-full max-w-xs order-first w-80 opacity-1 transition-opacity duration-100 ease-in-out hover:opacity-90 mt-10`} >
        <div>
          <img src="../../assets/cardBackground.jpeg" alt="Abstract Design" className="w-full sm:h-80 object-cover rounded-t-3xl"></img>
        </div>
        <div className='bg-color-13 rounded-3xl h-32 mt-2 '>
          <h2 className={`${styles.NicoM } text-white uppercase font-nico-moji text-2xl flex items-center justify-center`}>friend mode</h2>
          <div className=" ml-7 mt-6 flex flex-wrap">
            <div className="rounded-3xl bg-color-8 h-10 w-10 flex justify-center items-center mb-4">
              <img src="../assets/Vector.svg" className="h-6 w-6 text-white m-auto" alt="Vector" />     
            </div>
            <div className='ml-1 mt-1'>
              <p className="text-white font-poppins text-base leading-5 " >play with your</p>
              <p className="text-gray-500 leading-3 text-sm " >friends</p>
            </div>
            <button className={`${styles.playCardButton } font-poppins rounded-3xl capitalize bg-[#17222A] pl-6 pr-6 text-lg font-extralight text-white ml-9 mb-4 `} >play</button>
          </div>
        </div>
      </div>

    <div className={`${styles.playCardButton } cursor-pointer bg-color-13 ml-10 mr-10 rounded-3xl h-full max-w-xs order-first w-80 opacity-1 transition-opacity duration-100 ease-in-out hover:opacity-90 mt-10`} >
        <div>
          <img src="../../assets/cardBackground.jpeg" alt="Abstract Design" className="w-full sm:h-80 object-cover rounded-t-3xl"></img>
        </div>
        <div className='bg-color-13 rounded-3xl h-32 mt-2 '>
          <h2 className={`${styles.NicoM } text-white uppercase font-nico-moji text-2xl flex items-center justify-center`}>friend mode</h2>
          <div className=" ml-7 mt-6 flex flex-wrap">
            <div className="rounded-3xl bg-color-8 h-10 w-10 flex justify-center items-center mb-4">
              <img src="../assets/Vector.svg" className="h-6 w-6 text-white m-auto" alt="Vector" />     
            </div>
            <div className='ml-1 mt-1'>
              <p className="text-white font-poppins text-base leading-5 " >play with your</p>
              <p className="text-gray-500 leading-3 text-sm " >friends</p>
            </div>
            <button className={`${styles.playCardButton } font-poppins rounded-3xl capitalize bg-[#17222A] pl-6 pr-6 text-lg font-extralight text-white ml-9 mb-4 `} >play</button>
          </div>
        </div>
      </div>

      <div className={`${styles.playCardButton } cursor-pointer bg-color-13 ml-10mr-10 rounded-3xl h-full max-w-xs order-first w-80 opacity-1 transition-opacity duration-100 ease-in-out hover:opacity-90 mt-10`} >
        <div>
          <img src="../../assets/cardBackground.jpeg" alt="Abstract Design" className="w-full sm:h-80 object-cover rounded-t-3xl"></img>
        </div>
        <div className='bg-color-13 rounded-3xl h-32 mt-2 '>
          <h2 className={`${styles.NicoM } text-white uppercase font-nico-moji text-2xl flex items-center justify-center`}>friend mode</h2>
          <div className=" ml-7 mt-6 flex flex-wrap">
            <div className="rounded-3xl bg-color-8 h-10 w-10 flex justify-center items-center mb-4">
              <img src="../assets/Vector.svg" className="h-6 w-6 text-white m-auto" alt="Vector" />     
            </div>
            <div className='ml-1 mt-1'>
              <p className="text-white font-poppins text-base leading-5 " >play with your</p>
              <p className="text-gray-500 leading-3 text-sm " >friends</p>
            </div>
            <button className={`${styles.playCardButton } font-poppins rounded-3xl capitalize bg-[#17222A] pl-6 pr-6 text-lg font-extralight text-white ml-9 mb-4 `} >play</button>
          </div>
        </div>
      </div>










    </div>
    </>
  );
}

export default ModeCard;