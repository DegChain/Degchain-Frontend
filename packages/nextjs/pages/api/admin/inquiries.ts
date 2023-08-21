import { connect } from "../../../dbConfig/dbConfig";
import { NextApiRequest, NextApiResponse } from "next";
import Support, { ISupportModel } from "~~/models/support";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    connect();

    const inquiries: ISupportModel[] = await Support.find({}).sort({ createdAt: -1 });

    res.status(200).json(inquiries);
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    res.status(500).json({ message: "Failed to fetch inquiries." });
  }
}
