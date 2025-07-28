import { connectionStr } from "@/app/lib/db";
import { RestaurantsSchema } from "@/app/lib/RestaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    await mongoose.connect(connectionStr,{useNewUrlParser:true})
    let result = await RestaurantsSchema.find();
     result = result.map((item)=>item.city);
     result = [...new Set(result.map((item)=>item))]
    return NextResponse.json({success:true,result})    
}