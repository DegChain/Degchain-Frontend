import mongoose, { Document, Model, Schema } from "mongoose";

// Interface for Support document
export interface ISupportModel extends Document {
  name: string;
  phone: string;
  email: string;
  message: string;
  createdAt: Date;
}

// Define the Support schema
const supportSchema: Schema<ISupportModel> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

// Create the Support model
const Support: Model<ISupportModel> = mongoose.model<ISupportModel>("Support", supportSchema);

export default Support;
