"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { axios } from "axios";

const LoginPage = () => {
    const [user, setUser] = useState({ email: "", password: "" });

    const onLogin = async () => {};

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="">Login</h1>
            <hr />
            <label htmlFor="email">email</label>
            <input
                type="type"
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="email"
            />
            <label htmlFor="password">password</label>
            <input
                type="password"
                id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="password"
            />
            <button
                onClick={onLogin}
                className="p-2 border border-gray-300 rounded-xl my-4 focus:outline-none focus:border-gray-600"
            >
                Login
            </button>
            <Link href="/signup" className="">
                Signup
            </Link>
        </div>
    );
};

export default LoginPage;
