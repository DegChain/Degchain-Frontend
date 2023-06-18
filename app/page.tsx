"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ConnectButton } from "@web3uikit/web3";
import { useMoralis, MoralisProvider } from "react-moralis";
const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className="dropdown relative inline-block">
            <button
                className="dropbtn bg-white text-black text-lg px-4 py-2 "
                onClick={toggleDropdown}
            >
                Options
            </button>
            {isOpen && (
                <div className="dropdown-content absolute mt-2 bg-white rounded-md shadow-lg ">
                    <Link href="/register">
                        <button className="bg-white sm:text-lg sm:w-24 h-8 phone:h-10 px-2 phone:px-3 rounded-full m-1 ">
                            Register
                        </button>
                    </Link>
                    <hr className="bg-black " />
                    <Link href="/login">
                        <button className="bg-white sm:text-lg sm:w-24 h-8 phone:h-10 px-2 phone:px-3 rounded-full m-1 ">
                            Login
                        </button>
                    </Link>
                    <hr className="bg-black " />
                    <div className="bg-white sm:text-md sm:w-24 h-9 phone:h-11  px-2 phone:px-3 rounded-full m-1 ">
                        <ConnectButton moralisAuth={false} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default function Home() {
    // const { enableWeb3 } = useMoralis();
    return (
        <main>
            <nav className="flex flex-row justify-between bg-black px-4 w-full h-20 items-center fixed shadow-sm shadow-white">
                <Link href="/">
                    <div className="px-2 phone:px-5 flex flex-row justify-start items-center">
                        <Image
                            src="/images/logo.png"
                            alt="logo"
                            width={65}
                            height={65}
                        />
                        <h1 className="text-white text-xl sm:text-3xl font-semibold px-3">
                            DegChain
                        </h1>
                    </div>
                </Link>

                <div className="flex flex-row justify-evenly basis-1/4">
                    <div className="sm:hidden">
                        <Dropdown />
                    </div>
                    <div className="hidden sm:flex sm:flex-row">
                        <Link href="/register">
                            <button className="bg-white sm:text-lg sm:w-24 h-8 phone:h-10 px-2 phone:px-3 rounded-full m-1">
                                Register
                            </button>
                        </Link>
                        <Link href="/login">
                            <button className="bg-white sm:text-lg sm:w-24 h-8 phone:h-10 px-2 phone:px-3 rounded-full m-1">
                                Login
                            </button>
                        </Link>
                        <div className="bg-white sm:text-md sm:w-24 h-9 phone:h-11  px-2 phone:px-3 rounded-full m-1 ">
                            <ConnectButton moralisAuth={false} />
                        </div>
                    </div>
                </div>
            </nav>

            <div
                className="flex items-center  bg-cover  w-full h-screen bg-center bg-no-repeat bg-local 
      text-white   pl-4 capitalize font-bold "
                style={{ backgroundImage: 'url("/images/background.png")' }}
            >
                <p className="max-w-lg   sm:max-w-xl lg:max-w-2xl pl-2 phone:pl-12 text-3xl phone:text-4xl sm:text-5xl lg:text-6xl ">
                    Intuitive Blockchain powered Document management system
                </p>
            </div>

            <div className="h-98 bg-black rounded-t-3xl mt-2">
                <h2 className="text-white  text-center pt-10 text-2xl font-medium px-10">
                    The Document Management Systems Infrastructure:
                </h2>
                <div className="flex flex-row flex-wrap justify-around gap-4 items-start py-10 px-5 sm:px-10 ">
                    <div className="flex flex-col basis-1/3 md:basis-1/5 items-center text-center gap-2  ">
                        <Image
                            src="/images/image1.png"
                            alt=""
                            width={200}
                            height={200}
                        />
                        <p className="text-white font-medium">
                            Web UI for administrators
                        </p>
                    </div>
                    <div className="flex flex-col basis-1/3 md:basis-1/5 items-center text-center gap-2 ">
                        <Image
                            src="/images/image2.png"
                            alt=""
                            width={150}
                            height={200}
                        />
                        <p className="text-white font-medium">Database</p>
                    </div>
                    {/*<div className='flex flex-col basis-1/3 md:basis-1/5 items-center text-center gap-2 '>
            <Image src="/images/image3.png" alt="" width={200} height={200} />
            <p className='text-white font-medium'>Secure API gateway for data access</p>
  </div>*/}
                    <div className="flex flex-col basis-1/3 md:basis-1/5 items-center text-center gap-2 ">
                        <Image
                            src="/images/image4.png"
                            alt=""
                            width={200}
                            height={200}
                        />
                        <p className="text-white font-medium ">
                            User interface for document storage and access
                        </p>
                    </div>
                </div>
            </div>

            <div className="h-98 bg-white ">
                <h2 className="text-black text-center pt-10 text-2xl font-medium">
                    DegChains Features:
                </h2>
                <div className="flex flex-row flex-wrap justify-around gap-4 items-start py-10 px-5 sm:px-10 ">
                    <div className="flex flex-col basis-1/3 md:basis-1/5  items-center text-center gap-2">
                        <Image
                            src="/images/feature1.png"
                            alt=""
                            width={60}
                            height={60}
                            className="justify-start"
                        />
                        <p className="text-black">System instance setup</p>
                    </div>
                    <div className="flex flex-col basis-1/3 md:basis-1/5  items-center text-center gap-2">
                        <Image
                            src="/images/feature2.png"
                            alt=""
                            width={60}
                            height={60}
                            className="justify-start"
                        />
                        <p className="text-black">
                            Dedicated accounts and login for admins and users
                        </p>
                    </div>
                    <div className="flex flex-col basis-1/3 md:basis-1/5  items-center text-center gap-2">
                        <Image
                            src="/images/feature3.png"
                            alt=""
                            width={60}
                            height={60}
                        />
                        <p className="text-black">
                            Invite, manage, and remove users
                        </p>
                    </div>
                    <div className="flex flex-col basis-1/3 md:basis-1/5  items-center text-center gap-2">
                        <Image
                            src="/images/feature4.png"
                            alt=""
                            width={60}
                            height={60}
                        />
                        <p className="text-black ">
                            Gateways with traffic certification support and
                            blockchain data confirmation
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-stone-400 w-full ">
                <h1>Start</h1>
                <div className="bg-grey">1</div>
            </div>

            <div className="bg-black w-full h-98 text-white p-8">
                <h1>Contact Us</h1>
                <form action="">
                    <label htmlFor="name">Name</label>
                    <input type="text" placeholder="" name="name" />

                    <label htmlFor="phoneno">Phone Number</label>
                    <input type="text" placeholder="" name="phoneNo" />

                    <label htmlFor="email">Email</label>
                    <input type="text" placeholder="" name="email" />

                    <label htmlFor="message">Message</label>
                    <input type="textarea" placeholder="" name="message" />
                    <button className="bg-white text-black">Go </button>
                </form>
            </div>
            <Link href="/admin">Admin</Link>
        </main>
    );
}
