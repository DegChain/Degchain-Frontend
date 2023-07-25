import React, { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { useAccount, useDisconnect, useNetwork } from "wagmi";
import { useContractRead } from "wagmi";
import { abi as DocABI, contractAddress as DocContractAddress } from "~~/constants/DocumentManager";

const { chain, chains } = useNetwork();
const chainId = chain?.id.toString;
//@ts-ignore
const DocumentManagerAddress = DocContractAddress[chainId];
const ipfsAPI = require("ipfs-http-client");

const { globSource } = ipfsAPI;
const ipfs = ipfsAPI({ host: "localhost", port: "5001", protocol: "http" });

//run your own ipfs daemon: https://docs.ipfs.io/how-to/command-line-quick-start/#install-ipfs
//const ipfs = ipfsAPI({host: 'localhost', port: '5001', protocol: 'http' })

const addOptions = {
  pin: true, //uncomment for localhost
  wrapWithDirectory: true,
  //timeout: 0
};
//for typescript compatibility
interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
export default function View() {
  const { address } = useAccount();
  const [rollNumber, setRollNumber] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");
  const [ownerAddress, setOwnerAddress] = useState("");
  const [documentName, setDocumentName] = useState("");
  const router = useRouter();
  useEffect(() => {
    // Set the ownerAddress state when the user is available
    if (address != undefined) {
      setOwnerAddress(address);
    }
  }, [address]);
  useEffect(() => {
    // If the rollNumber is not provided, redirect to the previous page
    if (!rollNumber || rollNumber == "") {
      router.back();
    }
  }, []);
  //uploadDocument from contract
  const getOwnerDocuments = useContractRead({
    address: DocumentManagerAddress,
    abi: DocABI,
    functionName: "getOwnerDocuments",
    args: [rollNumber],
  });
  const handleSubmit = async (e: React.FormEvent) => {
    //e.preventDefault();
    if (!rollNumber || rollNumber == "") {
      toast.error("Please fill in all required fields.", {
        position: "top-right",
      });
      return;
    }
    try {
      await getOwnerDocuments.data;
      toast.success("Document uploaded successfully!");
      router.push(`/admin/${rollNumber}`);
    } catch (error) {
      console.log(error);
      toast.error("Failed to upload document.");
    }
  };
  return (
    <div>
      <nav className="flex flex-row justify-between bg-black px-2 w-full h-20 items-center fixed shadow-sm shadow-white">
        <Link href="/admin">
          <Image src="/images/logo.png" alt="logo" width={65} height={65} />
        </Link>

        <div className="px-2 phone:px-5 flex flex-row justify-start items-center">
          <h1 className="text-white text-xl sm:text-3xl font-semibold px-3">View Files</h1>
        </div>
        <div className="flex flex-row gap-3 items-center">
          <Link href="/">
            <button
              className="bg-white sm:text-lg sm:w-24 h-8 phone:h-10 px-2 phone:px-3 rounded-full m-1"
              onClick={async () => {
                await useDisconnect().disconnectAsync();
              }}
            >
              Logout
            </button>
          </Link>
          <Image src="/images/college.png" alt="logo" width={55} height={55} />
        </div>
      </nav>
      <div
        className="bg-cover w-full h-screen flex flex-row justify-center items-center"
        style={{ background: 'url("/images/background.png")' }}
      >
        <div className="container p-3 h-fit w-4/5 sm:w-96 flex flex-col item-center gap-2 phone:gap-3 rounded-xl bg-white">
          <h1 className="text-black font-bold text-xl sm:text-2xl text-center">Enter Roll Number</h1>
          <hr className="text-black w-full" />
          <form className="flex flex-col items-center gap-3" action="">
            <input
              className="bg-gray-200 p-2 w-4/5 text-black placeholder-gray-600"
              type="text"
              placeholder="Roll No"
              name="rollno"
              value={rollNumber}
              onChange={e => setRollNumber(e.target.value)}
            />
            <button
              className="bg-black w-4/5 font-bold py-1 sm:py-2 px-4 m-1 sm:m-3 rounded-full text-white"
              onClick={handleSubmit}
              disabled={rollNumber == "" || !rollNumber}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
