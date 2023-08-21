import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

interface TokenPayload {
  id: string;
  username: string;
  email: string;
  // Add any other properties from the token payload here if needed
}

/**
 * Retrieves data from the JWT token stored in a cookie in the incoming request.
 *
 * @param {NextRequest} req - The incoming Next.js request object.
 * @returns {string} The ID extracted from the JWT token payload. (Id of the)
 * @throws {Error} If the token is invalid or any error occurs during the decoding process.
 */
export function getDataFromToken(req: NextRequest): string {
  try {
    const encodedToken = req.cookies.get("token")?.value || "";
    const decodedToken = jwt.verify(encodedToken, process.env.TOKENSECRET!) as TokenPayload;
    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error.message || "Invalid token");
  }
}
