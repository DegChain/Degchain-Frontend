import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function Upload() {
  return (
    <div>
      <nav className='flex flex-row justify-between bg-black px-4 w-full h-20 items-center fixed shadow-sm
    shadow-white'>

        <Link href="/admin">
          <Image src="/images/logo.png" alt="logo" width={65} height={65} />
        </Link>
        
        <div className='px-2 phone:px-5 flex flex-row justify-start items-center'>
          <h1 className='text-white text-xl sm:text-3xl font-semibold px-3'>Upload Files</h1>
        </div>

        <Image src="/images/college.png" alt="logo" width={55} height={55} />

      </nav>
      <div
        className="bg-cover w-full h-screen flex flex-row justify-center items-center"
        style={{ background: 'url("/images/background.png")' }}
      >

        <div className="container w-96 h-96 bg-gray-800 opacity-90 text-black flex 
      flex-col item-center gap-5 rounded-xl">

          <h1>upload</h1>

        </div>
      </div>
    </div>

  )
}
