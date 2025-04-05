"use client"
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { User } from "next-auth";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function Navbar() {
    const { data: session } = useSession();
    const user: User = session?.user as User;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="p-4 md:p-6 shadow-md bg-gray-900 text-white">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <Link href="/" className="text-xl font-bold">Mystery Message</Link>
                    
                    {/* Mobile menu button */}
                    <button 
                        className="block md:hidden focus:outline-none" 
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <X size={24} />
                        ) : (
                            <Menu size={24} />
                        )}
                    </button>
                    
                    {/* Desktop navigation */}
                    <div className="hidden md:flex items-center space-x-4">
                        {session ? (
                            <>
                                <span className="mr-4">Welcome, {user.username || user.email}</span>
                                <Link href="/dashboard">
                                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                                        Dashboard
                                    </Button>
                                </Link>
                                <Button 
                                    className="bg-slate-100 text-black hover:bg-slate-200" 
                                    onClick={() => signOut()}
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <Link href='/sign-in'>
                                <Button className="bg-slate-100 text-black hover:bg-slate-200">
                                    Login
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
                
                {/* Mobile menu */}
                <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} pt-4`}>
                    {session ? (
                        <div className="flex flex-col space-y-3">
                            <span className="py-2 text-center">Welcome, {user.username || user.email}</span>
                            <Link href="/dashboard" className="w-full">
                                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                                    Dashboard
                                </Button>
                            </Link>
                            <Button 
                                className="w-full bg-slate-100 text-black hover:bg-slate-200" 
                                onClick={() => signOut()}
                            >
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <div className="flex justify-center">
                            <Link href='/sign-in' className="w-full">
                                <Button className="w-full bg-slate-100 text-black hover:bg-slate-200">
                                    Login
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;