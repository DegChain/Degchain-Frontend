import mongoose from "mongoose";

const MONGODB_URL =
  "mongodb+srv://vivekup3424:xNw2aH4VGpg2N8DuShq6AD63Mc@cluster0.sbs72vk.mongodb.net/?retryWrites=true&w=majority";

if (!MONGODB_URL) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}
//@ts-ignore
let cached = global.mongoose;

if (!cached) {
  //@ts-ignore
  cached = global.mongoose = { con: null, promise: null };
}

const dbConnect = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  // If a connection does not exist, we check if a promise is already in progress. If a promise is already in progress, we wait for it to resolve to get the connection
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URL, opts).then(mongoose => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
};

export default dbConnect;
