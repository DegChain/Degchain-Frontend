"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { ConnectButton } from "web3uikit";
export default function Login() {
    return (
        <div
            className="bg-cover w-full h-screen text-white flex flex-col items-center"
            style={{ background: 'url("/images/background.png")' }}
        >
            <div className="relative w-full px-4">
                <div className="absolute top-1 right-1">
                    <div className="bg-white text-black align-middle sm:text-md sm:w-24 h-9 phone:h-11  px-2 phone:px-3 rounded-full m-1">
                        <ConnectButton moralisAuth={false} />
                    </div>
                </div>
                <Link href="/">
                    <div className="flex flex-col items-center p-3 sm:p-6 gap-1">
                        <Image
                            src="/images/logo.png"
                            alt="logo"
                            width={70}
                            height={70}
                        />
                        <h1 className="text-white text-3xl font-semibold px-3">
                            DegChain
                        </h1>
                    </div>
                </Link>
            </div>

            <div
                className="container p-3 h-fit w-max sm:w-96 bg-gray-800 opacity-90 text-black flex 
      flex-col item-center gap-5 rounded-xl"
            >
                <h1 className="text-white font-bold text-2xl text-center">
                    Sign In
                </h1>
                <hr className="text-white w-full  " />
                <form className="flex flex-col items-center gap-3" action="">
                    <input
                        className="bg-slate-200 p-2 w-4/5 text-black placeholder:text-gray-600"
                        type="text"
                        placeholder="Private Key"
                        name="key"
                    />
                    <button className="bg-white w-4/5 font-bold py-2 px-4 m-2 sm:m-3 rounded-full text-black ">
                        Sign In
                    </button>
                </form>
                <div className=" flex flex-col sm:flex-row items-center justify-evenly sm:gap-4">
                    <div className="gap-2">
                        <input
                            className="bg-white  "
                            type="checkbox"
                            placeholder="false"
                            name="remember"
                            id="remember"
                        />
                        <label
                            htmlFor="remember"
                            className="text-white text-lg"
                        >
                            Remember Me
                        </label>
                    </div>

                    <p className="text-white text-lg">Forgot Password?</p>
                </div>
                <hr className="text-white w-full  " />
                <p className="text-white text-lg text-center mb-3">
                    Dont have an account?{" "}
                    <b className="pl-2 text-xl">
                        <Link href="/register">Sign up</Link>
                    </b>
                </p>
            </div>
        </div>
    );
}
