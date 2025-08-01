import { connectToDatabase } from "@/app/lib/db";
import { userSchema } from "@/app/lib/userModel";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const payload = await request.json();
        
        if (!payload.email || !payload.password) {
            return NextResponse.json(
                { success: false, error: "Email and password are required" },
                { status: 400 }
            );
        }

        // Use optimized database connection
        await connectToDatabase();
        
        const result = await userSchema.findOne({
            email: payload.email, 
            password: payload.password
        });

        if (result) {
            return NextResponse.json({
                success: true,
                result: {
                    _id: result._id,
                    name: result.name,
                    email: result.email,
                    mobile: result.mobile,
                    address: result.address,
                    city: result.city
                }
            });
        } else {
            return NextResponse.json({
                success: false,
                error: "Invalid email or password"
            }, { status: 401 });
        }
    } catch (error) {
        console.error('Login API error:', error);
        return NextResponse.json({
            success: false,
            error: "Internal server error"
        }, { status: 500 });
    }
}