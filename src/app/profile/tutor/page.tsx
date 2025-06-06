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
import { ExperienceForm } from "@/components/forms/experience-form";
import { FileUploader } from "@/components/forms/file-uploader";
import { PageTransition } from "@/components/animations/page-transition";
import { Badge } from "@/components/ui/badge";
import { X, Plus, FileText, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function TutorProfilePage() {
  const { toast } = useToast();
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [certName, setCertName] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [year, setYear] = useState("");
  const [certLoading, setCertLoading] = useState(false);
  const [certificateFiles, setCertificateFiles] = useState<File[]>([]);

  const [isSaving, setIsSaving] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const router = useRouter();

  const { setUser, user } = useAuth();

  const tutor = user;
  // Push to login in an effect
  useEffect(() => {
    if (!tutor) {
      router.push("/");
    }
  }, [tutor]);

  if (!tutor) {
    return (
      <div className="min-h-screen bg-off-white dark:bg-dark-green">
        Loading...
      </div>
    );
  }
  // Set selectedDays when tutor is available
  useEffect(() => {
    if (Array.isArray(tutor?.availableDays)) {
      setSelectedDays(tutor.availableDays);
    }
  }, [tutor]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send the updated profile data to your backend
    // Example: axios.put('/api/tutors/profile', formData)

    try {
      setIsLoading(true);
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/tutor/update-profile`,
        {
          fullName,
          email,
          phone,
          location,
          bio,
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
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error updating profile",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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

  const handleCertificateUpload = (files: File[]) => {
    setCertificateFiles(files);
  };

  const addSubject = async () => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/tutor/update-subjects`,
        {
          subject: newSubject.trim(),
        },
        { withCredentials: true }
      );
      if (res.status === 200) {
        setUser(res.data.user);
        setNewSubject("");
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error updating subjects",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const removeSubject = async (subject: string) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/tutor/update-subjects/${subject}`,
        { withCredentials: true }
      );
      if (res.status === 200) {
        setUser(res.data.user);
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error updating subjects",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const addCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(certName, schoolName, year, certificateFiles);

    if (!certName || !schoolName || !year || !certificateFiles.length) {
      toast({
        title: "Error adding certificate",
        description: "Please fill out all fields.",
        variant: "destructive",
      });
      return;
    }

    setCertLoading(true);

    try {
      const formData = new FormData();
      formData.append("certName", certName);
      formData.append("schoolName", schoolName);
      formData.append("year", year);

      // Add files to form data (field name must be 'certificates' for multer)
      certificateFiles.forEach((file) => {
        formData.append("certificates", file); // multer will look for this field
      });

      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/tutor/update-certificates`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        setUser(res.data.user);
        setCertificateFiles([]);
        toast({
          title: "Certificate added",
          description: "Your certificate has been added successfully.",
        });
        setCertName("");
        setSchoolName("");
        setYear("");
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error adding certificate",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setCertLoading(false);
    }
  };

  const removeCertificate = (certificateId: string) => {
    toast({
      title: "Certificate removed",
      description: "Certificate has been removed successfully.",
    });
  };

  const handleAvailableDaysSubmit = async () => {
    if (selectedDays?.length === 0) {
      toast({
        title: "Error updating available days",
        description: "Please select at least one day.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSaving(true);
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/tutor/available-days`,
        { availableDays: selectedDays },
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast({
          title: "Available days updated successfully.",
          description: "Your available days have been updated.",
        });
        setUser(res.data.user);
        setIsOpen(false); // close the dropdown
      }
    } catch (error) {
      console.error("Error updating available days:", error);
      toast({
        title: "Error updating available days",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-off-white dark:bg-dark-green">
        <div className="container px-4 py-10 md:px-6">
          <h1 className="mb-6 text-3xl font-bold text-dark-green dark:text-off-white">
            Tutor Profile
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
                          : tutor._id
                      }
                      onImageSelected={handleImageUpload}
                      name={tutor.fullName}
                      path="tutor"
                    />
                    <div className="text-center">
                      <h2 className="text-xl font-bold text-dark-green dark:text-off-white">
                        {tutor.fullName}
                      </h2>
                      <p className="text-sm text-forest-green dark:text-lime/80">
                        {tutor.location}
                      </p>
                    </div>

                    {/* Multi-select Days Dropdown */}
                    <div className="w-full">
                      <label className="block mb-1 text-dark-green dark:text-off-white text-sm font-medium">
                        Available Days
                      </label>

                      <Popover open={isOpen} onOpenChange={setIsOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            {selectedDays.length > 0
                              ? selectedDays.join(", ")
                              : "Select days"}
                          </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-full p-4">
                          <div className="grid gap-2">
                            {daysOfWeek.map((day) => (
                              <label
                                key={day}
                                className="flex items-center gap-2"
                              >
                                <Checkbox
                                  checked={selectedDays.includes(day)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setSelectedDays((prev) => [...prev, day]);
                                    } else {
                                      setSelectedDays((prev) =>
                                        prev.filter((d) => d !== day)
                                      );
                                    }
                                  }}
                                />
                                <span className="text-sm">{day}</span>
                              </label>
                            ))}
                          </div>

                          <Button
                            onClick={handleAvailableDaysSubmit}
                            className="mt-4 w-full"
                            disabled={isSaving}
                          >
                            {isSaving ? "Saving..." : "Save"}
                          </Button>
                        </PopoverContent>
                      </Popover>
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
                <TabsList className="mb-4 grid w-full grid-cols-4">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="subjects">Subjects</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="certificates">Certificates</TabsTrigger>
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
                              defaultValue={tutor.fullName}
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
                              defaultValue={tutor.email}
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
                              defaultValue={tutor.phone}
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
                              defaultValue={tutor.location}
                              onChange={(e) => setLocation(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="bio"
                            className="text-dark-green dark:text-off-white"
                          >
                            Bio
                          </Label>
                          <Textarea
                            id="bio"
                            defaultValue={tutor.bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Tell students about yourself, your teaching style, and your experience..."
                            rows={6}
                          />
                        </div>

                        <Button type="submit" disabled={isLoading}>
                          {isLoading ? (
                            <span className="flex items-center">
                              {" "}
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                              Saving...
                            </span>
                          ) : (
                            "Save Changes"
                          )}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="subjects">
                  <Card className="border-medium-green/20 bg-white dark:bg-forest-green/20">
                    <CardHeader>
                      <CardTitle className="text-dark-green dark:text-off-white">
                        Subjects
                      </CardTitle>
                      <CardDescription className="text-forest-green dark:text-lime/80">
                        Add or remove subjects that you can teach.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {tutor.subjects.map((subject) => (
                            <Badge
                              key={subject}
                              variant="secondary"
                              className="flex items-center gap-1"
                            >
                              {subject}
                              <button
                                type="button"
                                onClick={() => removeSubject(subject)}
                                className="ml-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                              >
                                <X className="h-3 w-3" />
                                <span className="sr-only">
                                  Remove {subject}
                                </span>
                              </button>
                            </Badge>
                          ))}
                        </div>

                        <div className="flex gap-2">
                          <Input
                            placeholder="Add a new subject..."
                            value={newSubject}
                            onChange={(e) => setNewSubject(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                addSubject();
                              }
                            }}
                          />
                          <Button type="button" onClick={addSubject}>
                            <Plus className="h-4 w-4" />
                            <span className="sr-only">Add Subject</span>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="experience">
                  <Card className="border-medium-green/20 bg-white dark:bg-forest-green/20">
                    <CardHeader>
                      <CardTitle className="text-dark-green dark:text-off-white">
                        Experience & Education
                      </CardTitle>
                      <CardDescription className="text-forest-green dark:text-lime/80">
                        Add your work experience and educational background.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="mb-4 text-lg font-medium text-dark-green dark:text-off-white">
                            Work Experience
                          </h3>
                          <ExperienceForm
                            workExperiences={tutor.workExperiences || []}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="certificates">
                  <Card className="border-medium-green/20 bg-white dark:bg-forest-green/20">
                    <CardHeader>
                      <CardTitle className="text-dark-green dark:text-off-white">
                        Certificates
                      </CardTitle>
                      <CardDescription className="text-forest-green dark:text-lime/80">
                        Upload certificates and qualifications to enhance your
                        profile.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="space-y-4">
                          {tutor?.certificates?.map((cert) => (
                            <div
                              key={cert._id}
                              className="flex items-start space-x-3 rounded-lg border border-medium-green/20 p-4"
                            >
                              <FileText className="h-5 w-5 text-medium-green dark:text-lime" />
                              <div className="flex-1">
                                <h4 className="font-medium text-dark-green dark:text-off-white">
                                  {cert.certName}
                                </h4>
                                <p className="text-sm text-forest-green dark:text-lime/80">
                                  {cert.schoolName} • {cert.year}
                                </p>
                                <a
                                  href={`${process.env.NEXT_PUBLIC_API_URL}/tutor/certificates/${cert._id}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-primary underline hover:text-primary/80"
                                >
                                  View Certificate
                                </a>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                                onClick={() => removeCertificate(cert._id)}
                              >
                                <X className="h-4 w-4" />
                                <span className="sr-only">Remove</span>
                              </Button>
                            </div>
                          ))}
                        </div>

                        <form
                          onSubmit={addCertificate}
                          className="space-y-4 rounded-lg border border-medium-green/20 p-4"
                        >
                          <h4 className="font-medium text-dark-green dark:text-off-white">
                            Add New Certificate
                          </h4>

                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label
                                htmlFor="certName"
                                className="text-dark-green dark:text-off-white"
                              >
                                Certificate Name
                              </Label>
                              <Input
                                id="certName"
                                value={certName}
                                onChange={(e) => setCertName(e.target.value)}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label
                                htmlFor="certIssuer"
                                className="text-dark-green dark:text-off-white"
                              >
                                Issuing Organization
                              </Label>
                              <Input
                                id="certIssuer"
                                value={schoolName}
                                onChange={(e) => setSchoolName(e.target.value)}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label
                                htmlFor="certYear"
                                className="text-dark-green dark:text-off-white"
                              >
                                Year
                              </Label>
                              <Input
                                id="certYear"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                required
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-dark-green dark:text-off-white">
                              Certificate File
                            </Label>
                            <FileUploader
                              onFilesSelected={handleCertificateUpload}
                              maxFiles={1}
                              acceptedFileTypes={[
                                "application/pdf",
                                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                              ]}
                              maxFileSizeMB={10}
                              label="Upload Certificate"
                              description="PDF or DOCX files only"
                            />
                          </div>

                          <Button
                            type="submit"
                            disabled={
                              certificateFiles.length === 0 || certLoading
                            }
                          >
                            Add Certificate
                          </Button>
                        </form>
                      </div>
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
