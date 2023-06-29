import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import {
    contractAddress as UserContractAddress,
    abi as UserABI,
} from "@/constants/UserManager/index";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { useNotification } from "web3uikit";

export default function Register() {
    const { Moralis, isWeb3Enabled, chainId: chainIdHex } = useMoralis();
    const chainId = parseInt(chainIdHex!);
    console.log(`ChainId is ${chainId}`);
    const UserManagerAddress =
        chainId in UserContractAddress ? UserContractAddress[chainId][0] : null;

    // Variable state for user registration
    const [DOB, setDOB] = useState("");
    const [rollNumber, setRollNumber] = useState("");
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [user_, setuser] = useState(true);
    const [admin, setadmin] = useState(false);
    const dispatch = useNotification();

    function handleUser() {
        setuser(true);
        setadmin(false);
    }

    function handleAdmin() {
        setadmin(true);
        setuser(false);
    }

    // Register User
    const {
        runContractFunction: registerUser,
        data: enterTxRespone,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: UserABI,
        contractAddress: UserManagerAddress,
        functionName: "registerUser",
        params: { DOB, rollNumber },
    });

    // Register Admin
    const {
        runContractFunction: registerAdmin,
        data: registerAdminResponse,
        isLoading: isRegisterAdminLoading,
        isFetching: isRegisterAdminFetching,
    } = useWeb3Contract({
        abi: UserABI,
        contractAddress: UserManagerAddress,
        functionName: "registerAdmin",
        params: { emailId, password },
    });

    async function updateUIValues() {
        try {
            const userData = await Moralis.User.current();
            const userAddress = userData?.get("ethAddress");
            // Update the corresponding state variables here
            setRollNumber(userData?.get("rollNumber"));
            setEmailId(userData?.get("emailId"));
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

    const handleUserSignUp = async () => {
        await registerUser();
    };

    const handleAdminSignUp = async () => {
        await registerAdmin();
    };

    const handleNewNotification = () => {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Transaction Notification",
            position: "topR",
            //@ts-ignore
            icon: "bell",
        });
    };
    //@ts-ignore
    const handleSuccess = async (tx) => {
        try {
            await tx.wait(1);
            updateUIValues();
            //@ts-ignore
            handleNewNotification(tx);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div
            className="bg-cover w-full h-screen text-white flex flex-col items-center"
            style={{ background: 'url("/images/background.png")' }}
        >
            <div className="relative w-full px-4">
                <div className="absolute top-2 right-1">
                    <Button />
                </div>
                <Link href="/">
                    <div className="flex flex-col items-center p-3 gap-1">
                        <Image
                            src="/images/logo.png"
                            alt="logo"
                            width={65}
                            height={65}
                        />
                        <h1 className="text-white text-2xl sm:text-3xl font-semibold px-3">
                            DegChain
                        </h1>
                    </div>
                </Link>
            </div>

            <div className="container p-2 h-fit w-4/5 sm:w-96 bg-gray-800 opacity-90 text-black flex flex-col item-center gap-2 phone:gap-3 rounded-xl">
                <h1 className="text-white font-bold text-xl sm:text-2xl text-center">
                    Sign Up
                </h1>

                <hr className="text-white w-full  " />

                <div className="flex flex-row justify-evenly text-white  font-bold text-xl sm:text-2xl text-center">
                    <button
                        className="w-full h-fit rounded-md"
                        style={{
                            backgroundColor: user_ ? "white" : "black",
                            color: user_ ? "black" : "white",
                        }}
                        onClick={handleUser}
                    >
                        User
                    </button>
                    <button
                        className="w-full h-fit rounded-md"
                        style={{
                            backgroundColor: admin ? "white" : "black",
                            color: admin ? "black" : "white",
                        }}
                        onClick={handleAdmin}
                    >
                        Admin
                    </button>
                </div>

                <hr className="text-white w-full" />

                {user_ && (
                    <form
                        className="flex flex-col items-center gap-3"
                        action=""
                    >
                        <input
                            className="bg-slate-200 p-2 w-4/5 text-black placeholder:text-gray-600"
                            type="text"
                            placeholder="Roll No"
                            name="rollno"
                            onChange={handleUserRollNumberChange}
                        />
                        <label
                            htmlFor="dob"
                            className="text-white self-start pl-9"
                        >
                            Date of Birth:
                        </label>
                        <input
                            className="bg-slate-200 p-2 w-4/5 text-black"
                            type="Date"
                            placeholder="Date of Birth"
                            name="dob"
                            id="dob"
                            onChange={handleUserDOBChange}
                        />
                        <label
                            htmlFor="conf-dob"
                            className="text-white self-start pl-9"
                        >
                            Confirm Date of Birth:
                        </label>
                        <input
                            className="bg-slate-200 p-2 w-4/5 text-black"
                            type="Date"
                            placeholder="Confirm Date of Birth"
                            name="dob"
                            id="conf-dob"
                        />
                        <button
                            className="bg-white w-4/5 font-bold py-1 sm:py-2 px-4 m-1 sm:m-3 rounded-full text-black"
                            onClick={handleUserSignUp}
                        >
                            Sign Up
                        </button>
                    </form>
                )}

                {admin && (
                    <form
                        className="flex flex-col items-center gap-3"
                        action=""
                    >
                        <input
                            className="bg-slate-200 p-2 w-4/5 text-black placeholder:text-gray-600"
                            type="text"
                            placeholder="Email Id"
                            name="email"
                            onChange={(e) => setEmailId(e.target.value)}
                        />
                        <input
                            className="bg-slate-200 p-2 w-4/5 text-black placeholder:text-gray-600"
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            className="bg-white w-4/5 font-bold py-1 sm:py-2 px-4 m-1 sm:m-3 rounded-full text-black"
                            onClick={handleAdminSignUp}
                        >
                            Sign Up
                        </button>
                    </form>
                )}

                <hr className="text-white w-full  " />

                <p className="text-white text-lg text-center">
                    Already Registered?{" "}
                    <b className="pl-2 text-xl">
                        <Link href="/login">Sign in</Link>
                    </b>
                </p>
            </div>
        </div>
    );
}
