import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNetwork } from "wagmi";

export default function New() {
  const router = useRouter();
  const chainId: string = useNetwork().chain?.id.toString() || "";
  //@ts-ignore
  const UserManagerAddress = UserContractAddress[chainId] || "";

  // Variable state for user registration
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [rollNumber, setRollNumber] = useState("");

  //Add new record

  const handleUserRollNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRollNumber(e.target.value);
  };

  const handleUserDOBChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateOfBirth(e.target.value);
  };

  const handleNewUser = async () => {
    try {
      const response = await axios.post("/api/admin/new", { rollNumber, dateOfBirth });
      toast.success("Transaction Successful");
      // Navigate back to the homepage after successful transaction
      router.push("/");
    } catch (error) {
      console.log(`Error = $${error}`);
      toast.error("Transaction failed.");
    }
  };

  return (
    <div>
      <nav className="flex flex-row justify-between bg-black px-2 w-full h-20 items-center fixed shadow-sm shadow-white">
        <Link href="/admin">
          <Image src="/images/logo.png" alt="logo" width={65} height={65} />
        </Link>

        <div className="px-2 phone:px-5 flex flex-row justify-start items-center ">
          <h1 className="text-white text-xl sm:text-3xl font-semibold px-3">Make New Record</h1>
        </div>

        <div className="flex flex-row gap-3 items-center">
          <Link href="/">
            <button className="bg-white sm:text-lg sm:w-24 h-8 phone:h-10 px-2 phone:px-3 rounded-full m-1">
              Logout
            </button>{" "}
          </Link>
          <Image src="/images/college.png" alt="logo" width={55} height={55} />
        </div>
      </nav>

      <div
        className="bg-cover w-full h-screen flex flex-row justify-center items-center"
        style={{ background: 'url("/images/background.png")' }}
      >
        <div className="container p-3 h-fit w-4/5 sm:w-96 flex flex-row justify-center items-center bg-gray-800 opacity-90 text-black  rounded-xl">
          <form className="h-full flex flex-col justify-evenly my-8 items-center gap-8">
            <div className="w-full">
              <label htmlFor="roll no" className="text-white text-left ">
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
              <label htmlFor="dob" className="text-white text-left ">
                Date Of Birth
              </label>
              <input
                className="bg-gray-300 p-2 w-full text-black placeholder:text-gray-600"
                type="date"
                name="dob"
                id="dob"
                value={dateOfBirth}
                onChange={handleUserDOBChange}
              />
            </div>

            <button className="bg-white w-2/5 font-bold py-2 px-4 rounded-full text-black" onClick={handleNewUser}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
