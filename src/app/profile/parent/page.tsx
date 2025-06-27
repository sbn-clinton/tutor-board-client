"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { ProfileImageUploader } from "@/components/forms/profile-image-uploader";
import { ChildrenForm } from "@/components/forms/children-form";
import { PageTransition } from "@/components/animations/page-transition";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import api from "@/lib/axios";

export default function ParentProfile() {
  const { toast } = useToast();
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [about, setAbout] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);

  const router = useRouter();

  const { user, setUser, status } = useAuth();

  if (user === null) {
    return (
      <div className="min-h-screen bg-off-white dark:bg-dark-green">
        Loading...
      </div>
    );
  }

  if (!user) {
    router.push("/auth/login");
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileLoading(true);
    // In a real app, you would send the updated profile data to your backend
    // Example: axios.put('/api/parents/profile', formData)
    try {
      const res = await api.put(
        `${process.env.NEXT_PUBLIC_API_URL}/parent/update-profile`,
        {
          fullName,
          email,
          phone,
          location,
          about,
        },
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast({
          title: "Profile Updated",
          description:
            "Your profile information has been updated successfully.",
        });
        setUser(res.data.user);
        setProfileLoading(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error updating profile",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setProfileLoading(false);
    }
  };

  const handleImageUpload = (file: File) => {
    setProfileImage(file);
    // In a real app, you would upload the image to your backend or a storage service
    // Example:
    // const formData = new FormData()
    // formData.append('image', file)
    // axios.post('/api/upload-profile-image', formData)
  };

  const handleChildrenUpdate = (children: any[]) => {
    // setParent({ ...parent, children });
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-off-white dark:bg-dark-green">
        <div className="container px-4 py-10 md:px-6">
          <h1 className="mb-6 text-3xl font-bold text-dark-green dark:text-off-white">
            Parent Profile
          </h1>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="md:col-span-1"
            >
              <Card className="border-medium-green/20 bg-white dark:bg-forest-green/20">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center space-y-4">
                    <ProfileImageUploader
                      currentImage={
                        profileImage
                          ? URL.createObjectURL(profileImage)
                          : user!._id
                      }
                      onImageSelected={handleImageUpload}
                      name={user!.fullName}
                      path="parent"
                    />
                    <div className="text-center">
                      <h2 className="text-xl font-bold text-dark-green dark:text-off-white">
                        {user?.fullName}
                      </h2>
                      <p className="text-sm text-forest-green dark:text-lime/80">
                        {user?.location}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="md:col-span-2"
            >
              <Tabs defaultValue="profile">
                <TabsList className="mb-4 grid w-full grid-cols-2">
                  <TabsTrigger value="profile">Profile Information</TabsTrigger>
                  <TabsTrigger value="children">Children</TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                  <Card className="border-medium-green/20 bg-white dark:bg-forest-green/20">
                    <CardHeader>
                      <CardTitle className="text-dark-green dark:text-off-white">
                        Profile Information
                      </CardTitle>
                      <CardDescription className="text-forest-green dark:text-lime/80">
                        Update your personal information and contact details.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form
                        onSubmit={handleProfileUpdate}
                        className="space-y-4"
                      >
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label
                              htmlFor="name"
                              className="text-dark-green dark:text-off-white"
                            >
                              Full Name
                            </Label>
                            <Input
                              id="name"
                              defaultValue={user.fullName}
                              required
                              onChange={(e) => setFullName(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label
                              htmlFor="email"
                              className="text-dark-green dark:text-off-white"
                            >
                              Email Address
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              defaultValue={user.email}
                              required
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label
                              htmlFor="phone"
                              className="text-dark-green dark:text-off-white"
                            >
                              Phone Number
                            </Label>
                            <Input
                              id="phone"
                              defaultValue={user.phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label
                              htmlFor="location"
                              className="text-dark-green dark:text-off-white"
                            >
                              Location
                            </Label>
                            <Input
                              id="location"
                              defaultValue={user.location}
                              onChange={(e) => setLocation(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="bio"
                            className="text-dark-green dark:text-off-white"
                          >
                            About
                          </Label>
                          <Textarea
                            id="bio"
                            defaultValue={user.about}
                            placeholder="Tell us a bit about yourself and your children's educational needs..."
                            rows={4}
                            onChange={(e) => setAbout(e.target.value)}
                          />
                        </div>

                        <Button type="submit" disabled={profileLoading}>
                          {profileLoading ? "Saving..." : "Save Changes"}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="children">
                  <Card className="border-medium-green/20 bg-white dark:bg-forest-green/20">
                    <CardHeader>
                      <CardTitle className="text-dark-green dark:text-off-white">
                        Children Information
                      </CardTitle>
                      <CardDescription className="text-forest-green dark:text-lime/80">
                        Manage information about your children to help tutors
                        understand their needs.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ChildrenForm
                        children={user.children || []}
                        onChildrenUpdate={handleChildrenUpdate}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
