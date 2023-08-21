// logout out of the application, by clearing the session cookie i.e. clearing the token
import { NextResponse } from "next/server";

export async function GET() {
  try {
    //clear the session cookie
    const response = NextResponse.json({
      message: "Log out successful",
      status: 200,
      success: true,
    });
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    }); //this token will expire immediately
  } catch (error: any) {
    console.log(`There was some error in logout route: ${error}`);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
