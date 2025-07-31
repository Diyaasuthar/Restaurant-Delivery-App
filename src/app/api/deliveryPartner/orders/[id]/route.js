import { connectionStr } from "@/app/lib/db";
import { orderSchema } from "@/app/lib/ordersModel";
import { RestaurantsSchema } from "@/app/lib/RestaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, content) {
    const params = await content.params;
    const id = params.id;
    let success = false;

    await mongoose.connect(connectionStr, { useNewUrlParser: true });

    let result = await orderSchema.find({ deliveryBoy_id: id });

    if (result) {
        let restoData = await Promise.all(
            result.map(async (item) => {
                console.log('item:', item);
                let restoInfo = {};
                restoInfo.amount = item.amount;
                restoInfo.status = item.status;
                restoInfo.data = await RestaurantsSchema.findOne({ _id: item.resto_id});
                restoInfo.orderId = item._id;
                return restoInfo;
            })
        );
        result = restoData;
        success = true;
    }

    return NextResponse.json({ result, success });
}

