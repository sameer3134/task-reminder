"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login"; // redirect after logout
  };
   const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if token cookie exists
    const cookies = document.cookie.split(";").map(c => c.trim());
    const tokenCookie = cookies.find(c => c.startsWith("token="));
    console.log("S",tokenCookie)
    setIsLoggedIn(!!tokenCookie);
  }, []);

 console.log(isLoggedIn)
  return (
    <header className="bg-gray-800 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link href="/" className="text-xl font-bold hover:text-gray-300 transition">
          Logo
        </Link>
 <nav className="flex gap-4">
          {isLoggedIn ? (
            <>
              <Link href="/login" className="hover:text-gray-300 transition">
                Login
              </Link>
              <Link href="/register" className="hover:text-gray-300 transition">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link href="/profile" className="hover:text-gray-300 transition">
                Profile
              </Link>
              <button onClick={handleLogout} className="hover:text-gray-300 transition">
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
