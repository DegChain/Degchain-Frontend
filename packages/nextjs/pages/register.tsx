import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { useContractWrite, useNetwork } from "wagmi";
import { abi as UserABI, contractAddress as UserContractAddress } from "~~/constants/UserManager/index";

export default function Register() {
  const router = useRouter();
  // Variable state for user registration
  const [DOB, setDOB] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [user_, setuser] = useState(true);
  const [admin, setadmin] = useState(false);
  // code to make a new function
  const { chain, chains } = useNetwork();
  //@ts-ignore
  const UserManagerAddress = UserContractAddress[chain?.id.toString()];
  function handleUser() {
    setuser(true);
    setadmin(false);
  }

  function handleAdmin() {
    setadmin(true);
    setuser(false);
  }
  const registerUser = useContractWrite({
    //@ts-ignore
    address: UserManagerAddress,
    abi: UserABI,
    functionName: "registerUser",
    args: [DOB, rollNumber],
  });
  // Register User
  //@ts-ignore

  // Register Admin
  //@ts-ignore
  const registerAdmin = useContractWrite({
    //@ts-ignore
    address: UserManagerAddress,
    abi: UserABI,
    functionName: "registerAdmin",
    args: [emailId, password],
  });

  //@ts-ignore
  const handleUserRollNumberChange = e => {
    setRollNumber(e.target.value);
  };
  //@ts-ignore
  const handleUserDOBChange = e => {
    setDOB(e.target.value);
  };
  const handleUserSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await registerUser.writeAsync();
      handleNewNotification("New user registered");
      router.push("/login");
    } catch (error) {
      console.log(error);
      toast.error("We fucked up user.");
    }
  };

  const handleAdminSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await registerAdmin.writeAsync();
      handleNewNotification("New Admin registered");
      router.push("/login");
    } catch (error) {
      console.log(error);
      toast.error("Admin can't be registerd");
    }
  };
  const handleNewNotification = (s: string) => {
    toast.success("Transaction Complete!\n" + s, {
      icon: "bell",
      position: "top-right",
    });
  };

  return (
    <div
      className="bg-cover w-full h-screen text-white justify-center flex flex-col items-center"
      style={{ background: 'url("/images/background.png")' }}
    >
      <div className="container p-2 h-fit w-4/5 sm:w-96 bg-gray-800 opacity-90 text-black flex flex-col item-center gap-2 phone:gap-3 rounded-xl">
        <h1 className="text-white font-bold text-xl sm:text-2xl text-center">Sign Up</h1>

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
          <form className="flex flex-col items-center gap-3" action="">
            <input
              className="bg-slate-200 p-2 w-4/5 text-black placeholder:text-gray-600"
              type="text"
              placeholder="Roll No"
              name="rollno"
              onChange={handleUserRollNumberChange}
            />
            <label htmlFor="dob" className="text-white self-start pl-9">
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
            <label htmlFor="conf-dob" className="text-white self-start pl-9">
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
          <form className="flex flex-col items-center gap-3" action="">
            <input
              className="bg-slate-200 p-2 w-4/5 text-black placeholder:text-gray-600"
              type="text"
              placeholder="Email Id"
              name="email"
              onChange={e => setEmailId(e.target.value)}
            />
            <input
              className="bg-slate-200 p-2 w-4/5 text-black placeholder:text-gray-600"
              type="password"
              placeholder="Password"
              name="password"
              onChange={e => setPassword(e.target.value)}
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
