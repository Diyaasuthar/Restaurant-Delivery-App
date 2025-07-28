import { connectionStr } from "@/app/lib/db"
import { RestaurantsSchema } from "@/app/lib/RestaurantsModel";
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function GET() {
    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    const data = await RestaurantsSchema.find()
    console.log(data);

    return NextResponse.json({ result: data })
}

export async function POST(request) {
    let payload = await request.json();
    let result;
    let success = false;
    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    if (payload.login) {
        result = await RestaurantsSchema.findOne({ email: payload.email, password: payload.password })//use it for Login
        if (result) {
            success = true
        }
    } else {
        const restaurant = new RestaurantsSchema(payload);
        result = await restaurant.save();//use it for singup
        if (result) {
            success = true
        }
    }
    console.log(payload);
    return NextResponse.json({ result, success })
}