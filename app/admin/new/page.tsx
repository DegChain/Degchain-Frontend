import Image from "next/image";
import Link from "next/link";
import {
    contractAddress as UserContractAddress,
    abi as UserABI,
} from "@/constants/UserManager/index";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { useNotification } from "web3uikit";
import React, { useState, useEffect } from "react";
import Moralis from "moralis-v1/types";
import Web3Api from "moralis-v1/types/generated/web3Api";
//I need to remove ethers from package.json

export default function New() {
    const { user, chainId: chainIdHex, isWeb3Enabled } = useMoralis();
    const chainId = parseInt(chainIdHex!);
    const UserManagerAddress =
        chainId in UserContractAddress ? UserContractAddress[chainId][0] : null;
    // Variable state for user registration
    const [DOB, setDOB] = useState("");
    const [rollNumber, setRollNumber] = useState("");
    const dispatch = useNotification();

    //Add new record
    const {
        runContractFunction: setRollNumberToDOB,
        data: setRollNumberToDOBData,
        isLoading: isSetRollNumberToDOBLoading,
        isFetching: isSetRollNumberToDOBFetching,
    } = useWeb3Contract({
        abi: UserABI,
        contractAddress: UserManagerAddress,
        functionName: "setRollNumberToDOB",
        params: { rollNumber, dateOfBirth: DOB },
    });
    async function updateUIValues() {
        try {
            const userData = await Moralis.User.current();
            const userAddress = userData?.get("ethAddress");
            // Update the corresponding state variables here
            setRollNumber(userData?.get("rollNumber"));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUIValues();
        }
    }, [isWeb3Enabled]);
    //@ts-ignore
    const handleUserRollNumberChange = (e) => {
        setRollNumber(e.target.value);
    };
    //@ts-ignore
    const handleUserDOBChange = (e) => {
        setDOB(e.target.value);
    };
    const handleNewUser = async () => {
        await setRollNumberToDOB();
    };
    return (
        <div>
            <nav
                className="flex flex-row justify-between bg-black px-2 w-full h-20 items-center fixed shadow-sm
    shadow-white"
            >
                <Link href="/admin">
                    <Image
                        src="/images/logo.png"
                        alt="logo"
                        width={65}
                        height={65}
                    />
                </Link>

                <div className="px-2 phone:px-5 flex flex-row justify-start items-center ">
                    <h1 className="text-white text-xl sm:text-3xl font-semibold px-3">
                        Make New Record
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
            >
                <div className="container p-3 h-fit w-4/5 sm:w-96 flex flex-row justify-center items-center bg-gray-800 opacity-90 text-black  rounded-xl">
                    <form className="h-full flex flex-col justify-evenly my-8 items-center gap-8">
                        <div className="w-full">
                            <label
                                htmlFor="roll no"
                                className="text-white text-left "
                            >
                                Roll No
                            </label>
                            <input
                                className="bg-gray-300 p-2 w-full text-black placeholder:text-gray-600"
                                type="text"
                                placeholder="Enter Roll No"
                                name="roll no"
                                id="roll no"
                                value={rollNumber}
                                onChange={handleUserRollNumberChange}
                            />
                        </div>
                        <div className="w-full">
                            <label
                                htmlFor="dob"
                                className="text-white text-left "
                            >
                                Date Of Birth
                            </label>
                            <input
                                className="bg-gray-300 p-2 w-full text-black placeholder:text-gray-600"
                                type="date"
                                name="dob"
                                id="dob"
                                value={DOB}
                                onChange={handleUserDOBChange}
                            />
                        </div>

                        <button
                            className="bg-white w-2/5 font-bold py-2 px-4 rounded-full text-black "
                            onClick={handleNewUser}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
