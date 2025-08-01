import { connectToDatabase } from "@/app/lib/db"
import { RestaurantsSchema } from "@/app/lib/RestaurantsModel";
import { NextResponse } from "next/server"

export async function GET() {
    try {
        await connectToDatabase();
        const data = await RestaurantsSchema.find()
        console.log(data);

        return NextResponse.json({ success: true, result: data })
    } catch (error) {
        console.error('GET restaurants error:', error);
        return NextResponse.json({
            success: false,
            error: "Failed to fetch restaurants"
        }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const payload = await request.json();
        let result;
        let success = false;
        
        await connectToDatabase();
        
        if (payload.login) {
            result = await RestaurantsSchema.findOne({ 
                email: payload.email, 
                password: payload.password 
            });
            
            if (result) {
                success = true;
                // Return sanitized data (without password)
                result = {
                    _id: result._id,
                    name: result.name,
                    email: result.email,
                    contact: result.contact,
                    city: result.city,
                    address: result.address
                };
            }
        } else {
            const restaurant = new RestaurantsSchema(payload);
            result = await restaurant.save();
            
            if (result) {
                success = true;
                // Return sanitized data (without password)
                result = {
                    _id: result._id,
                    name: result.name,
                    email: result.email,
                    contact: result.contact,
                    city: result.city,
                    address: result.address
                };
            }
        }
        
        console.log(payload);
        return NextResponse.json({ result, success })
    } catch (error) {
        console.error('POST restaurant error:', error);
        return NextResponse.json({
            success: false,
            error: "Failed to process restaurant request"
        }, { status: 500 });
    }
}