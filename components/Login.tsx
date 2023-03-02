"use client"
import { signIn } from "next-auth/react"

const Login = () => {
  return (
    <>
      <button
        className="px-4 py-2 text-[#9f4040ae] rounded-lg border border-[#9f4040ae] m-1 w-full hover:bg-[#9f4040ae] hover:text-[#06000a]"
        onClick={() => signIn()}
      >
        Sign In
      </button>
    </>
  )
}

export default Login