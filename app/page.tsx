"use client";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import FeatureCard from "@/components/FeatureCard";
import DescriptionCard from "@/components/DescriptionCard";
import { useRouter } from "next/router";
import { useAuthRequestChallengeEvm } from "@moralisweb3/next";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { signIn, useSession } from "next-auth/react";
import { useAccount, useSignMessage, useNetwork } from "wagmi";
import { useEffect } from "react";
import Image from "next/image";
import Dropdown from "../components/DropDown";
export default function Home() {
    //to get network information
    const { isConnected, address } = useAccount();
    const { chain } = useNetwork();
    const { data: session, status } = useSession();
    const { signMessageAsync } = useSignMessage();
    const { push } = useRouter();
    const { requestChallengeAsync } = useAuthRequestChallengeEvm();

    useEffect(() => {
        const handleAuth = async () => {
            const message = (await requestChallengeAsync({
                //@ts-ignore
                address: address,
                chainId: chain!.id,
            }))!.message;

            const signature = await signMessageAsync({ message });

            // redirect user after success authentication to '/user' page
            //@ts-ignore
            const { url } = await signIn("moralis-auth", {
                message,
                signature,
                redirect: false,
                callbackUrl: "/user",
            });
            /**
             * instead of using signIn(..., redirect: "/user")
             * we get the url from callback and push it to the router to avoid page refreshing
             */
            push(url);
        };
        if (status === "unauthenticated" && isConnected) {
            handleAuth();
        }
    }, [status, isConnected]);

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
                    {session ? (
                        <Dropdown />
                    ) : (
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
                            <ConnectButton />
                        </div>
                    )}
                </div>
            </nav>
            <HeroSection />
            <section className="h-98 bg-black rounded-t-3xl mt-2">
                <h2 className="text-white text-center pt-10 text-2xl font-medium px-10">
                    The Document Management System Infrastructure:
                </h2>
                <div className="flex flex-row flex-wrap justify-around gap-4 items-start py-10 px-5 sm:px-10">
                    <DescriptionCard
                        imageSrc="/images/image1.png"
                        altText="Web UI for administrators"
                        description="Web UI for administrators"
                    />
                    <DescriptionCard
                        imageSrc="/images/image2.png"
                        altText="Database"
                        description="Database"
                    />
                    <DescriptionCard
                        imageSrc="/images/image4.png"
                        altText="User interface for document storage and access"
                        description="User interface for document storage and access"
                    />
                </div>
            </section>

            <section className="h-98 bg-white">
                <h2 className="text-black text-center pt-10 text-2xl font-medium">
                    DegChains Features:
                </h2>
                <div className="flex flex-row flex-wrap justify-around gap-4 items-start py-10 px-5 sm:px-10">
                    <FeatureCard
                        imageSrc="/images/feature1.png"
                        altText="System instance setup"
                        description="System instance setup"
                    />
                    <FeatureCard
                        imageSrc="/images/feature2.png"
                        altText="Dedicated accounts and login for admins and users"
                        description="Dedicated accounts and login for admins and users"
                    />
                    <FeatureCard
                        imageSrc="/images/feature3.png"
                        altText="Invite, manage, and remove users"
                        description="Invite, manage, and remove users"
                    />
                    <FeatureCard
                        imageSrc="/images/feature4.png"
                        altText="Gateways with traffic certification support and blockchain data confirmation"
                        description="Gateways with traffic certification support and blockchain data confirmation"
                    />
                </div>
            </section>

            <section className="bg-stone-400 w-full px-10 py-4 text-black">
                <h1 className="p-5 pl-0 text-2xl font-medium text-white mb-2">
                    How we start
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 ">
                    <div className="flex items-center  bg-zinc-300 h-16 p-3 rounded-md phone:w-96 sm:w-auto">
                        <span className="bg-white rounded-full px-3 py-1 ml-1 mr-2">
                            1
                        </span>
                        <p className="text-lg m-1">Register admin and users</p>
                    </div>
                    <div className="flex items-center bg-zinc-300 h-20 phone:h-16 p-3 rounded-md phone:w-96 sm:w-auto">
                        <span className="bg-white rounded-full px-3 py-1 ml-1 mr-2">
                            2
                        </span>
                        <p className="text-lg m-1">
                            Admin will upload certificates unique to a student
                        </p>
                    </div>
                    <div className="flex items-center bg-zinc-300 h-16 p-3 rounded-md phone:w-96 sm:w-auto">
                        <span className="bg-white rounded-full px-3 py-1 ml-1 mr-2">
                            3
                        </span>
                        <p className="text-lg m-1">
                            Users will access certificates
                        </p>
                    </div>
                    <div className="flex items-center bg-zinc-300 h-16 p-3 rounded-md phone:w-96 sm:w-auto">
                        <span className="bg-white rounded-full px-3 py-1 ml-1 mr-2">
                            4
                        </span>
                        <p className="text-lg m-1">
                            Certificate will be uploaded to IPFS
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-black w-full  text-black px-10 py-4">
                <h1 className="p-5 pl-0 text-2xl font-medium text-white mb-2">
                    Contact Us
                </h1>
                <form action="">
                    <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ">
                        <div>
                            <label htmlFor="name" className="text-white">
                                Name:
                            </label>
                            <input
                                type="text"
                                placeholder="Your Name"
                                name="name"
                                id="name"
                                className="mt-1 px-3 placeholder:italic   placeholder:text-slate-400 bg-white w-full border border-slate-300 rounded-md py-2"
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" className="text-white">
                                Phone Number:
                            </label>
                            <input
                                type="text"
                                placeholder="7720****"
                                name="phone"
                                id="phone"
                                className="mt-1 px-3 placeholder:italic  placeholder:text-slate-400 bg-white w-full border border-slate-300 rounded-md py-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="text-white">
                                Email:
                            </label>
                            <input
                                type="text"
                                placeholder="eg. bcs_20xx@iiitm.ac.in"
                                name="email"
                                id="email"
                                className="mt-1 px-3 placeholder:italic  placeholder:text-slate-400 bg-white w-full border border-slate-300 rounded-md py-2"
                            />
                        </div>
                    </div>
                    <div className="my-3">
                        <label htmlFor="message" className="text-white">
                            Message:
                        </label>
                        <textarea
                            placeholder="Tell us about your idea"
                            name="message"
                            id="message"
                            className="mt-1 px-3 placeholder:italic  placeholder:text-slate-400 bg-white w-full border border-slate-300 rounded-md py-2"
                        />
                    </div>
                    <button className="bg-white text-black text-lg w-24 h-8 px-2 rounded-full m-1 ">
                        Go
                    </button>
                </form>
            </section>

            <Link href="/admin">Admin</Link>
            <Link href="/user">User</Link>
        </main>
    );
}
