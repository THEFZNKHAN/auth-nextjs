import { NextRequest, NextResponse } from "next/server";
import { getTokenData } from "@/helpers/getTokenData";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

export const GET = async (request: NextRequest) => {
    try {
        await connect();
        const userId = await getTokenData(request);
        const user = await User.findOne({ _id: userId }).select("-password");
        if (!user) {
            throw new Error("User not found");
        }
        return NextResponse.json({ message: "User found", data: user });
    } catch (error: any) {
        console.error("Error in GET request:", error);
        return NextResponse.json(
            { error: "Failed to fetch user data" },
            { status: 400 }
        );
    }
};
