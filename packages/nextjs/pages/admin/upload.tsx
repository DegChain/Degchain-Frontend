import React, { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { create } from "ipfs-http-client";
import { toast } from "react-hot-toast";
import { useAccount, useDisconnect, useNetwork } from "wagmi";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const projectId = "2UFRKWM8a2EvI39sxedeih0b9IW";
const projectSecret = "3ec06901416afcfe5dfb0aaa0c6d0f19";
// Update the IPFS endpoint to use Infura
const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString("base64")}`,
  },
});

const addOptions = {
  pin: true,
  wrapWithDirectory: true,
};

//for typescript compatibility
interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

export default function Upload() {
  const { chain, chains } = useNetwork();
  const chainId = chain?.id.toString;
  //@ts-ignore

  const { address } = useAccount();
  const [rollNumber, setRollNumber] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");
  const [ownerAddress, setOwnerAddress] = useState("");
  const [documentName, setDocumentName] = useState("");

  useEffect(() => {
    // Set the ownerAddress state when the user is available
    if (address != undefined) {
      setOwnerAddress(address);
    }
  }, [address]);

  //uploadDocument from contract
  const uploadDocument = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "uploadDocument",
    args: [documentName, ipfsHash, rollNumber],
  });

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    //@ts-ignore
    const file = event.target.files[0];

    try {
      const added = await ipfs.add(file, addOptions);
      console.log(`added = ${added}`);
      console.log(`added.path = ${added.path}`);
      setIpfsHash(added.cid.toString());
    } catch (error) {
      console.error(error);
      console.log(`error = ${error}`);
      toast.success("Failed to upload document.");
    }
  };

  const handleDocumentSubmission = async () => {
    if (!rollNumber || !ipfsHash || !ownerAddress) {
      toast.error("Please fill in all required fields.", {
        position: "top-right",
      });
      return;
    }
    try {
      await uploadDocument.writeAsync();
      toast.success("Document uploaded successfully!");
      setRollNumber("");
      setIpfsHash("");
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
          <h1 className="text-white text-xl sm:text-3xl font-semibold px-3">Upload Files</h1>
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
          <h1 className="text-black font-bold text-xl sm:text-2xl text-center">Upload Document</h1>
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
            <div className="w-4/5">
              <label htmlFor="documentName" className="block text-gray-700">
                Document Name
              </label>
              <input
                id="documentName"
                className="bg-gray-200 p-2 w-full text-black placeholder-gray-600"
                type="text"
                placeholder="Enter document name"
                name="documentName"
                value={documentName}
                onChange={e => setDocumentName(e.target.value)}
              />
            </div>
            <input type="file" onChange={handleFileUpload} accept=".pdf" className="p-2" />
            <input
              className="bg-gray-200 p-2 w-4/5 text-black placeholder-gray-600"
              type="text"
              placeholder="Owner Address"
              name="ownerAddress"
              value={ownerAddress}
              onChange={e => setOwnerAddress(e.target.value)}
            />
            <button
              className="bg-black w-4/5 font-bold py-1 sm:py-2 px-4 m-1 sm:m-3 rounded-full text-white"
              onClick={handleDocumentSubmission}
              disabled={!rollNumber || !ipfsHash || !ownerAddress}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
