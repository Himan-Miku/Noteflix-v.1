"use client";
import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <>
      <button
        className="px-4 py-2 text-[#fff] rounded-lg border border-[#fff] m-1 w-full bg-[#9f4040ae]"
        onClick={() => signIn()}
      >
        Sign In
      </button>
    </>
  );
};

export default Login;
