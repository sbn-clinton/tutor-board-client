"use client";

import type React from "react";

import { useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageTransition } from "@/components/animations/page-transition";
import { motion } from "framer-motion";
import Parent from "@/components/register/parent";
import Tutor from "@/components/register/tutor";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();

  const { status, user } = useAuth();

  if (status) {
    router.push(`/profile/${user?.role}`);
  }

  return (
    <PageTransition>
      <div className="container flex min-h-screen items-center justify-center px-4 py-10 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">
                Create an Account
              </CardTitle>
              <CardDescription>
                Choose your account type and fill in your details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="parent" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="parent">Parent</TabsTrigger>
                  <TabsTrigger value="tutor">Tutor</TabsTrigger>
                </TabsList>

                <Parent />

                <Tutor />
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col">
              <div className="mt-2 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  Login
                </Link>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </PageTransition>
  );
}
