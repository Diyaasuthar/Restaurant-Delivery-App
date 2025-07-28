import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { Food } from "@/app/lib/FoodsModel";
import { connectionStr } from "@/app/lib/db";

export async function POST(request) {
  const payload = await request.json();
  let success=false;

  await mongoose.connect(connectionStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const food = new Food(payload);
  const result = await food.save();

  if(result){
    success=true
  }

  return NextResponse.json({ result, success });
}
