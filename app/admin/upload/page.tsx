import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useMoralis } from "react-moralis";
import { useWeb3Contract } from "react-moralis";
import { useNotification } from "web3uikit";
import {
    contractAddress as DocContractAddress,
    abi as DocManagerABI,
} from "@/constants/DocumentManager/index";
import { FiBell } from "react-icons/fi";
import Moralis from "moralis";
import fs from "fs";
export default function Upload() {
    const { user, chainId } = useMoralis();
    const DocManagerAddress =
        chainId! in DocContractAddress ? DocContractAddress[chainId][0] : null;
    const [rollNumber, setRollNumber] = useState("");
    const [ipfsHash, setIpfsHash] = useState("");
    const [ownerAddress, setOwnerAddress] = useState("");
    const [documentName, setDocumentName] = useState("");
    const dispatch = useNotification();

    useEffect(() => {
        // Set the ownerAddress state when the user is available
        if (user) {
            setOwnerAddress(user.get("ethAddress"));
        }
    }, [user]);

    //uploadDocument from contract
    const {
        runContractFunction: uploadDocument,
        data: uploadDocumentResponse,
        isLoading: isUploadDocumentLoading,
        isFetching: isUploadDocumentFetching,
    } = useWeb3Contract({
        abi: DocManagerABI,
        contractAddress: DocManagerAddress,
        functionName: "uploadDocument",
        params: { documentName, ipfsHash, ownerAddress },
    });
    async function uploadToIpfs() {
        await Moralis.start({
            apiKey: process.env.MORALIS_PRIVATE_KEY,
        });
    }
    //@ts-ignore
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];

        if (file) {
            await Moralis.start({
                apiKey: process.env.MORALIS_PRIVATE_KEY,
            });
            try {
                //const fileContent = fs.readFileSync(file.path, {
                //    encoding: "base64",
                //});
                //const { cid } = await ipfs.add(file);
                //setIpfsHash(cid.toString());
                const uploadArray = [
                    {
                        path: documentName,
                        content: file,
                    },
                ];
                const response = await Moralis.EvmApi.ipfs.uploadFolder({
                    abi: uploadArray,
                });
                console.log(response.result);
                setIpfsHash(response.result[0].path.slice(29));
            } catch (error) {
                console.log(error);
                dispatch({
                    type: "error",
                    message: "Failed to upload file to IPFS.",
                    title: "File Upload",
                    position: "topR",
                    icon: <FiBell />,
                });
            }
        }
    };

    const handleDocumentSubmission = async () => {
        if (!rollNumber || !ipfsHash || !ownerAddress) {
            dispatch({
                type: "error",
                message: "Please fill in all required fields.",
                title: "Document Upload",
                position: "topR",
                icon: <FiBell />,
            });
            return;
        }

        try {
            await uploadDocument();
            dispatch({
                type: "success",
                message: "Document uploaded successfully!",
                title: "Document Upload",
                position: "topR",
                icon: <FiBell />,
            });
            setRollNumber("");
            setIpfsHash("");
        } catch (error) {
            console.log(error);
            dispatch({
                type: "error",
                message: "Failed to upload document.",
                title: "Document Upload",
                position: "topR",
                icon: <FiBell />,
            });
        }
    };
    return (
        <div>
            <nav className="flex flex-row justify-between bg-black px-2 w-full h-20 items-center fixed shadow-sm shadow-white">
                <Link href="/admin">
                    <Image
                        src="/images/logo.png"
                        alt="logo"
                        width={65}
                        height={65}
                    />
                </Link>

                <div className="px-2 phone:px-5 flex flex-row justify-start items-center">
                    <h1 className="text-white text-xl sm:text-3xl font-semibold px-3">
                        Upload Files
                    </h1>
                </div>
                <div className="flex flex-row gap-3 items-center">
                    <Link href="/">
                        <button className="bg-white sm:text-lg sm:w-24 h-8 phone:h-10 px-2 phone:px-3 rounded-full m-1">
                            Logout
                        </button>
                    </Link>
                    <Image
                        src="/images/college.png"
                        alt="logo"
                        width={55}
                        height={55}
                    />
                </div>
            </nav>
            <div
                className="bg-cover w-full h-screen flex flex-row justify-center items-center"
                style={{ background: 'url("/images/background.png")' }}
            >
                <div className="container p-3 h-fit w-4/5 sm:w-96 flex flex-col item-center gap-2 phone:gap-3 rounded-xl bg-white">
                    <h1 className="text-black font-bold text-xl sm:text-2xl text-center">
                        Upload Document
                    </h1>
                    <hr className="text-black w-full" />
                    <form
                        className="flex flex-col items-center gap-3"
                        action=""
                    >
                        <input
                            className="bg-gray-200 p-2 w-4/5 text-black placeholder-gray-600"
                            type="text"
                            placeholder="Roll No"
                            name="rollno"
                            value={rollNumber}
                            onChange={(e) => setRollNumber(e.target.value)}
                        />
                        <div className="w-4/5">
                            <label
                                htmlFor="documentName"
                                className="block text-gray-700"
                            >
                                Document Name
                            </label>
                            <input
                                id="documentName"
                                className="bg-gray-200 p-2 w-full text-black placeholder-gray-600"
                                type="text"
                                placeholder="Enter document name"
                                name="documentName"
                                value={documentName}
                                onChange={(e) =>
                                    setDocumentName(e.target.value)
                                }
                            />
                        </div>
                        <input
                            type="file"
                            onChange={handleFileUpload}
                            accept=".pdf"
                            className="p-2"
                        />
                        <input
                            className="bg-gray-200 p-2 w-4/5 text-black placeholder-gray-600"
                            type="text"
                            placeholder="Owner Address"
                            name="ownerAddress"
                            value={ownerAddress}
                            onChange={(e) => setOwnerAddress(e.target.value)}
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
