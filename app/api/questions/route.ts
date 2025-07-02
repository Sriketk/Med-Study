import { NextRequest, NextResponse } from "next/server";
import mongoose, { Schema, models } from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";


let QbankSchema = new Schema({
  topic: String,
  subtopic: String,
  question: String,
  choices: [String],
  answer: String,
  explanation: String,
  source: String,
  created_at: String,
  embedding: [Number],
});

const topics = ["Biochemistry", "Biology", "Chemistry", "Physics", "Mathematics"];

const qbanks = models.qbanks || mongoose.model("qbanks", QbankSchema);


export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get('topic');  
  const qbanksFilter = {
    topic: topic,
  }
  try {
    await connectToDatabase();
    const result = await qbanks.findOne(qbanksFilter);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Database error", details: String(error) },
      { status: 500 }
    );
  }
}
