import React, { useEffect, useState } from "react";

const userDocuments = [
  {
    documentName: "I Semester Marksheet",
    ipfsHash: "QmZaSfYp4m9nLc2Sy2C65Uqsk9xHfqQYptVaRHjKZSG7Ex",
  },
  {
    documentName: "II Semester Marksheet",
    ipfsHash: "QmVSAK4VDbNUdZmsceLrooAC7GtP4Se7uh2XjkYNEVXkXj",
  },
  {
    documentName: "III Semester Marksheet",
    ipfsHash: "QmRVCuzQbJ26V1XPzoEcyAPCj7tnGyDkxJ1Ngk4em6Pjeg",
  },
  {
    documentName: "IV Semester Marksheet",
    ipfsHash: "QmddoC6u1s6XNyEJc99ChqYsAxUEwNjFgJRE7fAvZPrGyM",
  },
  {
    documentName: "V Semester Marksheet",
    ipfsHash: "QmSwKRLtSSofN9RiFy9C8htkHvp6f1hQfu8M2fuh3NKbD9",
  },
];

export default function View() {
  return (
    <div
      className="min-h-screen bg-gray-100"
      style={{
        background: 'url("/images/background.png")',
        backgroundSize: "cover",
      }}
    >
      <nav className="bg-black px-2 py-4 flex items-center justify-between">{/* Your navigation components */}</nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold mb-8 text-white">User Documents</h1>
        {userDocuments.length === 0 ? (
          <p className="text-white">No documents available.</p>
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 to-blue-600">
            {userDocuments.map((document, index) => (
              <li key={index} className="bg-white overflow-hidden shadow-md rounded-lg p-4">
                <h2 className="text-lg font-medium mb-2 text-black">{document.documentName}</h2>
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
