"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

type UserProps = {
  image: string;
};

const Logout = ({ image }: UserProps) => {
  return (
    <div className="flex justify-center items-center gap-4">
      <Link href={`/`}>
        <Image
          width={64}
          height={64}
          alt="profile pic"
          src={image}
          priority
          className="rounded-full"
        />
      </Link>
      <button
        className="px-4 py-2 text-[#9f404085] rounded-lg border border-[#9f404085] m-1 w-full hover:bg-[#9f404085] hover:text-[#06000a]"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Logout;
