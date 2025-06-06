"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { User } from "@/types/user";
import axios from "axios";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  status: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [status, setStatus] = useState(false);
  const router = useRouter();

  const EXPIRATION_KEY = "auth_exp";
  const USER_ID_KEY = "userId";

  const setUser = (user: User | null) => {
    setUserState(user);

    if (user) {
      const userId = user._id;
      const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 1 day in ms

      localStorage.setItem(USER_ID_KEY, userId);
      sessionStorage.setItem(USER_ID_KEY, userId);
      localStorage.setItem(EXPIRATION_KEY, expiresAt.toString());
      Cookies.set(USER_ID_KEY, userId, { expires: 1 });
      setStatus(true);
    } else {
      clearStorage();
    }
  };

  const clearStorage = () => {
    localStorage.removeItem(USER_ID_KEY);
    localStorage.removeItem(EXPIRATION_KEY);
    sessionStorage.removeItem(USER_ID_KEY);
    Cookies.remove(USER_ID_KEY);
    Cookies.remove("connect.sid");
    setUserState(null);
    setStatus(false);
  };

  const logout = async () => {
    try {
      const response = await axios.post(
        "/auth/logout",
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        clearStorage();
        router.push("/auth/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    const storedUserId =
      localStorage.getItem(USER_ID_KEY) ||
      sessionStorage.getItem(USER_ID_KEY) ||
      Cookies.get(USER_ID_KEY);

    const expiresAt = parseInt(localStorage.getItem(EXPIRATION_KEY) || "0");

    if (storedUserId && Date.now() < expiresAt) {
      api
        .get(`/auth/user/${storedUserId}`)
        .then((res) => {
          setUserState(res.data);
          setStatus(true);
        })
        .catch((err) => {
          console.error("Failed to fetch user:", err);
          clearStorage();
        });
    } else {
      clearStorage();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, logout, status }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
