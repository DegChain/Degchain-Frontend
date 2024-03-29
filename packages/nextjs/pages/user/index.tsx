import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useAccount, useNetwork } from "wagmi";
import { useContractRead } from "wagmi";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

export default function View() {
  const { address } = useAccount(); //address of the user
  const [userDocuments, setUserDocuments] = useState([]);
  const getUserDocuments = useScaffoldContractRead({
    contractName: "DocumentManager",
    functionName: "getUserDocuments",
    //@ts-ignore
    args: [address],
  });

  useEffect(() => {
    const fetchUserDocuments = async () => {
      try {
        //@ts-ignore
        const documents = await getUserDocuments.data();
        setUserDocuments(documents);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch user documents.");
      }
    };

    if (address) {
      fetchUserDocuments();
    }
  }, [address]);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-black px-2 py-4 flex items-center justify-between">{/* Your navigation components */}</nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold mb-8">User Documents</h1>
        {userDocuments.length === 0 ? (
          <p>No documents available.</p>
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {userDocuments.map((document, index) => (
              <li key={index} className="bg-white overflow-hidden shadow-md rounded-lg p-4">
                <h2 className="text-lg font-medium mb-2">
                  {
                    //@ts-ignore
                    document.documentName
                  }
                </h2>
                <div className="flex items-center gap-2">
                  <a
                    href={`https://ipfs.io/ipfs/${
                      //@ts-ignore
                      document.ipfsHash
                    }`}
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
