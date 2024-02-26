"use client";
import Link from "next/link";
import React, { FormEvent, useEffect } from "react"
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { signUpSchema } from "@/helpers/schema";
import { handleValidationError } from "@/components/error";

interface SignupInterface {
    email: string;
    password: string;
    username: string;
}
export default function Signup() {
    const router = useRouter();

    const [user, setUser] = React.useState<SignupInterface>({
        email: "",
        password: "",
        username: "",
    });
    const [loading, setLoading] = React.useState<boolean>(false);
    const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(false);
    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user]);

    const onSignup = async (event: FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            setLoading(true)
            const parseResponse = signUpSchema.safeParse(user)
            if (!parseResponse.success) {
                handleValidationError<SignupInterface>(parseResponse.error)
                return;
            }
            const response = await axios.post('/api/auth/signup', user)
            router.push('/login')
        } catch (error: any) {
            toast.error(error.response.data.error)
        } finally {
            setLoading(false)
        }
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Toaster />
            <h1>{loading ? "processing..." : "Signup"}</h1>
            <hr />
            <label htmlFor="username">User Name</label>
            <form onSubmit={onSignup} className="flex flex-col items-center py-2">
                <input
                    className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    id="username"
                    type="text"
                    value={user.username}
                    onChange={e => setUser({ ...user, username: e.target.value })}
                    placeholder="username"
                />
                <label htmlFor="email">Email</label>
                <input
                    className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    id="email"
                    type="text"
                    value={user.email}
                    onChange={e => setUser({ ...user, email: e.target.value })}
                    placeholder="email"
                />
                <label htmlFor="password">Password</label>
                <input
                    className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    id="password"
                    type="text"
                    value={user.password}
                    onChange={e => setUser({ ...user, password: e.target.value })}
                    placeholder="password"
                />
                <button disabled={buttonDisabled} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled ? 'No Signup' : 'Signup'}</button>
            </form>
            <Link href="/auth/login">Visit Login Page Here</Link>
        </div>
    );
}