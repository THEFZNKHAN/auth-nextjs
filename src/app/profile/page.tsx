"use client";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
    const router = useRouter();

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

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Toaster />
            <h1>Profile Page</h1>
            <hr />
            <p>Profile page content goes here</p>
            <hr />
            <button
                onClick={logoutHandle}
                className="p-2 border border-gray-300 rounded-xl my-4 focus:outline-none focus:border-gray-600"
            >
                Logout
            </button>
        </div>
    );
};

export default ProfilePage;
