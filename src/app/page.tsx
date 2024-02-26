import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Gimme Roomies</h1>
      <Link className="" href="/auth/login">Visit Login Page Here</Link>
      <Link className="" href="/auth/signup">Visit Signup Page Here</Link>
    </div>

  )
}
