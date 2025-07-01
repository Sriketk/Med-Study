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


const qbanks = models.qbanks || mongoose.model("qbanks", QbankSchema);

const qbanksFilter = {
  topic: "Biochemistry",
}


export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const result = await qbanks.findOne(qbanksFilter);
    // const result = await dumb.find(filter);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Database error", details: String(error) },
      { status: 500 }
    );
  }
}
