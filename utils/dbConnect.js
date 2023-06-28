import mongoose from "mongoose";
import { errorToJSON } from "next/dist/server/render";

const DB_URL =
  "mongodb+srv://admin:admin@cluster0.rfxyxuu.mongodb.net/?retryWrites=true&w=majority";

if (!DB_URL) {
  throw new Error(errorToJSON("DB ERROR"));
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = mongoose.connect(DB_URL, options).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
};

export default dbConnect;
