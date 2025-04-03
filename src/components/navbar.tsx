"use client"
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { User } from "next-auth";
import { Button } from "@/components/ui/button";

function Navbar() {
    const { data: session } = useSession()
    const user: User = session?.user as User
  
    return (
        <nav className="p-4 md:p-6 shadow-md bg-gray-900 text-white">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <Link href="/" className="text-xl font-bold mb-4 md:mb-0 ">Mystery Message</Link>
                
                {session ? (
                    <div className="flex flex-col md:flex-row items-center gap-3">
                        <span className="mb-2 md:mb-0 md:mr-4">Welcome, {user.username || user.email}</span>
                        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                            <Link href="/dashboard">
                                <Button className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white">
                                    Dashboard
                                </Button>
                            </Link>
                            <Button 
                                className="w-full md:w-auto bg-slate-100 text-black hover:bg-slate-200" 
                                onClick={() => signOut()}
                            >
                                Logout
                            </Button>
                        </div>
                    </div>
                ) : (
                    <Link href='/sign-in'>
                        <Button className="w-full md:w-auto bg-slate-100 text-black hover:bg-slate-200">
                            Login
                        </Button>
                    </Link>
                )}
            </div>
        </nav>
    )
}

export default Navbar