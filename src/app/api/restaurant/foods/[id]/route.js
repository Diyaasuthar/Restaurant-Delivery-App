import { connectionStr } from "@/app/lib/db";
import mongoose, { connect } from "mongoose";
import { NextResponse } from "next/server";
import { Food } from "@/app/lib/FoodsModel";

export async function GET(request,Content){
    const id = Content.params.id
    console.log(id);
    let success=false;
    await mongoose.connect(connectionStr,{useNewUrlParser:true});
    const result = await Food.find({resto_id:id});
    if(result){
        success=true;
    }

    return NextResponse.json({result,success})
}

export async function DELETE(request,content){
    const id = content.params.id;
    let success = false;
    await mongoose.connect(connectionStr,{useNewUrlParser:true});
    const result = await Food.deleteOne({_id:id})
    if(result.deletedCount>0){
        
        success=true
    }

    return NextResponse.json({result,success})
}