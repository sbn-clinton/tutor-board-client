"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { PageTransition } from "@/components/animations/page-transition";
import { motion } from "framer-motion";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser, status, user } = useAuth();

  if (status) {
    router.push(`/profile/${user?.role}`);
  }

  const handleLogin = async (e: React.FormEvent, role: string) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      const userData = response.data.user; // ✅ adjust based on your backend
      setUser(userData); // ✅ store user globally

      console.log(userData);
      if (response.status === 200) {
        toast({
          title: "Login Successful",
          description: `You have been logged in as a ${role}.`,
        });

        // Redirect based on role
        if (role === "parent") {
          router.push("/profile/parent");
        } else {
          router.push("/profile/tutor");
        }
      } else {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again later.",
        });
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="container flex h-screen items-center justify-center px-4 py-10 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">
                Login to Tutor Board
              </CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="parent" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="parent">Parent</TabsTrigger>
                  <TabsTrigger value="tutor">Tutor</TabsTrigger>
                </TabsList>

                <TabsContent value="parent">
                  <form
                    onSubmit={(e) => handleLogin(e, "parent")}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="parent-email">Email</Label>
                      <Input
                        id="parent-email"
                        type="email"
                        placeholder="name@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="parent-password">Password</Label>
                        <Link
                          href="/auth/reset-password"
                          className="text-xs text-gray-500 underline-offset-4 hover:underline"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <Input
                        id="parent-password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? "Logging in..." : "Login as Parent"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="tutor">
                  <form
                    onSubmit={(e) => handleLogin(e, "tutor")}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="tutor-email">Email</Label>
                      <Input
                        id="tutor-email"
                        type="email"
                        placeholder="name@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="tutor-password">Password</Label>
                        <Link
                          href="/auth/reset-password"
                          className="text-xs text-gray-500 underline-offset-4 hover:underline"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <Input
                        id="tutor-password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? "Logging in..." : "Login as Tutor"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col">
              <div className="mt-2 text-center text-sm text-gray-500">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/register"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  Register
                </Link>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </PageTransition>
  );
}
