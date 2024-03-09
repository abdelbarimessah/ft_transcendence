"use client";

import Image from "next/image";

export default function StackItem(props: { logo: string }) {
  return (
    <div className="w-fit h-fit flex items-center justify-center p-4 flex-shrink-0">
      <Image
        alt="alt-img"
        src={`/assets/Tech_Stack/${props.logo}.png`}
        width={50}
        height={50}
        priority={true}
        className="animate-pulse"
        draggable={false}
      />
    </div>
  );
}
export function Tailwind() {
  return (
    <div className="w-fit h-fit flex items-center justify-center p-4 flex-shrink-0">
      <Image
        alt="tailwindcss"
        src={`/assets/Tech_Stack/tailwind.png`}
        width={140}
        height={50}
        priority={true}
        className="animate-pulse"
        draggable={false}
      />
    </div>
  );
}
