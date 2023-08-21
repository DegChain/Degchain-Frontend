import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { rollNumber, dateOfBirth } = reqBody;
    console.log(`reqBody: ${JSON.stringify(reqBody)}`);

    const setRollNumberToDOB = useScaffoldContractWrite({
      contractName: "YourContract",
      functionName: "setRollNumberToDOB",
      //@ts-ignore
      args: [rollNumber, dateOfBirth],
    });
    await setRollNumberToDOB.writeAsync();

    return NextResponse.json({
      message: "New data for a student created successfully",
      suceess: true,
    });
  } catch (err: any) {
    // return the error message as a json object, and set the status code to 500
    console.log(`Error in signup route: ${err}`);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
