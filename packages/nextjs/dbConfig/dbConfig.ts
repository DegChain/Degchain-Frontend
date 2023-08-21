import "dotenv/config";
import mongoose from "mongoose";

export const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/nextjs");
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });
    connection.on("error", err => {
      console.log("Mongoose Connection Error : " + err);
      process.exit(1);
    });
  } catch (error) {
    console.log("Something went wrong while connecting to MongoDB");
    console.log(error);
  }
};
