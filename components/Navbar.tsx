import Image from "next/image";
import Link from "next/link";
import Dropdown from "./DropDown";
import { useState } from "react";
import { ConnectButton } from "web3uikit";

import { useMoralis } from "react-moralis";
const Navbar = () => {
    const supportedChains = [111555111, 31337];
    const { isWeb3Enabled, chainId, user } = useMoralis();
    return (
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
                    <div className="bg-white sm:text-md sm:w-24 h-9 phone:h-11  px-2 phone:px-3 m-1 ">
                        <ConnectButton moralisAuth={false} />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
