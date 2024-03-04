"use client";

import Image from "next/image";
import Link from "next/link";

type MemberCardProps = {
  name: string;
  login: string;
  avatar: string;
};

export default function MemberCard({ name, login, avatar }: MemberCardProps) {
  return (
    <div className="select-none flex flex-col items-center justify-evenly w-full sm:w-2/6 h-[220px] bg-color-13 rounded-[22px] py-3 border-2 border-color-27 hover:border-color-5 hover:scale-110 hover:transition-all duration-1000">
      <Image
        alt={login}
        src={avatar}
        width={90}
        height={90}
        priority={true}
        className="rounded-full border-2 border-color-6 p-1"
        draggable={false}
      />
      <p className="text-color-23 text-[20px] text-center">{name}</p>
      <h4 className="text-color-31 text-[25px]">
        @
        <span className="text-color-6 text-[20px] text-center">
          <Link href={`https://profile.intra.42.fr/users/${login}`}>
            {login}
          </Link>
        </span>
      </h4>
    </div>
  );
}
