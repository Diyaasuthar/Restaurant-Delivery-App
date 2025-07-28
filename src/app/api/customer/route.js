import { connectionStr } from "@/app/lib/db";
import { RestaurantsSchema } from "@/app/lib/RestaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server"

export async function GET(request) {
    let queryParams = request.nextUrl.searchParams
    console.log(queryParams.get('restaurant'))
    let fileter={}
    if(queryParams.get("location")){
        let city = queryParams.get("location");
        fileter={city:{$regex:new RegExp(city,'i')}}
    }else if(queryParams.get('restaurant')){
         let name = queryParams.get("restaurant");
        fileter={name:{$regex:new RegExp(name,'i')}}
    }
    await mongoose.connect(connectionStr,{useNewUrlParser:true});
    let result = await RestaurantsSchema.find(fileter)
    return NextResponse.json({success:true,result})
    
}