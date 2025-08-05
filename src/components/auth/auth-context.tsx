"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: (val: boolean) => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const cookies = document.cookie.split(";").map(c => c.trim());
    const token = cookies.find(c => c.startsWith("token="));
    setIsLoggedIn(!!token);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
