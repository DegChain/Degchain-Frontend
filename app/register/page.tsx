"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import Button from "@/components/Button";

export default function Register() {
    const [user, setuser] = React.useState(true);
    const [admin, setadmin] = React.useState(false);

    function handleUser() {
        setuser(true);
        setadmin(false);
    }
    function handleAdmin() {
        setadmin(true);
        setuser(false);
    }
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

            <div
                className="container p-2 h-fit w-4/5 sm:w-96 bg-gray-800 opacity-90 text-black flex 
      flex-col item-center gap-2 phone:gap-3 rounded-xl"
            >
                <h1 className="text-white font-bold text-xl sm:text-2xl text-center">
                    Sign Up
                </h1>

                <hr className="text-white w-full  " />

                <div className="flex flex-row justify-evenly text-white  font-bold text-xl sm:text-2xl text-center">
                    <button
                        className="w-full h-fit rounded-md "
                        style={{
                            backgroundColor: user ? "white" : "black",
                            color: user ? "black" : "white",
                        }}
                        onClick={handleUser}
                    >
                        User
                    </button>
                    <button
                        className="w-full h-fit rounded-md "
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

                {user && (
                    <form
                        className="flex flex-col items-center gap-3"
                        action=""
                    >
                        <input
                            className="bg-slate-200 p-2 w-4/5 text-black placeholder:text-gray-600"
                            type="text"
                            placeholder="Roll No"
                            name="rollno"
                        />
                        <label
                            htmlFor="dob"
                            className="text-white self-start pl-9"
                        >
                            Date of Birth :
                        </label>
                        <input
                            className="bg-slate-200 p-2 w-4/5 text-black  "
                            type="Date"
                            placeholder="Date of Birth"
                            name="dob"
                            id="dob"
                        />
                        <label
                            htmlFor="conf-dob"
                            className="text-white self-start pl-9 "
                        >
                            Confirm Date of Birth :
                        </label>
                        <input
                            className="bg-slate-200 p-2 w-4/5 text-black"
                            type="Date"
                            placeholder="Confirm Date of Birth"
                            name="dob"
                            id="conf-dob"
                        />
                        <button className="bg-white w-4/5 font-bold py-1 sm:py-2 px-4 m-1 sm:m-3 rounded-full text-black ">
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
                        />
                        <input
                            className="bg-slate-200 p-2 w-4/5 text-black placeholder:text-gray-600 "
                            type="password"
                            placeholder="Password"
                            name="password"
                        />
                        <button className="bg-white w-4/5 font-bold py-1 sm:py-2 px-4 m-1 sm:m-3 rounded-full text-black ">
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
