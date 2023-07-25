import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useAccount, useNetwork } from "wagmi";
import { useContractRead } from "wagmi";
import {
  abi as DocumentManagerABI,
  contractAddress as DocumentManagerAddress,
} from "~~/constants/DocumentManager/index";

export default function View() {
  const { address } = useAccount();
  //const [userDocuments, setUserDocuments] = useState([]);
  const { chain, chains } = useNetwork();
  const getUserDocuments = useContractRead({
    functionName: "getUserDocuments",
    //@ts-ignore
    address: DocumentManagerAddress[chain!.id.toString()],
    args: [address],
    abi: DocumentManagerABI,
  });

  //useEffect(() => {
  //  const fetchUserDocuments = async () => {
  //    try {
  //      //@ts-ignore
  //      const documents = await getUserDocuments.data();
  //      setUserDocuments(documents);
  //    } catch (error) {
  //      console.log(error);
  //      toast.error("Failed to fetch user documents.");
  //    }
  //  };
  //
  //  if (address) {
  //    fetchUserDocuments();
  //  }
  //}, [address]);
  const userDocuments = [
    // ... your existing documents
    {
      documentName: "Resume",
      ipfsHash: "QmWgqxNqVgMWwiaJFdAck2FcnTB8GZMuDFsZ2FwyLo7uyv",
    },
    // ... any other documents you want to include
  ];
  return (
    <div
      className="bg-cover w-full h-screen flex flex-row justify-center items-center"
      style={{ background: 'url("/images/background.png")' }}
    >
      <main className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold mb-8">User Documents</h1>
        {userDocuments.length === 0 ? (
          <p>No documents available.</p>
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {userDocuments.map((document, index) => (
              <li key={index} className="bg-white overflow-hidden shadow-md rounded-lg p-4">
                <h2 className="text-lg font-medium mb-2 text-black">
                  {
                    //@ts-ignore
                    document.documentName
                  }
                </h2>
                <div className="flex items-center gap-2">
                  <a
                    href="https://drive.google.com/file/d/1_cvWmE8Igeik4mlEFYD5rk-OM8BEgtjY/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View PDF
                  </a>
                  {/* Add more actions or information about the document */}
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
