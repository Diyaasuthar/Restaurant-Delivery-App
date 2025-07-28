import { connectionStr } from "@/app/lib/db";
import { Food } from "@/app/lib/FoodsModel";
import { RestaurantsSchema } from "@/app/lib/RestaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, content) {
    const id = content.params.id;

    await mongoose.connect(connectionStr, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const details = await RestaurantsSchema.findOne({ _id: id });
    const foodItems = await Food.find({ resto_id: id });

    console.log(foodItems, details)

    return NextResponse.json({
        success: true,
        details,
        foodItems,
    });
}
