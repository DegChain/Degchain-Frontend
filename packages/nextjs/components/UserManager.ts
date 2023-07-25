import {
    contractAddress as DocContractAddress,
    abi as DocABI,
} from "@/constants/DocumentManager/index";
import {
    contractAddress as UserContractAddress,
    abi as UserABI,
} from "@/constants/UserManager/index";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { useNotification } from "web3uikit";
import { useState, useEffect } from "react";

export default function UserManager() {
    const { Moralis, isWeb3Enabled, chainId: chainIdHex, user } = useMoralis();
    const chainId = parseInt(chainIdHex!);
    console.log(`ChainId is ${chainId}`);
    const UserManagerAddress =
        chainId in DocContractAddress ? DocContractAddress[chainId][0] : null;

    //variable state for user registration
    const [DOB, setDOB] = useState("");
    const [rollNumber, setRollNumber] = useState("");
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useNotification();

    //primary functions
    //Register User
    const {
        runContractFunction: registerUser,
        data: enterTxRespone,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: UserABI,
        contractAddress: UserManagerAddress,
        functionName: "registerUser",
        params: { DOB, rollNumber },
    });

    // Login User
    const {
        runContractFunction: loginUser,
        data: loginUserResponse,
        isLoading: isLoginUserLoading,
        isFetching: isLoginUserFetching,
    } = useWeb3Contract({
        abi: UserABI,
        contractAddress: UserManagerAddress,
        functionName: "loginUser",
    });

    // Register Admin
    const {
        runContractFunction: registerAdmin,
        data: registerAdminResponse,
        isLoading: isRegisterAdminLoading,
        isFetching: isRegisterAdminFetching,
    } = useWeb3Contract({
        abi: UserABI,
        contractAddress: UserManagerAddress,
        functionName: "registerAdmin",
        params: { emailId, password },
    });

    //Login Admin
    const {
        runContractFunction: loginAdmin,
        data: loginAdminResponse,
        isLoading: isLoginAdminLoading,
        isFetching: isLoginAdminFetching,
    } = useWeb3Contract({
        abi: UserABI,
        contractAddress: UserManagerAddress,
        functionName: "loginAdmin",
    });

    //Add new record
    const {
        runContractFunction: setRollNumberToDOB,
        data: setRollNumberToDOBData,
        isLoading: isSetRollNumberToDOBLoading,
        isFetching: isSetRollNumberToDOBFetching,
    } = useWeb3Contract({
        abi: UserABI,
        contractAddress: UserManagerAddress,
        functionName: "setRollNumberToDOB",
        params: { rollNumber, dateOfBirth: DOB },
    });

    //viewing
    // Get User Details
    const {
        runContractFunction: getUser,
        data: getUserResponse,
        isLoading: isGetUserLoading,
        isFetching: isGetUserFetching,
    } = useWeb3Contract({
        abi: UserABI,
        contractAddress: UserManagerAddress,
        functionName: "getUser",
        params: { user }, // Pass the user's Ethereum address as the parameter
    });
    // Get Roll Number To DOB
    const {
        runContractFunction: getRollNumberToDOB,
        data: getRollNumberToDOBData,
        isLoading: isGetRollNumberToDOBLoading,
        isFetching: isGetRollNumberToDOBFetching,
    } = useWeb3Contract({
        abi: UserABI,
        contractAddress: UserManagerAddress,
        functionName: "getRollNumberToDOB",
        params: { rollNumber },
    });

    // Find Account Address By Roll Number
    const {
        runContractFunction: findAccountAddressByRollNumber,
        data: findAccountAddressByRollNumberData,
        isLoading: isFindAccountAddressByRollNumberLoading,
        isFetching: isFindAccountAddressByRollNumberFetching,
    } = useWeb3Contract({
        abi: UserABI,
        contractAddress: UserManagerAddress,
        functionName: "findAccountAddressByRollNumber",
        params: { rollNumber },
    });

    async function updateUIValues() {}
    useEffect(() => {
        if (isWeb3Enabled) {
            updateUIValues();
        }
    }, [isWeb3Enabled]);
    // no list means it'll update everytime anything changes or happens
    // empty list means it'll run once after the initial rendering
    // and dependencies mean it'll run whenever those things in the list change
    const handleNewNotification = () => {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Transaction Notification",
            position: "topR",
            //@ts-ignore
            icon: "bell",
        });
    };
    //@ts-ignore
    const handleSuccess = async (tx) => {
        try {
            await tx.wait(1);
            updateUIValues();
            //@ts-ignore
            handleNewNotification(tx);
        } catch (error) {
            console.log(error);
        }
    };
}
