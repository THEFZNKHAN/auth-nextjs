"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const LoginPage = () => {
    const router = useRouter();
    const [user, setUser] = useState({ email: "", password: "" });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success" + response.data);
            toast.success("Login successful");
            router.push("/profile");
        } catch (error: any) {
            console.log("Login failed " + error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Toaster />
            <h1 className="">{loading ? "Processing..." : "Login"}</h1>
            <hr />
            <label htmlFor="email">email</label>
            <input
                type="type"
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="email"
                className="text-black"
            />
            <label htmlFor="password">password</label>
            <input
                type="password"
                id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="password"
                className="text-black"
            />
            <button
                onClick={onLogin}
                className="p-2 border border-gray-300 rounded-xl my-4 focus:outline-none focus:border-gray-600"
            >
                {buttonDisabled ? "Fill in details" : "Login"}
            </button>
            <Link href="/signup" className="">
                Signup
            </Link>
        </div>
    );
};

export default LoginPage;
