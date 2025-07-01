import { MongoClient, Db, ServerApiVersion } from "mongodb";
import mongoose from "mongoose";

const uri = process.env.MONGODB_URI ?? "";

export async function connectToDatabase() {
  await mongoose.connect(uri);
} 