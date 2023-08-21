import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAccount, useNetwork } from "wagmi";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

export default function Login() {
  const [user_, setuser] = useState(true);
  const [admin, setadmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const chainID: string = useNetwork().chain?.id.toString() || "";
  const accountAddress = useAccount().address;
  //@ts-ignore

  const handleNewNotification = (s: string) => {
    toast.success("Transaction Complete!\n" + s, {
      position: "top-right",
    });
  };

  const handleUser = () => {
    setuser(true);
    setadmin(false);
  };

  const handleAdmin = () => {
    setadmin(true);
    setuser(false);
  };

  const loginUser = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "loginUser",
  });
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      setLoading(true);
      var response;
      e.preventDefault();
      // Perform any necessary form validation or data processing
      if (admin) {
        response = await axios.post("/api/admin/login", accountAddress);
      } else {
        response = await axios.post("/api/user/login", accountAddress);
      }
      // Redirect to the dynamic dashboard page
      if (user_) {
        router.push({
          pathname: `/user`,
        });
      } else if (admin) {
        router.push(`/admin`);
      }
    } catch (error) {
      toast.error("There is some, error " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-cover w-full h-screen text-white flex flex-col justify-center items-center"
      style={{ background: 'url("/images/background.png")' }}
    >
      <div className="container p-3 h-fit w-max sm:w-96 bg-gray-800 opacity-90 text-black flex flex-col item-center gap-3 rounded-xl">
        <h1 className="text-white font-bold text-2xl text-center">Sign In</h1>
        <hr className="text-white w-full  " />
        <div className="flex flex-row justify-evenly text-white font-bold text-xl sm:text-2xl text-center">
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
        <hr className="text-white w-full  " />

        <form className="flex flex-col items-center gap-2" onSubmit={handleSubmit}>
          <input
            className="bg-slate-200 p-2 w-4/5 text-black placeholder:text-gray-600"
            type="text"
            placeholder="Private Key"
            name="key"
            value={accountAddress}
          />
          <button className="bg-white w-4/5 font-bold py-2 px-4  m-2 rounded-full text-black ">Sign In</button>
        </form>

        <div className="flex flex-col sm:flex-row items-center justify-evenly sm:gap-3">
          <div className="flex gap-2">
            <input className="bg-white" type="checkbox" placeholder="false" name="remember" id="remember" />
            <label htmlFor="remember" className="text-white text-lg">
              Remember Me
            </label>
          </div>

          <p className="text-white text-lg">Forgot Password?</p>
        </div>
        <hr className="text-white w-full m-0 " />
        <p className="text-white text-lg text-center ">
          Dont have an account?
          <b className="pl-2 text-xl">
            <Link href="/register">Sign up</Link>
          </b>
        </p>
      </div>
    </div>
  );
}
