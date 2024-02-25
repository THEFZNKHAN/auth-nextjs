import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const response = NextResponse.json({
            message: "Logout successful",
            success: true,
        });
        // Clear the cookie
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0),
        });
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
