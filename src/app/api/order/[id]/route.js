import { connectionStr } from "@/app/lib/db";
import { orderSchema } from "@/app/lib/ordersModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function PATCH(request, content) {
    let params = await content.params;
    const id = params.id;
    const payload = await request.json();
    console.log('Updating order with ID:', id, 'Payload:', payload);
    let success = false;
    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    const result = await orderSchema.updateOne({ _id: id}, { $set: payload });
    if (result.modifiedCount > 0) {
        success = true;
    }
    return NextResponse.json({ result, success });
}