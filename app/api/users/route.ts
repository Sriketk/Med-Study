import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    return NextResponse.json({ message: "Hello, world!" });
    //   const user = await db.collection("users").findOne({ userId });
    //   if (!user) {
    //     return NextResponse.json({ error: "User not found" }, { status: 404 });
    //   }
    //   return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Database error", details: String(error) },
      { status: 500 }
    );
  }
}
