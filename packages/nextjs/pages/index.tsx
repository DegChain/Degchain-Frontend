"use client";

import type { NextPage } from "next";
import DescriptionCard from "~~/components/DescriptionCard";
import FeatureCard from "~~/components/FeatureCard";
import HeroSection from "~~/components/HeroSection";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <main>
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
            <DescriptionCard imageSrc="/images/image2.png" altText="Database" description="Database" />
            <DescriptionCard
              imageSrc="/images/image4.png"
              altText="User interface for document storage and access"
              description="User interface for document storage and access"
            />
          </div>
        </section>

        <section className="h-98 bg-white ">
          <h2 className="text-black text-center pt-10 text-2xl font-medium">DegChains Features:</h2>
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
          <h1 className="p-5 pl-0 text-2xl font-medium text-white mb-2">How we start</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 ">
            <div className="flex items-center  bg-zinc-300 h-16 p-3 rounded-md phone:w-96 sm:w-auto">
              <span className="bg-white rounded-full px-3 py-1 ml-1 mr-2">1</span>
              <p className="text-lg m-1">Register admin and users</p>
            </div>
            <div className="flex items-center bg-zinc-300 h-16 phone:h-16 p-3 rounded-md phone:w-96 sm:w-auto">
              <span className="bg-white rounded-full px-3 py-1 ml-1 mr-2">2</span>
              <p className="text-lg m-1">Admin will upload certificates unique to a student</p>
            </div>
            <div className="flex items-center bg-zinc-300 h-16 p-3 rounded-md phone:w-96 sm:w-auto">
              <span className="bg-white rounded-full px-3 py-1 ml-1 mr-2">3</span>
              <p className="text-lg m-1">Users will access certificates</p>
            </div>
            <div className="flex items-center bg-zinc-300 h-16 p-3 rounded-md phone:w-96 sm:w-auto">
              <span className="bg-white rounded-full px-3 py-1 ml-1 mr-2">4</span>
              <p className="text-lg m-1">Certificate will be uploaded to IPFS</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
