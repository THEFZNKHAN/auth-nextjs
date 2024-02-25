"use client";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const ProfilePage = () => {
    const router = useRouter();
    const [data, setData] = useState("nothing");

    const logoutHandle = () => {
        try {
            axios.get("/api/users/logout");
            toast.success("Logout successful");
            router.push("/login");
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    };

    const getUserDetails = async () => {
        try {
            const res = await axios.get("/api/users/me");
            console.log(res.data);
            setData(res.data.data._id);
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Toaster />
            <h1>Profile Page</h1>
            <hr />
            <p>Profile page content goes here</p>
            <h2 className="p-2 rounded bg-orange-500">
                {data === "nothing" ? (
                    "Nothing"
                ) : (
                    <Link href={`/profile/${data}`}>{data}</Link>
                )}
            </h2>
            <hr />
            <button
                onClick={logoutHandle}
                className="p-2 border border-gray-300 rounded-xl my-4 focus:outline-none focus:border-gray-600"
            >
                Logout
            </button>
            <button
                onClick={getUserDetails}
                className="p-2 border border-gray-300 rounded-xl my-4 focus:outline-none focus:border-gray-600"
            >
                Get User Details
            </button>
        </div>
    );
};

export default ProfilePage;
