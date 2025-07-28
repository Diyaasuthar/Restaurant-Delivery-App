import { connectionStr } from "@/app/lib/db";
import { orderSchema } from "@/app/lib/ordersModel";
import { RestaurantsSchema } from "@/app/lib/RestaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, context) {
    const id = context.params.id;
    let success = false;

    await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });

    let result = await orderSchema.find({ deliveryBoy_id: id });
    
    if (result.length > 0) {
        let restoData = await Promise.all(
            result.map(async (item) => {
                let restoInfo = {};
                restoInfo.amount = item.amount;
                restoInfo.status = item.status;
                restoInfo.data = await RestaurantsSchema.findOne({ _id: item.resto_id });
                return restoInfo;
            })
        );
        success = true;
        return NextResponse.json({ result: restoData, success });
    }

    return NextResponse.json({ result: [], success });
}
