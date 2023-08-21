import { NextRequest, NextResponse } from "next/server";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { accountAddress, password } = reqBody;
    console.log(`reqBody: ${JSON.stringify(reqBody)}`);
    console.log(`accountAddress: ${accountAddress}`);
    const loginAdmin = useScaffoldContractRead({
      contractName: "YourContract",
      functionName: "loginAdmin",
      args: [accountAddress],
    });
    const admin = await loginAdmin.data;
    console.log(`admin: ${JSON.stringify(admin)}`);
    const tokenData = {
      accountAddress: admin.accountAddress,
    };
    const token = jwt.sign(tokenData, process.env.TOKENSECRET!, {
      expiresIn: "1h",
    });
    //create an response
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });
    // set the token as a cookie in the response
    response.cookies.set("token", token, { httpOnly: true });

    //return the response, and send the cookie to the client browser
    return response;
  } catch (error) {
    console.log(error);
  }
}
