"use client";

import Link from "next/link";
import React, { useEffect } from "react"
import { useRouter } from "next/navigation";
import axios from "axios";


export default function Signup() {
    const router = useRouter();

    const [user, setUser] = React.useState({
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

    const onSignup = async () => {
        try {
            setLoading(true)
            const response = await axios.post('/api/user/signup', user)
            router.push('/login')
        } catch (error: any) {
            console.log("Signup Failed", error.message)
        } finally {
            setLoading(false)
        }
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "processing..." : "Signup"}</h1>
            <hr />
            <label htmlFor="username">User Name</label>
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
            <button onClick={onSignup} disabled={buttonDisabled} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled ? 'No Signup' : 'Signup'}</button>
            <Link href="/login">Visit Login Page Here</Link>
        </div>
    );
}