import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAccount } from "wagmi";

type UserRole = "user" | "admin";

export default function Register() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<UserRole>("user");
  const [DOB, setDOB] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const accountAddress = useAccount().address || "";

  const handleUserRole = (role: UserRole) => {
    setUserRole(role);
  };

  const handleUserRollNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRollNumber(e.target.value);
  };

  const handleUserDOBChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDOB(e.target.value);
  };

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      var response;
      if (userRole === "user") {
        response = await axios.post("/api/user/register", { DOB, rollNumber, name, accountAddress });
        handleNewNotification("New user registered");
      } else {
        console.log("Admin Signup");
        response = await axios.post("/api/admin/register", { emailId, password, accountAddress });
      }
      handleNewNotification("New Admin registered");
      console.log(`Signup success = ${response}`);
      router.push("/login");
      toast.success("Registered Successfully");
    } catch (error) {
      console.log(error);
      toast.error("There was an error in registering the User. Please try again later.");
    } finally {
      setLoading(false);
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
              backgroundColor: userRole === "user" ? "white" : "black",
              color: userRole === "user" ? "black" : "white",
            }}
            onClick={() => handleUserRole("user")}
          >
            User
          </button>
          <button
            className="w-full h-fit rounded-md"
            style={{
              backgroundColor: userRole === "admin" ? "white" : "black",
              color: userRole === "admin" ? "black" : "white",
            }}
            onClick={() => handleUserRole("admin")}
          >
            Admin
          </button>
        </div>

        <hr className="text-white w-full" />

        {userRole === "user" && (
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
            <input
              className="bg-slate-200 p-2 w-4/5 text-black placeholder:text-gray-600"
              type="text"
              placeholder="Account Address"
              name="Account Address"
              value={accountAddress}
            />
          </form>
        )}

        {userRole === "admin" && (
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
            <input
              className="bg-slate-200 p-2 w-4/5 text-black placeholder:text-gray-600"
              type="text"
              placeholder="Account Address"
              name="Account Address"
              value={accountAddress}
            />
          </form>
        )}

        <button
          className="bg-white w-4/5 font-bold py-1 sm:py-2 px-4 m-1 sm:m-3 rounded-full text-black"
          onClick={handleSignUp}
        >
          Sign Up
        </button>

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
