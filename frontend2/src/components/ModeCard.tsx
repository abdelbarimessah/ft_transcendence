import {Button} from '@nextui-org/button';


function ModeCard(props: any) {
  return (
    <div className="min-h-screen max-w-5xl mx-auto place-content-center justify-center justify-items-center grid md:grid-cols-2 lg:grid-cols-3 gap-x-14 gap-y-5">
      <div className="bg-color-13 shadow-lg rounded-xl overflow-hidden max-w-xs order-first lg:order-none">
        <div>
          <img src="../../assets/cardBackground.jpeg" alt="Abstract Design" className="w-full h-40 sm:h-48 object-cover"></img>
        </div>
        <h2 className="text-white uppercase font-nico-moji text-2xl flex items-center justify-center">friend mode</h2>
        <div className=" sm:px-8 bg-color-13 rounded-xl grid grid-rows-3 grid-flow-col gap-1 ">
          <div className="rounded-full bg-color-8 h-10 w-10 flex justify-center items-center row-span-3 ml-0">
            {/* <Button>Click me</Button> */}
            <img src="../assets/Vector.svg" className="h-6 w-6 text-white m-auto" alt="Vector" />
            
          </div>
            <p className="text-white font-poppins text-base leading-5 col-span-2" >play with your</p>
            <p className="text-gray-500 leading-3 text-sm top-9 row-span-2 col-span-2" >friends</p>
            <button className=" font-poppins rounded-3xl capitalize  bg-[#17222A] pt-1 pb-1 pl-5 pr-5 text-xl font-extralight text-white " >play</button>
          {/* <ul className="flex mt-8">
          <li>
            <img src="https://images.pexels.com/photos/89790/beauty-woman-portrait-face-89790.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb" alt="Face" className="rounded-full w-10 h-10 object-cover border-2 border-white"></img>
          </li>
          <li>
            <img src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&crop=faces&fit=crop&h=200&w=200" alt="Face" className="rounded-full w-10 h-10 object-cover border-2 border-white"></img>
          </li>
          <li>
            <img src="https://images.pexels.com/photos/769772/pexels-photo-769772.jpeg?auto=compress&cs=tinysrgb&crop=faces&fit=crop&h=200&w=200" alt="Face" className="rounded-full w-10 h-10 object-cover border-2 border-white"></img>
          </li>
          <li>
            <img src="https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&crop=faces&fit=crop&h=200&w=200" alt="Face" className="rounded-full w-10 h-10 object-cover border-2 border-white"></img>
          </li>
        </ul> */}
        </div>
      </div>
      <div className="bg-white shadow-lg rounded-xl overflow-hidden max-w-xs order-3 md:row-start-1 md:col-start-2 lg:order-none">
        <div>
          <img src="https://images.pexels.com/photos/326501/pexels-photo-326501.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="Web Design" className="w-full h-40 sm:h-48 object-cover"></img>
        </div>
        <div className="py-5 px-6 sm:px-8">
          <h2 className="text-xl sm:text-2xl text-gray-800 font-semibold mb-3">Web Design</h2>
          <p className="text-gray-500 leading-relaxed">Lorem ipsum dolor sit amet, conse adipiscing elit. Phasellus enim erat, vestibulum vel.</p>

          <ul className="flex mt-8">
            <li>
              <img src="https://images.pexels.com/photos/1758845/pexels-photo-1758845.jpeg?auto=compress&cs=tinysrgb&crop=faces&fit=crop&h=200&w=200" alt="Face" className="rounded-full w-10 h-10 object-cover border-2 border-white"></img>
            </li>
            <li>
              <img src="https://images.pexels.com/photos/1832959/pexels-photo-1832959.jpeg?auto=compress&cs=tinysrgb&crop=faces&fit=crop&h=200&w=200" alt="Face" className="rounded-full w-10 h-10 object-cover border-2 border-white"></img>
            </li>
            <li>
              <img src="https://images.pexels.com/photos/38554/girl-people-landscape-sun-38554.jpeg?auto=compress&cs=tinysrgb&crop=faces&fit=crop&h=200&w=200" alt="Face" className="rounded-full w-10 h-10 object-cover border-2 border-white"></img>
            </li>
            <li>
              <img src="https://images.pexels.com/photos/412840/pexels-photo-412840.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb" alt="Face" className="rounded-full w-10 h-10 object-cover border-2 border-white"></img>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-white shadow-lg rounded-xl overflow-hidden max-w-xs order-5 lg:order-none">
        <div>
          <img src="https://images.pexels.com/photos/986733/pexels-photo-986733.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="Photography" className="w-full h-40 sm:h-48 object-cover"></img>
        </div>
        <div className="py-5 px-6 sm:px-8">
          <h2 className="text-xl sm:text-2xl text-gray-800 font-semibold mb-3">Photography</h2>
          <p className="text-gray-500 leading-relaxed">Lorem ipsum dolor sit amet, conse adipiscing elit. Phasellus enim erat, vestibulum vel.</p>

          <ul className="flex mt-8">
            <li>
              <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&crop=faces&fit=crop&h=200&w=200" alt="Face" className="rounded-full w-10 h-10 object-cover border-2 border-white"></img>
            </li>
            <li>
              <img src="https://images.pexels.com/photos/458766/pexels-photo-458766.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb" alt="Face" className="rounded-full w-10 h-10 object-cover border-2 border-white"></img>
            </li>
            <li>
              <img src="https://images.pexels.com/photos/458718/pexels-photo-458718.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb" alt="Face" className="rounded-full w-10 h-10 object-cover border-2 border-white"></img>
            </li>
            <li>
              <img src="https://images.pexels.com/photos/573299/pexels-photo-573299.jpeg?auto=compress&cs=tinysrgb&crop=faces&fit=crop&h=200&w=200" alt="Face" className="rounded-full w-10 h-10 object-cover border-2 border-white"></img>
            </li>
          </ul>
        </div>
      </div>


    </div>
  );
}

export default ModeCard;