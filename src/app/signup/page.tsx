"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const SignupPage = () => {
    const router = useRouter();
    const [user, setUser] = useState({ email: "", password: "", username: "" });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success" + response.data);
            router.push("/login");
        } catch (error: any) {
            console.log("Signup failed " + error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (
            user.email.length > 0 &&
            user.password.length > 0 &&
            user.username.length > 0
        ) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="">{loading ? "Processing..." : "Signup"}</h1>
            <hr />
            <label htmlFor="username">username</label>
            <input
                type="text"
                id="username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder="username"
                className="text-black"
            />
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
                onClick={onSignup}
                className="p-2 border border-gray-300 rounded-xl my-4 focus:outline-none focus:border-gray-600"
            >
                {buttonDisabled ? "Disabled" : "Signup"}
            </button>
            <Link href="/login" className="">
                Login
            </Link>
        </div>
    );
};

export default SignupPage;
