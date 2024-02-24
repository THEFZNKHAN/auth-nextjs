import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";

import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";

export const POST = async (request: NextRequest) => {
    try {
        connect();
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        // check if user already exists
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { error: "User doesn't exists" },
                { status: 400 }
            );
        }

        // check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password);

        if (!validPassword) {
            return NextResponse.json(
                { error: "Invalid password" },
                { status: 400 }
            );
        }

        // create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };
        // create token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
            expiresIn: "1d",
        });

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        });
        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
