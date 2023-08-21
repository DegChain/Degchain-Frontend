import { NextRequest, NextResponse } from "next/server";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export default async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { accountAddress, emailId, password } = reqBody;
    console.log(`reqBody: ${JSON.stringify(reqBody)}`);
    console.log(`accountAddress: ${accountAddress}`);
    console.log("Reading the contract");
    const registerAdmin = useScaffoldContractWrite({
      contractName: "YourContract",
      functionName: "registerAdmin",
      args: [emailId, password, accountAddress],
    });
    console.log("await registerAdmin.writeAsync()");
    await registerAdmin.writeAsync();
    return NextResponse.json({
      message: "Admin registered successfully",
      success: true,
    });
  } catch (err: any) {
    // return the error message as a json object, and set the status code to 500
    console.log(`Error in signup route: ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
