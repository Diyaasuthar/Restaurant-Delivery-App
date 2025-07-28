import { connectionStr } from "@/app/lib/db";
import { orderSchema } from "@/app/lib/ordersModel";
import { RestaurantsSchema } from "@/app/lib/RestaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
    const payload = await request.json();
    await mongoose.connect(connectionStr,{useNewUrlParser:true})
    let success = false;
    const orderObj = new orderSchema(payload);
    
    
    const result = await orderObj.save();
    console.log("result", result)
    if(result){
        success = true
    }

    return NextResponse.json({result,success})
}

export async function GET(request) {
    const userId = request.nextUrl.searchParams.get('id');
    let success = false
    await mongoose.connect(connectionStr,{useNewUrlParser:true})
    let result = await orderSchema.find({user_id:userId});
    if(result){
        let restoData = await Promise.all(
            result.map(async (item)=>{
                let restoInfo ={};
                restoInfo.amount=item.amount;
                restoInfo.status=item.status;
                restoInfo.data = await RestaurantsSchema.findOne({_id:item.resto_id})
                return restoInfo;
            })
        )
        result = restoData; 
        success=true
    }
    return NextResponse.json({result,success})
    
}