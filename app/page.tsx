"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ethers } from "ethers";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "web3uikit";
import {
    contractAddress as DocContractAddress,
    abi as DocABI,
} from "../constants/DocumentManager/index";
import {
    contractAddress as UserContractAddress,
    abi as UserABI,
} from "../constants/UserManager/index";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import FeatureCard from "@/components/FeatureCard";
import DescriptionCard from "@/components/DescriptionCard";

export default function Home() {
    //to get network information
    return (
        <MoralisProvider initializeOnMount={false}>
            <NotificationProvider>
                <main>
                    <Navbar />
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

                    <section className="bg-stone-400 w-full">
                        <h1>Start</h1>
                        <div className="bg-grey">1</div>
                    </section>

                    <section className="bg-black w-full h-98 text-white p-8">
                        <h1>Contact Us</h1>
                        <form action="">
                            <label htmlFor="name">Name</label>
                            <input type="text" placeholder="" name="name" />

                            <label htmlFor="phone">Phone Number</label>
                            <input type="text" placeholder="" name="phone" />

                            <label htmlFor="email">Email</label>
                            <input type="text" placeholder="" name="email" />

                            <label htmlFor="message">Message</label>
                            <textarea placeholder="" name="message" />
                            <button className="bg-white text-black">Go</button>
                        </form>
                    </section>

                    <Link href="/admin">Admin</Link>
                    <Link href="/user">User</Link>
                </main>
            </NotificationProvider>
        </MoralisProvider>
    );
}
