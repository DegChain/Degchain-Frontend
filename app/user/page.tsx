import Image from "next/image";
import React from "react";
import Link from "next/link";
import {
    contractAddress as DocContractAddress,
    abi as DocManagerABI,
} from "@/constants/DocumentManager/index";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { useNotification } from "web3uikit";

export default function View() {
    return (
        <div>
            <nav
                className="flex flex-row justify-between bg-black px-2 w-full h-20 items-center fixed shadow-sm
    shadow-white"
            >
                <Link href="/user">
                    <Image
                        src="/images/logo.png"
                        alt="logo"
                        width={65}
                        height={65}
                    />
                </Link>

                <div className="px-2 phone:px-5 flex flex-row justify-start items-center">
                    <h1 className="text-white text-xl sm:text-3xl font-semibold px-3">
                        User Dashboard
                    </h1>
                </div>

                <div className="flex flex-row gap-3 items-center">
                    <Link href="/">
                        <button className="bg-white sm:text-lg sm:w-24 h-8 phone:h-10 px-2 phone:px-3 rounded-full m-1">
                            Logout
                        </button>{" "}
                    </Link>
                    <Image
                        src="/images/college.png"
                        alt="logo"
                        width={55}
                        height={55}
                    />
                </div>
            </nav>

            <div
                className="bg-cover w-full h-screen flex flex-row justify-center items-center"
                style={{ background: 'url("/images/background.png")' }}
            ></div>
        </div>
    );
}
