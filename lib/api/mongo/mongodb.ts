import { MongoClient, Db, ServerApiVersion } from "mongodb";
import mongoose from "mongoose";
let isConnected = false;
const uri = process.env.MONGODB_URI ?? "";

export async function connectToDatabase() {
  if (isConnected) return;
  await mongoose.connect(uri);
  isConnected = true;
}
