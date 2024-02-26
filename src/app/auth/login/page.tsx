"use client"
import { handleValidationError } from "@/components/error";
import { loginSchema } from "@/helpers/schema";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";

interface LoginInterface {
    email: string,
    password: string
}
export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState<LoginInterface>({
        email: "",
        password: ""
    })

    const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false)
    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user]);

    const onLogin = async () => {
        try {
            setLoading(true)

            const parsedResponse = loginSchema.safeParse(user)

            if (!parsedResponse.success) {
                handleValidationError<LoginInterface>(parsedResponse.error)
                return;
            }
            const response = await axios.post('/api/auth/login', user)


            console.log(response)
            router.push("/profile")
        } catch (error: any) {
            console.log(error.message)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Toaster />
            <h1>{loading ? 'Processing' : 'Login'}</h1>
            <hr />
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
            <button onClick={onLogin} disabled={buttonDisabled} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled ? 'No Login' : 'Login'}</button>
            <Link href="/auth/signup">Visit Signup Page Here</Link>
        </div>
    );
}