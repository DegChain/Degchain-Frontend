import { connect } from "../../../dbConfig/dbConfig";
import { NextApiRequest, NextApiResponse } from "next";
import Support, { ISupportModel } from "~~/models/support";

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  connect();

  if (req.method === "POST") {
    const { name, phone, email, message }: FormData = req.body;

    try {
      const support: ISupportModel = new Support({
        name,
        phone,
        email,
        message,
      });

      await support.save();

      res.status(200).json({ message: "Form data saved successfully." });
    } catch (error) {
      console.error("Failed to save form data:", error);
      res.status(500).json({ message: "Failed to save form data." });
    }
  } else {
    res.status(405).json({ message: "Method not Allowed" });
  }
}
