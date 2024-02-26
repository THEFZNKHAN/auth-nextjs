"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const VerifyEmailPage = () => {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post("api/users/verifyemail", { token });
            setVerified(true);
        } catch (error: any) {
            setError(true);
            console.log(error.response.data);
        }
    };

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold">Verify Email</h1>
            <h2 className="text-3xl rounded-lg font-semibold my-2 p-2 bg-orange-500 text-black">
                {token ? `${token}` : "no token found"}
            </h2>

            {verified && (
                <>
                    <h2 className="text-2xl font-semibold p-2 bg-green-500 text-black">
                        Email verified
                    </h2>
                    <Link href="/login">Go to login page</Link>
                </>
            )}

            {error && (
                <h2 className="text-2xl font-semibold p-2 bg-red-500 text-black">
                    Error verifying email
                </h2>
            )}
        </div>
    );
};

export default VerifyEmailPage;
