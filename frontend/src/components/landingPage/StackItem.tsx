"use client";

import Image from "next/image";

export default function StackItem(props: { logo: string }) {
  return (
    <div className="w-fit h-fit flex items-center justify-center p-4 flex-shrink-0">
      <Image
        alt={`${props.logo}`}
        src={`/assets/Tech_Stack/${props.logo}.png`}
        width={50}
        height={50}
        priority={true}
        className="animate-pulse"
      />
    </div>
  );
}
export  function Tailwind() {
  return (
    <div className="w-fit h-fit flex items-center justify-center p-4 flex-shrink-0">
      <Image
        alt='tailwindcss'
        src={`/assets/Tech_Stack/tailwind.png`}
        width={140}
        height={50}
        priority={true}
        className="animate-pulse"
      />
    </div>
  );
}
// "use client";

// import Image from "next/image";

// export default function StackItem(props: { logo: string }) {
//   return (
//     <div className="w-fit h-fit flex items-center justify-center p-4 flex-shrink-0">
//       <Image
//         alt={`${props.logo}`}
//         src={`/assets/Tech_Stack/${props.logo}.png`}
//         width={`${props.logo === "tailwind" ? "140" : "50"}`}
//         height={50}
//         priority={true}
//         className="animate-pulse"
//       />
//     </div>
//   );
// }
