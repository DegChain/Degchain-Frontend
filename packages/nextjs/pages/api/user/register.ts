import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { accountAddress, name, rollNumber, DOB } = reqBody;
    console.log(`reqBody: ${JSON.stringify(reqBody)}`);
    console.log(`accountAddress: ${accountAddress}`);

    const registerUser = useScaffoldContractWrite({
      contractName: "YourContract",
      functionName: "registerUser",
      args: [DOB, rollNumber, name, accountAddress],
      blockConfirmations: 1,
      onBlockConfirmation: txnReceipt => {
        console.log("Transaction blockHash", txnReceipt.blockHash);
      },
    });
    await registerUser.writeAsync();
    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(accountAddress, salt);
    return NextResponse.json({
      message: "User registered successfully",
      suceess: true,
      hash: hash,
    });
  } catch (err: any) {
    // return the error message as a json object, and set the status code to 500
    console.log(`Error in signup route: ${err}`);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
