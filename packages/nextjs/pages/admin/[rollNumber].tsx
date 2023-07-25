import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { useAccount, useNetwork } from "wagmi";
import { useContractRead } from "wagmi";
import { contractAddress as DocContractAddress, abi as DocumentManagerABI } from "~~/constants/DocumentManager/index";

interface Document {
  documentId: number;
  documentName: string;
  ownerAddress: string;
  ipfsHash: string;
}

export default function View() {
  const router = useRouter();
  const { rollNumber } = router.query;
  const [userDocuments, setUserDocuments] = useState<Document[]>([]);
  const { chain, chains } = useNetwork();
  const chainId = chain?.id?.toString() || "";
  //@ts-ignore
  const DocumentManagerAddress = DocContractAddress[chainId];

  const getOwnerDocuments = useContractRead({
    functionName: "getOwnerDocuments",
    address: DocumentManagerAddress,
    args: [rollNumber],
    abi: DocumentManagerABI,
  });

  useEffect(() => {
    if (getOwnerDocuments.data) {
      //@ts-ignore
      setUserDocuments(await getOwnerDocuments.data());
      toast.success("Transaction Successful");
    }
  }, [getOwnerDocuments.data]);

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
                <h2 className="text-lg font-medium mb-2">{document.documentName}</h2>
                <div className="flex items-center gap-2">
                  <a
                    href={`https://ipfs.io/ipfs/${document.ipfsHash}`}
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
