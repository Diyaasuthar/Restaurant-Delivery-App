import { connectionStr } from "@/app/lib/db";
import { deliveryPartnerSchema } from "@/app/lib/deliverypartnersModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
    const payload = await request.json();
    let success = false;
    await mongoose.connect(connectionStr,{userNewUrlParser:true});
    const result = await deliveryPartnerSchema.findOne({mobile : payload.mobile, password : payload.password})
    if(result){
        success=true;
    }
    return NextResponse.json({result,success})
}