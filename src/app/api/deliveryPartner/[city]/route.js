import { connectionStr } from "@/app/lib/db";
import { deliveryPartnerSchema } from "@/app/lib/deliverypartnersModel";

import mongoose from "mongoose";
import { NextResponse } from "next/server"

export async function GET(request,content){
    const params = await content.params
    console.log('content:', params);
    let city= params.city
    let success=false;
    await mongoose.connect(connectionStr,{useNewUrlParser:true});
    let filter ={city:{$regex:new RegExp(city,'i')}}
    const result = await deliveryPartnerSchema.find(filter)
   return NextResponse.json({result, success})
}